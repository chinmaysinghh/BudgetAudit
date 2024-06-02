// src/components/ExpenseList.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const ExpenseList = ({ expenses, onDelete }) => {
  return (
    <div>
      {expenses.map((expense) => (
        <div key={expense.id} className="flex justify-between items-center mb-2 p-2 border-b">
          <span>{expense.description}</span>
          <span>₹{expense.amount.toFixed(2)}</span>
          <button 
            className="text-red-500"
            onClick={() => onDelete(expense)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;
