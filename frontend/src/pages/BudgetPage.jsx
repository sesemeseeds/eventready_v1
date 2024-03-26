import React, { useState } from 'react';
import "../styles/Budget.css";
import BudgetCategories from "../components/budget-components/BudgetCategories";
import BudgetUpload from "../components/budget-components/BudgetCategories";

function BudgetPage() {
  const [currentSpent, setCurrentSpent] = useState(500);
  const [totalBudget, setTotalBudget] = useState(1000); // Initialize with a default value

  // Progress percentage
  const progress = (currentSpent / totalBudget) * 100;
  const remainingBudget = totalBudget - currentSpent;

  // Position of pointer
  const pointerPosition = progress > 100 ? '100%' : `${progress}%`;

  // State to manage whether to show tooltip
  const [showTooltip, setShowTooltip] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const handleTotalBudgetChange = (value) => {
    setTotalBudget(Number(value)); // Update the total budget value
  };

  return (
    <div className="container" >
       <h2>Budget Tracker</h2>
      <p style={{ fontSize: '16px', color: '#666', marginLeft: '10px' }}>
        Welcome to the Budget Tracker! Track your expenses, monitor your spending, and stay on top of your financials as you plan and organize memorable events for your organization. Get started by entering your current expenses and total budget, and let the Budget Tracker guide you towards financial success for your next event!
      </p>
      <div className="progress-bar-container" onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}>
        <div className="progress-bar">
          <div className="progress-bar-inner" style={{ width: pointerPosition }}>
            {/* Remove currentSpent here */}
          </div>
          {showTooltip && (
            <div className="tooltip" style={{ left: `calc(${pointerPosition} - 20px)` }}>
              Left over amount: ${remainingBudget}
            </div>
          )}
          <div className="pointer" style={{ left: pointerPosition }}></div>
        </div>
      </div>
      <div className="budget-info" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className="spent-info">
          Spent: ${currentSpent}
        </div>
        <div className="total-info">
          Total: ${totalBudget}
        </div>
      </div>
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={openDialog}>Budget Categories</button>
        <button>Upload Budget</button>
      </div>
      {isDialogOpen && <BudgetCategories totalBudget={totalBudget} onClose={closeDialog} onTotalBudgetChange={handleTotalBudgetChange} />}
    </div>
  );
}

export default BudgetPage;