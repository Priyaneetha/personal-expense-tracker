import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import { PieChart as PieIcon, BarChart3 as BarIcon } from 'lucide-react';
import { useExpenseContext } from '../context/ExpenseContext';

// Color palette for Pie Chart categories
const CATEGORY_COLORS = {
  Food: '#f59e0b', // Amber
  Travel: '#3b82f6', // Blue
  Bills: '#ef4444', // Red
  Shopping: '#8b5cf6', // Purple
  Entertainment: '#ec4899', // Pink
  Other: '#6b7280', // Gray
};

const Charts = () => {
  const { transactions } = useExpenseContext();

  // -------------------------------------------------------------
  // 1. Prepare Data for Chart 1: Expense by Category (Pie Chart)
  // -------------------------------------------------------------
  const expenseCategories = ['Food', 'Travel', 'Bills', 'Shopping', 'Entertainment', 'Other'];

  // Aggregate expenses for each category using reduce()
  const pieChartData = expenseCategories
    .map((category) => {
      const categoryTotal = transactions
        .filter((t) => t.type === 'expense' && t.category === category)
        .reduce((sum, item) => sum + Number(item.amount), 0);

      return {
        name: category,
        value: categoryTotal,
      };
    })
    .filter((item) => item.value > 0); // Only display categories with expenses > 0

  // -------------------------------------------------------------
  // 2. Prepare Data for Chart 2: Income vs Expense (Bar Chart)
  // -------------------------------------------------------------
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, item) => sum + Number(item.amount), 0);

  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, item) => sum + Number(item.amount), 0);

  const barChartData = [
    {
      name: 'Income',
      Amount: totalIncome,
      fill: '#10b981', // Emerald green
    },
    {
      name: 'Expenses',
      Amount: totalExpenses,
      fill: '#f43f5e', // Rose red
    },
  ];

  const hasExpenses = pieChartData.length > 0;
  const hasTransactions = transactions.length > 0;

  // Formatter for tooltips
  const formatTooltipCurrency = (value) => {
    return `₹${value.toLocaleString('en-IN')}`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Chart 1: Expense by Category (Pie Chart) */}
      <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between">
        <div className="flex items-center space-x-2 mb-4">
          <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
            <PieIcon className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-gray-900">
            Expenses by Category
          </h3>
        </div>

        {hasExpenses ? (
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieChartData.map((entry) => (
                    <Cell
                      key={`cell-${entry.name}`}
                      fill={CATEGORY_COLORS[entry.name] || '#6b7280'}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={formatTooltipCurrency} />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  iconType="circle"
                  wrapperStyle={{ fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-64 flex flex-col items-center justify-center text-gray-400">
            <p className="text-sm font-medium">No data available yet.</p>
            <p className="text-xs text-gray-400 mt-1">
              Add some expenses to see category distribution.
            </p>
          </div>
        )}
      </div>

      {/* Chart 2: Income vs Expense (Bar Chart) */}
      <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between">
        <div className="flex items-center space-x-2 mb-4">
          <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
            <BarIcon className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-gray-900">
            Income vs Expenses
          </h3>
        </div>

        {hasTransactions ? (
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={barChartData}
                margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tickLine={false} />
                <YAxis
                  tickFormatter={(val) => `₹${val}`}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip formatter={formatTooltipCurrency} />
                <Bar dataKey="Amount" radius={[6, 6, 0, 0]} barSize={50}>
                  {barChartData.map((entry, index) => (
                    <Cell key={`bar-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-64 flex flex-col items-center justify-center text-gray-400">
            <p className="text-sm font-medium">No data available yet.</p>
            <p className="text-xs text-gray-400 mt-1">
              Add income or expenses to visualize comparison.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Charts;
