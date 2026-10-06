import React, { createContext, useContext, useState, useEffect } from 'react';

// 1. Create the Context object
export const ExpenseContext = createContext();

// Initial sample data so the dashboard is not empty when first opened
const initialTransactions = [
  {
    id: "1",
    type: "income",
    description: "Monthly Salary",
    amount: 50000,
    category: "Salary",
    date: "2026-10-01"
  },
  {
    id: "2",
    type: "expense",
    description: "Grocery Shopping",
    amount: 3500,
    category: "Food",
    date: "2026-10-03"
  },
  {
    id: "3",
    type: "expense",
    description: "Electricity Bill",
    amount: 1800,
    category: "Bills",
    date: "2026-10-04"
  },
  {
    id: "4",
    type: "income",
    description: "Freelance Project",
    amount: 12000,
    category: "Freelance",
    date: "2026-10-05"
  },
  {
    id: "5",
    type: "expense",
    description: "Movie & Dinner",
    amount: 1200,
    category: "Entertainment",
    date: "2026-10-06"
  }
];

// 2. Create the Provider component
export const ExpenseProvider = ({ children }) => {
  // Load initial state from LocalStorage or fallback to sample data
  const [transactions, setTransactions] = useState(() => {
    try {
      const savedTransactions = localStorage.getItem('transactions');
      if (savedTransactions !== null) {
        return JSON.parse(savedTransactions);
      }
      return initialTransactions;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return initialTransactions;
    }
  });

  // Save to LocalStorage whenever transactions state changes
  useEffect(() => {
    try {
      localStorage.setItem('transactions', JSON.stringify(transactions));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, [transactions]);

  // Function 1: Add a new transaction
  const addTransaction = (newTransaction) => {
    const transactionWithId = {
      ...newTransaction,
      id: Date.now().toString() // Generate unique ID based on timestamp
    };
    setTransactions((prevTransactions) => [transactionWithId, ...prevTransactions]);
  };

  // Function 2: Update an existing transaction
  const updateTransaction = (updatedTransaction) => {
    setTransactions((prevTransactions) =>
      prevTransactions.map((item) =>
        item.id === updatedTransaction.id ? updatedTransaction : item
      )
    );
  };

  // Function 3: Delete a transaction by ID
  const deleteTransaction = (id) => {
    setTransactions((prevTransactions) =>
      prevTransactions.filter((item) => item.id !== id)
    );
  };

  // Provide state and actions to child components
  return (
    <ExpenseContext.Provider
      value={{
        transactions,
        addTransaction,
        updateTransaction,
        deleteTransaction
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

// Custom hook to use ExpenseContext easily
export const useExpenseContext = () => {
  return useContext(ExpenseContext);
};
