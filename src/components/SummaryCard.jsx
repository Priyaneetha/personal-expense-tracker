import React from 'react';
import { ArrowDownCircle, ArrowUpCircle, Wallet } from 'lucide-react';
import { useExpenseContext } from '../context/ExpenseContext';

// Helper function to format currency in Indian Rupees (INR)
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(amount);
};

const SummaryCard = () => {
  const { transactions } = useExpenseContext();

  // 1. Calculate Total Income using reduce()
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, item) => sum + Number(item.amount), 0);

  // 2. Calculate Total Expenses using reduce()
  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, item) => sum + Number(item.amount), 0);

  // 3. Calculate Balance (Income - Expenses)
  const currentBalance = totalIncome - totalExpenses;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
      {/* Total Income Card */}
      <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
            Total Income
          </p>
          <p className="text-2xl font-bold text-emerald-600">
            {formatCurrency(totalIncome)}
          </p>
        </div>
        <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
          <ArrowUpCircle className="w-7 h-7" />
        </div>
      </div>

      {/* Total Expenses Card */}
      <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
            Total Expenses
          </p>
          <p className="text-2xl font-bold text-rose-600">
            {formatCurrency(totalExpenses)}
          </p>
        </div>
        <div className="p-3 bg-rose-50 rounded-xl text-rose-600">
          <ArrowDownCircle className="w-7 h-7" />
        </div>
      </div>

      {/* Current Balance Card */}
      <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
            Current Balance
          </p>
          <p
            className={`text-2xl font-bold ${
              currentBalance >= 0 ? 'text-blue-600' : 'text-rose-600'
            }`}
          >
            {formatCurrency(currentBalance)}
          </p>
        </div>
        <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
          <Wallet className="w-7 h-7" />
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
