function Expense(props) {
  const { expense, index } = props;

  return (
    <tr>
      <td>{index + 1}</td>
      <td>{expense.name}</td>
      <td>{expense.amount}</td>
      <td>{expense.paidBy}</td>
    </tr>
  );
}

export default Expense;
