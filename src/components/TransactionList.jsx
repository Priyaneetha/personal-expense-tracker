import React from 'react';
import { Receipt, PlusCircle } from 'lucide-react';
import { useExpenseContext } from '../context/ExpenseContext';
import TransactionItem from './TransactionItem';

const TransactionList = ({ currentFilter, onEdit, onOpenAddModal }) => {
  const { transactions } = useExpenseContext();

  // Filter transactions using JavaScript filter() method
  const filteredTransactions = transactions.filter((transaction) => {
    if (currentFilter === 'All') {
      return true;
    }
    if (currentFilter === 'Income') {
      return transaction.type === 'income';
    }
    if (currentFilter === 'Expense') {
      return transaction.type === 'expense';
    }
    // Filter by specific category (e.g., Food, Travel, Bills, etc.)
    return transaction.category === currentFilter;
  });

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mb-8">
      {/* List Header */}
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <h3 className="text-base font-bold text-gray-900">
          Recent Transactions
        </h3>
        <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
          Showing {filteredTransactions.length} of {transactions.length}
        </span>
      </div>

      {/* Transactions List or Empty State */}
      {filteredTransactions.length > 0 ? (
        <div className="divide-y divide-gray-100">
          {filteredTransactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              onEdit={onEdit}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="py-12 px-4 text-center">
          <div className="w-12 h-12 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-3">
            <Receipt className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-semibold text-gray-700 mb-1">
            No transactions yet.
          </h4>
          <p className="text-xs text-gray-400 max-w-xs mx-auto mb-4">
            {currentFilter === 'All'
              ? 'Start tracking your spending by adding your first transaction.'
              : `No transactions found for the "${currentFilter}" filter.`}
          </p>
          <button
            onClick={onOpenAddModal}
            className="inline-flex items-center px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg shadow-sm transition-colors"
          >
            <PlusCircle className="w-4 h-4 mr-1.5" />
            + Add Transaction
          </button>
        </div>
      )}
    </div>
  );
};

export default TransactionList;
