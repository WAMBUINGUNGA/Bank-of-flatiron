import React, { useEffect, useState } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

function AccountContainer() {
  const [transactions, setTransactions] = useState([])
  const [query, setQuery] = useState("")

  useEffect(() => {
    fetch('http://localhost:3000/transactions?q=' + query)
      .then((resp) => resp.json())
      .then(data => setTransactions(data))
  }, [query])

  function handleSearch(e) {
    setQuery(e.target.value)
  };


  const handleDelete = (id) => {
    fetch(`http://localhost:3000/transactions/${id}`, {
      method: "DELETE",
    })
    .then((resp) => {
      if (resp.ok) {
        const updatedTransactions = transactions.filter(transaction => transaction.id !== id);
        setTransactions(updatedTransactions);
      } else {
        throw new Error("Failed to delete transaction");
      }
    })
    .catch((error) => console.error("Error deleting transaction: ", error));
  };
  
  const handleSort = (sortBy) => {
    fetch(`http://localhost:3000/transactions?sortBy=${sortBy}`)
      .then((resp) => resp.json())
      .then((data) => {
        const sortedTransactions = data.sort((a, b) => {
          const fieldValueA = a[sortBy].toLowerCase();
          const fieldValueB = b[sortBy].toLowerCase();
          if (fieldValueA < fieldValueB) {
            return -1;
          }
          if (fieldValueA > fieldValueB) {
            return 1;
          }
          return 0;
        });
        setTransactions(sortedTransactions);
      })
      .catch((error) => console.error("Error fetching sorted data: ", error));
  };


  return (
    <div>
      <Search handleSearch={handleSearch} />
      <AddTransactionForm />
      <TransactionsList 
          transactions={transactions}
          onDelete={handleDelete}
          onSort={handleSort}
      />
    </div>
  );
}

export default AccountContainer;