import React from 'react';
import { Wallet, PlusCircle } from 'lucide-react';

const Header = ({ onOpenAddModal }) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Logo and App Title */}
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-blue-600 text-white rounded-xl shadow-md">
            <Wallet className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
              Personal Expense Tracker
            </h1>
            <p className="text-xs sm:text-sm text-gray-500">
              Manage your personal finances with ease
            </p>
          </div>
        </div>

        {/* Add Transaction Button */}
        <button
          onClick={onOpenAddModal}
          className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          Add Transaction
        </button>
      </div>
    </header>
  );
};

export default Header;
