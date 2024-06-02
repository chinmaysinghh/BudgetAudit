import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFileCsv } from '@fortawesome/free-solid-svg-icons';
import ExpenseList from './ExpenseList';
import AddExpenseModal from './AddExpenseModal';
import DeleteExpenseModal from './DeleteExpenseModal';
import EditExpenseModal from './EditExpenseModal';
import { saveAs } from 'file-saver';

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState(null);
  const [expenseToEdit, setExpenseToEdit] = useState(null);
  const [budget, setBudget] = useState(0);

  // Filter expenses based on search query
  const filteredExpenses = expenses.filter(expense =>
    expense.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
    setAddModalOpen(false);
  };

  const deleteExpense = () => {
    setExpenses(expenses.filter((expense) => expense.id !== expenseToDelete.id));
    setDeleteModalOpen(false);
  };

  const updateExpense = (updatedExpense) => {
    setExpenses(
      expenses.map((expense) =>
        expense.id === updatedExpense.id ? updatedExpense : expense
      )
    );
    setEditModalOpen(false);
  };

  const handleEditExpense = (expense) => {
    setExpenseToEdit(expense);
    setEditModalOpen(true);
  };

  const totalExpense = expenses.reduce((total, expense) => total + expense.amount, 0);
  const isBudgetExceeded = totalExpense > budget;

  // Function to export expenses to CSV format
  const exportToCSV = () => {
    const csvContent = [
      ['Description', 'Amount', 'Budget'], // Header row
      ...expenses.map(expense => [expense.description, expense.amount.toFixed(2), budget.toFixed(2)]) // Expense data rows with separate budget value
    ].map(row => row.join(',')) // Join row elements with commas
    .join('\n'); // Join rows with newlines

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' }); // Create blob with CSV content
    saveAs(blob, 'expenses.csv'); // Save blob as file with name 'expenses.csv'
  };

  // Function to handle adding recurring expenses
  const addRecurringExpense = (expense, frequency) => {
    const recurringExpenses = [];
    const currentDate = new Date();
    for (let i = 0; i < frequency; i++) {
      const newExpense = { ...expense };
      newExpense.id = Math.random().toString(); // Generate unique ID for each recurring expense
      newExpense.date = new Date(currentDate.getFullYear(), currentDate.getMonth() + i, currentDate.getDate()); // Increment date based on frequency
      recurringExpenses.push(newExpense);
    }
    setExpenses([...expenses, ...recurringExpenses]);
    setAddModalOpen(false);
  };

  return (
    <div className="container mx-auto p-4 flex justify-center items-center relative">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">Expense Tracker</h1>
        <div className="mb-4">
          <label htmlFor="budget" className="block font-bold mb-2">Set Budget:</label>
          <input
            type="number"
            id="budget"
            value={budget}
            onChange={(e) => setBudget(parseFloat(e.target.value))}
            className="border border-gray-300 px-4 py-2 rounded w-full"
          />
        </div>
        <button
          className="block bg-blue-500 text-white px-4 py-2 rounded mb-4 mx-auto transition hover:bg-blue-600"
          onClick={() => setAddModalOpen(true)}
        >
          Add Expense
        </button>

        <div className="flex justify-between items-center mb-4">
          <div className="relative flex-1 mr-2">
            <input
              type="text"
              placeholder="Search expenses"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded pl-10 w-full transition"
            />
            <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-3 text-gray-400" />
          </div>
          <button
            className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition flex items-center"
            onClick={exportToCSV}
          >
            <FontAwesomeIcon icon={faFileCsv} className="mr-2" />
            Export to CSV
          </button>
        </div>

        <ExpenseList
          expenses={filteredExpenses}
          onDelete={(expense) => { setExpenseToDelete(expense); setDeleteModalOpen(true); }}
          onEdit={handleEditExpense}
        />

        <footer className="mt-4">
          <p className="text-xl font-bold text-center">Total Expense: ₹{totalExpense.toFixed(2)}</p>
          {isBudgetExceeded && <p className="text-red-500 text-center">Budget Exceeded!</p>}
        </footer>
      </div>
      <div className="absolute right-0 top-0 bottom-0 bg-cover bg-no-repeat hidden md:block" style={{ backgroundImage: 'url("https://i.ibb.co/7Q4NxG8/payment-tax-debt-credit-financial-calendar-documents-forms-money-cash-gold-coins-calculator-magnifyi.png")' }}></div>
      {isAddModalOpen && <AddExpenseModal onClose={() => setAddModalOpen(false)} onAdd={addExpense} onAddRecurring={addRecurringExpense} />}
      {isDeleteModalOpen && <DeleteExpenseModal onClose={() => setDeleteModalOpen(false)} onDelete={deleteExpense} />}
      {isEditModalOpen && <EditExpenseModal expenseToEdit={expenseToEdit} onClose={() => setEditModalOpen(false)} updateExpense={updateExpense} />}
    </div>
  );
};

export default ExpenseTracker;