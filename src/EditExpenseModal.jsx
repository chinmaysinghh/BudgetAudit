import React, { useState } from 'react';

const EditExpenseModal = ({ expenseToEdit, onClose, updateExpense }) => {
  const [description, setDescription] = useState(expenseToEdit.description);
  const [amount, setAmount] = useState(expenseToEdit.amount);

  const handleUpdate = () => {
    const updatedExpense = {
      ...expenseToEdit,
      description,
      amount: parseFloat(amount),
    };
    updateExpense(updatedExpense);
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4">Edit Expense</h2>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-300 rounded p-2 mb-3 w-full"
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border border-gray-300 rounded p-2 mb-3 w-full"
        />
        <div className="flex justify-end">
          <button
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded mr-2 hover:bg-gray-300 transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            onClick={handleUpdate}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditExpenseModal;