import React from 'react';
import { Filter } from 'lucide-react';

const FILTER_OPTIONS = [
  'All',
  'Income',
  'Expense',
  'Food',
  'Travel',
  'Bills',
  'Shopping',
  'Entertainment',
  'Other',
];

const FilterBar = ({ currentFilter, onFilterChange }) => {
  return (
    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm mb-6">
      <div className="flex items-center space-x-2 mb-3">
        <Filter className="w-4 h-4 text-gray-500" />
        <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
          Filter Transactions
        </h3>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        {FILTER_OPTIONS.map((filter) => {
          const isActive = currentFilter === filter;

          return (
            <button
              key={filter}
              onClick={() => onFilterChange(filter)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FilterBar;
