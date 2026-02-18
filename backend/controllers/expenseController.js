import Expense from "../models/Expense.js";

// POST /expenses
export const createExpense = async (req, res, next) => {
  try {
    const { amount, category, description, date, requestId } = req.body;

    if (!amount || !category || !date || !requestId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (Number(amount) < 0) {
      return res.status(400).json({ message: "Amount cannot be negative" });
    }

    // Idempotency check
    const existingExpense = await Expense.findOne({ requestId });

    if (existingExpense) {
      return res.status(200).json(existingExpense);
    }

    const expense = await Expense.create({
  amount,
  category,
  description,
  date,
  requestId,
  user: req.user._id,
});


    res.status(201).json(expense);
  } catch (error) {
    next(error);
  }
};

// GET /expenses
export const getExpenses = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const { category, sort } = req.query;

    let filter = { user: req.user._id };

    if (category) {
      filter.category = category;
    }

    let query = Expense.find(filter);

    if (sort === "date_desc") {
      query = query.sort({ date: -1 });
    }

    const expenses = await query;

    res.json(expenses);
  } catch (error) {
    next(error);
  }
};
