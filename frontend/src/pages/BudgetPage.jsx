import React, { useState } from 'react';
import "../styles/Budget.css";
import BudgetCategories from "../components/budget-components/BudgetCategories";
import BudgetUpload from "../components/budget-components/BudgetCategories";

function BudgetPage() {
  const [currentSpent, setCurrentSpent] = useState(0);
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

  const handleItemPaid = (amount) => {
    setCurrentSpent(prevSpent => prevSpent + amount);
  };
  

  return (
    <div className="container" style={{ width: '93%', maxWidth: '900px', marginTop: '30px', padding: '20px', marginLeft:'20px' }}>
       <h2>Budget Page</h2>
      <p style={{ fontSize: '16px', color: '#666' }}>
        Track your expenses, monitor your spending, and stay on top of your financials as you plan and organize memorable events for your organization. Get started by entering your current expenses and total budget, and let the Budget Tracker guide you towards financial success for your next event!
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
      <button 
        onClick={openDialog} 
        style={{ 
          backgroundColor: '#4CAF50', 
          color: 'white', 
          padding: '10px 20px', 
          borderRadius: '7px', 
          border: 'none', 
          outline: 'none', 
          cursor: 'pointer', 
          transition: 'background-color 0.3s',
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          fontWeight: 'bold',
          fontSize: '16px',}}
        onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#4CAF50'}
      >Budget Categories
      </button>

      <button 
        style={{ 
          backgroundColor: '#007bff', // Blue color
          color: 'white', 
          padding: '10px 20px', 
          borderRadius: '7px', 
          border: 'none', 
          outline: 'none', 
          cursor: 'pointer', 
          transition: 'background-color 0.3s',
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          fontWeight: 'bold',
          fontSize: '16px',}}
        onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'} // Darker shade of blue on hover
        onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
      >Upload Budget
      </button>
      </div>
      {isDialogOpen && <BudgetCategories totalBudget={totalBudget} onClose={closeDialog} onTotalBudgetChange={handleTotalBudgetChange} onItemPaid={handleItemPaid} />}
    </div>
  );
}

export default BudgetPage;

