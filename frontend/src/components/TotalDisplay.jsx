const TotalDisplay = ({ expenses }) => {
  const total = expenses.reduce(
    (sum, exp) => sum + Number(exp.amount.$numberDecimal),
    0
  );

  return <h3>Total: ₹{total}</h3>;
};

export default TotalDisplay;
