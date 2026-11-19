const router = require("express").Router();
const { registerUser,loginUser } = require("../controllers/auth.controllers");

// Relative routes avoid duplicating the /api/auth prefix from src/app.js.
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;