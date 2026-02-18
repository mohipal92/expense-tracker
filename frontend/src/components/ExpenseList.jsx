const ExpenseList = ({ expenses }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Amount</th>
          <th>Category</th>
          <th>Description</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense) => (
          <tr key={expense._id}>
            <td>₹{Number(expense.amount.$numberDecimal)}</td>
            <td>{expense.category}</td>
            <td>{expense.description}</td>
            <td>{new Date(expense.date).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ExpenseList;
