// src/components/DeleteExpenseModal.jsx
import React from 'react';

const DeleteExpenseModal = ({ onClose, onDelete }) => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl mb-4 text-gray-900">Delete Expense</h2>
        <p className="mb-6 text-gray-700">Are you sure you want to delete this expense?</p>
        <div className="flex justify-end">
          <button 
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2 hover:bg-gray-400 transition"
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteExpenseModal;
