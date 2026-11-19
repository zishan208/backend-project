const router=require("express").Router();
const {CreatePost,GetExpenses,UpdateExpense}=require("../controllers/expense.controllers");

// Relative routes avoid duplicating the /api/expenses prefix from src/app.js.
router.post("/", CreatePost);
router.get("/", GetExpenses);
router.patch("/:id", UpdateExpense);

module.exports = router;