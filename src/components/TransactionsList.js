import React from "react";

function TransactionsList({ transactions, onDelete, onSort }) {

  const handleSort = (sortBy) => {
    onSort(sortBy);
  };

  const handleDelete = (id) => {
    onDelete(id);
  };

  return (
    <table className="ui celled striped padded table">
      <thead>
        <tr>
          <th>
            <button className="btn" onClick={() => handleSort("date")}>Date</button>
          </th>
          <th>
            <button className="btn" onClick={() => handleSort("description")}>Description</button>
          </th>
          <th>
            <button className="btn" onClick={() => handleSort("category")}>Category</button>
          </th>
          <th>
            <h3 className="btn" >Amount</h3>
          </th>
          <th><h3>Delete</h3></th>
        </tr>
      </thead>
      <tbody>
        {transactions && transactions.map((transaction) => (
          <tr key={transaction.id}>
            <td>{transaction.date}</td>
            <td>{transaction.description}</td>
            <td>{transaction.category}</td>
            <td>{transaction.amount}</td>
            <td>
              <button onClick={() => handleDelete(transaction.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TransactionsList;