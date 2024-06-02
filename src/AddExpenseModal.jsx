import React, { useState } from 'react';

const AddExpenseModal = ({ onClose, onAdd, onAddRecurring }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  const [frequency, setFrequency] = useState(1);

  const handleAdd = () => {
    const newExpense = {
      id: Math.random().toString(),
      description,
      amount: parseFloat(amount),
    };
    onAdd(newExpense);
    if (isRecurring) {
      onAddRecurring(newExpense, frequency);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4">Add New Expense</h2>
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
        <div className="flex items-center mb-3">
          <input 
            type="checkbox" 
            checked={isRecurring} 
            onChange={(e) => setIsRecurring(e.target.checked)} 
            className="mr-2"
          />
          <label className="text-gray-700">Recurring</label>
        </div>
        {isRecurring && (
          <div className="flex items-center mb-3">
            <label className="text-gray-700 mr-2">Frequency:</label>
            <input 
              type="number" 
              value={frequency} 
              onChange={(e) => setFrequency(e.target.value)} 
              className="border border-gray-300 rounded p-2 w-16"
            />
          </div>
        )}
        <div className="flex justify-end">
          <button 
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded mr-2 hover:bg-gray-300 transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            onClick={handleAdd}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddExpenseModal;