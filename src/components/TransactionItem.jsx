import React from 'react';
import { Pencil, Trash2, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useExpenseContext } from '../context/ExpenseContext';

// Currency formatter for Indian Rupees (INR)
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(amount);
};

// Date formatter for readable date display
const formatDate = (dateString) => {
  if (!dateString) return '';
  const dateObj = new Date(dateString);
  return dateObj.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const TransactionItem = ({ transaction, onEdit }) => {
  const { deleteTransaction } = useExpenseContext();

  const isIncome = transaction.type === 'income';

  const handleDelete = () => {
    // Beginner-friendly browser confirmation dialog
    const isConfirmed = window.confirm(
      `Are you sure you want to delete "${transaction.description}"?`
    );

    if (isConfirmed) {
      deleteTransaction(transaction.id);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white hover:bg-gray-50 border-b border-gray-100 last:border-0 transition-colors gap-3">
      {/* Left side: Icon, Description, Category, Date */}
      <div className="flex items-center space-x-3.5">
        {/* Income / Expense Icon Indicator */}
        <div
          className={`p-2.5 rounded-xl flex-shrink-0 ${
            isIncome
              ? 'bg-emerald-50 text-emerald-600'
              : 'bg-rose-50 text-rose-600'
          }`}
        >
          {isIncome ? (
            <ArrowUpRight className="w-5 h-5" />
          ) : (
            <ArrowDownRight className="w-5 h-5" />
          )}
        </div>

        {/* Details */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 leading-tight">
            {transaction.description}
          </h4>
          <div className="flex items-center space-x-2 mt-1">
            <span className="inline-block text-[11px] font-medium px-2 py-0.5 rounded-md bg-gray-100 text-gray-600">
              {transaction.category}
            </span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs text-gray-500">
              {formatDate(transaction.date)}
            </span>
          </div>
        </div>
      </div>

      {/* Right side: Amount and Action buttons */}
      <div className="flex items-center justify-between sm:justify-end space-x-4 pl-12 sm:pl-0">
        <span
          className={`text-base font-bold ${
            isIncome ? 'text-emerald-600' : 'text-rose-600'
          }`}
        >
          {isIncome ? '+' : '-'}{formatCurrency(transaction.amount)}
        </span>

        {/* Action Buttons */}
        <div className="flex items-center space-x-1">
          {/* Edit Button */}
          <button
            onClick={() => onEdit(transaction)}
            className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit Transaction"
          >
            <Pencil className="w-4 h-4" />
          </button>

          {/* Delete Button */}
          <button
            onClick={handleDelete}
            className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
            title="Delete Transaction"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionItem;
