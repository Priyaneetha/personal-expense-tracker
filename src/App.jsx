import React, { useState } from 'react';
import { ExpenseProvider } from './context/ExpenseContext';
import Header from './components/Header';
import SummaryCard from './components/SummaryCard';
import FilterBar from './components/FilterBar';
import TransactionList from './components/TransactionList';
import Charts from './components/Charts';
import TransactionForm from './components/TransactionForm';

const MainDashboard = () => {
  // Modal open/close state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Currently selected transaction for editing (null when adding new)
  const [editingTransaction, setEditingTransaction] = useState(null);

  // Active category/type filter state
  const [currentFilter, setCurrentFilter] = useState('All');

  // Open modal in "Add" mode
  const handleOpenAddModal = () => {
    setEditingTransaction(null);
    setIsModalOpen(true);
  };

  // Open modal in "Edit" mode with pre-filled transaction
  const handleOpenEditModal = (transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  // Close modal and reset edit target
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTransaction(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header Bar */}
      <Header onOpenAddModal={handleOpenAddModal} />

      {/* Main Content Dashboard */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* 1. Summary Cards (Income, Expense, Balance) */}
        <SummaryCard />

        {/* 2. Visual Charts (Pie Chart & Bar Chart) */}
        <Charts />

        {/* 3. Filter Controls */}
        <FilterBar
          currentFilter={currentFilter}
          onFilterChange={setCurrentFilter}
        />

        {/* 4. Transactions List */}
        <TransactionList
          currentFilter={currentFilter}
          onEdit={handleOpenEditModal}
          onOpenAddModal={handleOpenAddModal}
        />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4 text-center text-xs text-gray-500">
        <p>Personal Expense Tracker &bull; Built with React, Context API & Tailwind CSS</p>
      </footer>

      {/* Transaction Add / Edit Form Modal */}
      <TransactionForm
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        editingTransaction={editingTransaction}
      />
    </div>
  );
};

// Root App Component wrapped with ExpenseProvider Context
function App() {
  return (
    <ExpenseProvider>
      <MainDashboard />
    </ExpenseProvider>
  );
}

export default App;
