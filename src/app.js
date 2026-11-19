const express = require("express");
const expenseRouter = require("./routes/expense.routes");
const authRouter = require("./routes/auth.routes");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cookieParser());
// Mount each router once; the route files define paths relative to these prefixes.
app.use("/api/expenses", expenseRouter);
app.use("/api/auth", authRouter);

module.exports = app;