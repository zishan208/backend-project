const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
    const name = typeof req.body.name === "string" ? req.body.name.trim() : "";
    const password = typeof req.body.password === "string" ? req.body.password : "";
    const email = typeof req.body.email === "string" ? req.body.email.trim().toLowerCase() : "";

    // Validate raw input before database or password work to return useful client errors.
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Name, email, and password are required" });
    }
    if (password.length < 5) {
        return res.status(400).json({ message: "Password must be at least 5 characters" });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ message: "A valid email is required" });
    }

    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            name,
            password: hashedPassword,
            email,
        });

        // Never return password hashes or other sensitive user fields.
        return res.status(201).json({
            message: "User registered successfully",
            user: { id: user._id, name: user.name, email: user.email }
        });
    } catch (err) {
        return res.status(500).json({ message: "Error registering user", error: err.message });
    }
};

const loginUser = async (req, res) => {
    const email = typeof req.body.email === "string" ? req.body.email.trim().toLowerCase() : "";
    const password = typeof req.body.password === "string" ? req.body.password : "";

    // Missing credentials are a bad request, not an internal server error.
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.cookie("token", token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
        // Return the public profile only; the password remains server-side.
        return res.status(200).json({
            message: "Login successful",
            user: { id: user._id, name: user.name, email: user.email }
        });
    } catch (err) {
        return res.status(500).json({ message: "Error logging in", error: err.message });
    }
}

module.exports = { registerUser, loginUser };
