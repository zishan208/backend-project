// const express = require("express");
const expenseModel = require("../models/expense.model");

const CreatePost =  async (req, res) => {
  const { title, category, amount } = req.body;

  try {
    const expense = await expenseModel.create({
      title,
      category,
      amount
    });

    res.status(201).json({
      message: "Expense created successfully",
      expense
    });
  } catch (error) {
    console.error("Error creating expense:", error.message);
    res.status(400).json({ message: error.message });
  }
};
 const GetExpenses =  async (req, res) => {
  try {
    // Return all expenses; the amount filter was accidental and excluded valid records.
    const expenses = await expenseModel.find({});
    res.status(200).json(expenses);
  } catch (error) {
    console.error("Error fetching expenses:", error.message);
    res.status(500).json({ message: "Failed to fetch expenses" });
  }
};
const UpdateExpense = async (req, res) => {
  const { id } = req.params;
  const { title, category, amount } = req.body; 

  try {
    const expense = await expenseModel.findByIdAndUpdate(
      id,
      { title, category, amount },
      { new: true }
    );

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json({
      message: "Expense updated successfully",
      expense
    });
  } catch (error) {
    console.error("Error updating expense:", error.message);
    res.status(400).json({ message: error.message });
  }
}; 

module.exports = { CreatePost, GetExpenses, UpdateExpense };