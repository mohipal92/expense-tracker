import { useState } from "react";
import { createExpense } from "../api/expenseApi";
import { v4 as uuidv4 } from "uuid";

const ExpenseForm = ({ onExpenseAdded }) => {
  const [form, setForm] = useState({
    amount: "",
    category: "",
    description: "",
    date: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (loading) return;

    try {
      setLoading(true);

      const requestId = uuidv4();

      await createExpense({
        ...form,
        requestId,
      });

      setForm({
        amount: "",
        category: "",
        description: "",
        date: "",
      });

      onExpenseAdded();
    } catch (err) {
      setError("Failed to add expense");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Add Expense</h2>

      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={form.amount}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />

      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Expense"}
      </button>

      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default ExpenseForm;
