const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const path = require("path");
const port = 5001;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);

const SECRET_KEY = "my_key"; 
const USERS_FILE_PATH = path.join(__dirname, "users.json"); 

// Read users from JSON file
const getUsers = () => {
    if (fs.existsSync(USERS_FILE_PATH)) {
        const data = fs.readFileSync(USERS_FILE_PATH);
        return JSON.parse(data);
    }
    return [];
};

// Write users to JSON file
const saveUsers = (users) => {
    fs.writeFileSync(USERS_FILE_PATH, JSON.stringify(users, null, 2));
};

// Register User
app.post("/register", async (req, res) => {
    const { username, password } = req.body;

    // Read users from JSON file
    const users = getUsers();

    // Check if user already exists
    if (users.find(user => user.username === username)) {
        return res.status(400).json({ error: "Username already exists!" });
    }

    // Add new user to the array
    users.push({ username, password});

    // Save updated users list to the file
    saveUsers(users);

    res.status(201).json({ message: "User registered successfully!" });
});

// Login User
app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    // Read users from JSON file
    const users = getUsers();
    const user = users.find(user => user.username === username);
    if (!user) {
        return res.status(400).json({ error: "Invalid username or password!" });
    }

    // Generate JWT token
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });

    res.cookie("token", token, { httpOnly: true, sameSite: "lax" });
    res.json({ message: "Login successful!", username});
});

// Check Authenticated User
app.get("/check-auth", (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: "Not authenticated" });

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).json({ error: "Invalid token" });

        // Read users from JSON file
        const users = getUsers();

        const user = users.find(user => user.username === decoded.username);
        if (!user) return res.status(401).json({ error: "User not found" });

        res.json({ username: user.username});
    });
});

// Logout User
app.post("/logout", (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out successfully!" });
});

// Start Server
app.listen(port, () => console.log("Auth Microservice running on port", port));
