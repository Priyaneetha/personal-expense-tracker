import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useExpenseContext } from '../context/ExpenseContext';

// Available categories for income and expense
const EXPENSE_CATEGORIES = ['Food', 'Travel', 'Bills', 'Shopping', 'Entertainment', 'Other'];
const INCOME_CATEGORIES = ['Salary', 'Freelance', 'Gift', 'Other'];

const TransactionForm = ({ isOpen, onClose, editingTransaction }) => {
  const { addTransaction, updateTransaction } = useExpenseContext();

  // Form state
  const [type, setType] = useState('expense');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');

  // Form validation errors state
  const [errors, setErrors] = useState({});

  // When editingTransaction changes or form opens, update form fields
  useEffect(() => {
    if (editingTransaction) {
      setType(editingTransaction.type);
      setDescription(editingTransaction.description);
      setAmount(editingTransaction.amount);
      setCategory(editingTransaction.category);
      setDate(editingTransaction.date);
    } else {
      // Default reset values for new transaction
      resetForm();
    }
    setErrors({});
  }, [editingTransaction, isOpen]);

  // Handle changing type (switch category default if invalid)
  const handleTypeChange = (newType) => {
    setType(newType);
    setCategory(''); // reset category selection when type switches
  };

  // Reset all form inputs to default values
  const resetForm = () => {
    setType('expense');
    setDescription('');
    setAmount('');
    setCategory('');
    setDate(new Date().toISOString().split('T')[0]); // default to today's date
  };

  // Form validation logic
  const validateForm = () => {
    const newErrors = {};

    if (!description.trim()) {
      newErrors.description = 'Description is required.';
    }

    if (!amount || Number(amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0.';
    }

    if (!category) {
      newErrors.category = 'Please select a category.';
    }

    if (!date) {
      newErrors.date = 'Please select a date.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const transactionData = {
      type,
      description: description.trim(),
      amount: parseFloat(amount),
      category,
      date,
    };

    if (editingTransaction) {
      // Update existing transaction
      updateTransaction({
        ...transactionData,
        id: editingTransaction.id,
      });
    } else {
      // Add new transaction
      addTransaction(transactionData);
    }

    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  const currentCategories = type === 'expense' ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl relative animate-in fade-in zoom-in duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Title */}
        <h2 className="text-xl font-bold text-gray-900 mb-5">
          {editingTransaction ? 'Edit Transaction' : 'Add New Transaction'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Transaction Type Radio Selector */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
              Transaction Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleTypeChange('expense')}
                className={`py-2 px-4 text-sm font-semibold rounded-lg border transition-all ${
                  type === 'expense'
                    ? 'bg-rose-50 border-rose-500 text-rose-600 shadow-sm'
                    : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                }`}
              >
                Expense
              </button>
              <button
                type="button"
                onClick={() => handleTypeChange('income')}
                className={`py-2 px-4 text-sm font-semibold rounded-lg border transition-all ${
                  type === 'income'
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-600 shadow-sm'
                    : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                }`}
              >
                Income
              </button>
            </div>
          </div>

          {/* Description Input */}
          <div>
            <label htmlFor="description" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Description
            </label>
            <input
              id="description"
              type="text"
              placeholder="e.g. Grocery shopping, Salary"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                errors.description
                  ? 'border-rose-500 focus:ring-rose-200'
                  : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
              }`}
            />
            {errors.description && (
              <p className="text-xs text-rose-500 mt-1">{errors.description}</p>
            )}
          </div>

          {/* Amount Input */}
          <div>
            <label htmlFor="amount" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Amount (₹)
            </label>
            <input
              id="amount"
              type="number"
              step="any"
              placeholder="e.g. 500"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                errors.amount
                  ? 'border-rose-500 focus:ring-rose-200'
                  : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
              }`}
            />
            {errors.amount && (
              <p className="text-xs text-rose-500 mt-1">{errors.amount}</p>
            )}
          </div>

          {/* Category Dropdown */}
          <div>
            <label htmlFor="category" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-lg border text-sm bg-white focus:outline-none focus:ring-2 ${
                errors.category
                  ? 'border-rose-500 focus:ring-rose-200'
                  : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
              }`}
            >
              <option value="">Select a category</option>
              {currentCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-xs text-rose-500 mt-1">{errors.category}</p>
            )}
          </div>

          {/* Date Input */}
          <div>
            <label htmlFor="date" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Date
            </label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                errors.date
                  ? 'border-rose-500 focus:ring-rose-200'
                  : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
              }`}
            />
            {errors.date && (
              <p className="text-xs text-rose-500 mt-1">{errors.date}</p>
            )}
          </div>

          {/* Form Action Buttons */}
          <div className="flex items-center justify-end space-x-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {editingTransaction ? 'Update Transaction' : 'Add Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;
