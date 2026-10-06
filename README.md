# Personal Expense Tracker

A responsive, beginner-friendly web application designed to help users track personal income and expenses, visualize spending distributions, and calculate financial balances in real-time.

---

## 1. Project Overview

The **Personal Expense Tracker** allows individuals to manage their daily financial transactions. Users can record income and expenses, edit or remove transactions, filter by category, and view financial summary cards alongside interactive visual charts. All data is automatically persisted in the browser using HTML5 `LocalStorage`.

---

## 2. Features

- **Dashboard Financial Summary**: Instant calculation of Total Income, Total Expenses, and Current Balance in Indian Rupees (₹).
- **CRUD Operations**: Add, Edit, and Delete income and expense transactions.
- **Form Validation**: Clean validation preventing empty descriptions, invalid amounts, or missing categories/dates.
- **Category Filtering**: Filter transactions by type (*Income*, *Expense*) or category (*Food*, *Travel*, *Bills*, *Shopping*, *Entertainment*, *Other*).
- **Data Visualization**:
  - **Pie Chart**: Visual distribution of expenses by category using Recharts.
  - **Bar Chart**: Direct visual comparison of Total Income vs Total Expenses.
- **Data Persistence**: Uses browser `LocalStorage` so transactions persist across browser reloads.
- **Responsive Design**: Adapts cleanly across Mobile, Tablet, Laptop, and Desktop screens.

---

## 3. Technologies Used

- **React.js** (v18+) - Component-based UI framework
- **Vite** - High-performance frontend build tool
- **JavaScript (ES6+)** - Core application logic and array manipulation
- **Context API & React Hooks** (`useState`, `useEffect`, `useContext`) - State management and side-effects
- **Recharts** - Responsive charting library
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Clean icons for visual UI cues

---

## 4. Project Structure

```text
personal-expense-tracker/
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── context/
    │   └── ExpenseContext.jsx
    └── components/
        ├── Header.jsx
        ├── SummaryCard.jsx
        ├── TransactionForm.jsx
        ├── TransactionList.jsx
        ├── TransactionItem.jsx
        ├── FilterBar.jsx
        └── Charts.jsx
```

---

## 5. Installation Instructions

1. Ensure [Node.js](https://nodejs.org/) is installed on your computer.
2. Open a terminal in the project directory.
3. Install dependencies by running:

```bash
npm install
```

---

## 6. How to Run

Start the local development server:

```bash
npm run dev
```

Open the local link displayed in the terminal (usually `http://localhost:5173/`) in your web browser.

---

## 7. How LocalStorage Works

`LocalStorage` stores string key-value pairs in the browser environment.
- **Saving Data**: When `transactions` state changes, `useEffect` executes `localStorage.setItem('transactions', JSON.stringify(transactions))` to serialize the JavaScript array into a JSON string.
- **Loading Data**: When the application initializes, `localStorage.getItem('transactions')` reads the JSON string and converts it back into a JavaScript array using `JSON.parse()`.

---

## 8. How Context API is Used

`ExpenseContext.jsx` acts as a central data hub for the application:
1. `ExpenseContext` is created using `createContext()`.
2. `ExpenseProvider` wraps the top-level application component tree in `App.jsx`.
3. State (`transactions`) and handler functions (`addTransaction`, `updateTransaction`, `deleteTransaction`) are passed down through the context provider value.
4. Any component accesses this state directly using `useExpenseContext()`, avoiding prop drilling.

---

## 9. How Charts are Generated

`Charts.jsx` converts raw transaction objects into chart data arrays:
- **Expense Pie Chart**: Uses `filter()` to select expense transactions and `reduce()` to aggregate amounts by category (e.g. Food, Travel, Bills).
- **Income vs Expense Bar Chart**: Calculates sum of income vs sum of expenses and passes a 2-item dataset to Recharts' `<BarChart>`.
- Both charts wrap in `<ResponsiveContainer>` to scale dynamically across screen sizes.

---

## 10. Future Improvements

- Custom date range filtering (e.g. filter by month or year).
- CSV / Excel export functionality for financial reports.
- Multi-currency support (USD, EUR, GBP).
- Budget target limits per category with warnings when exceeded.
