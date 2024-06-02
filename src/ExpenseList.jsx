import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

const ExpenseList = ({ expenses, onDelete, onEdit }) => {
  return (
    <div>
      {expenses.map((expense) => (
        <div key={expense.id} className="flex justify-between items-center mb-2 p-2 border-b">
          <span>{expense.description}</span>
          <span>₹{expense.amount.toFixed(2)}</span>
          <div>
            <button
              className="text-blue-500 mr-2"
              onClick={() => onEdit(expense)}
            >
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <button
              className="text-red-500"
              onClick={() => onDelete(expense)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;