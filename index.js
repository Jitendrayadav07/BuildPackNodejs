const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());


let roles = []; // in-memory storage
let roleId = 1;

// Test API
app.get("/", (req, res) => {
    res.send("Backend is running");
});

app.post("/api/roles", (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: "Role name is required" });
    }

    const newRole = {
        id: roleId++,
        name,
    };

    roles.push(newRole);
    res.status(201).json(newRole);
});

/**
 * READ ROLES
 */
app.get("/api/roles", (req, res) => {
    res.json(roles);
});

/**
 * UPDATE ROLE
 */
app.put("/api/roles/:id", (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const role = roles.find((r) => r.id == id);
    if (!role) {
        return res.status(404).json({ message: "Role not found" });
    }

    role.name = name || role.name;
    res.json(role);
});

/**
 * DELETE ROLE
 */
app.delete("/api/roles/:id", (req, res) => {
    const { id } = req.params;
    roles = roles.filter((r) => r.id != id);
    res.json({ message: "Role deleted successfully" });
});

const PORT = 2000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
