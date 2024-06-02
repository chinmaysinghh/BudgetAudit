import React from 'react';
import ExpenseTracker from './ExpenseTracker';


const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
      <div className="flex items-center justify-between">
        <ExpenseTracker />
        <div className="ml-64">
          <img src="https://i.ibb.co/dWbc9hD/magnifying-glass-sits-magnifying-glass-862462-7960-removebg.png"
            alt="BudgetAudit"
            className="max-w-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default App;