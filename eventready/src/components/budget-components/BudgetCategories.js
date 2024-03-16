import React, { useState } from 'react';
import BudgetSubcategories from './BudgetSubcategories';
import CloseIcon from '@material-ui/icons/Close';

function BudgetCategories({ onClose, onTotalBudgetChange }) {
  const [totalBudget, setTotalBudget] = useState('');
  const [categories, setCategories] = useState({
    decor: false,
    foodAndBeverages: false,
    supplies: false,
    entertainment: false,
    rentalsFee: false,
    staffingVolunteers: false,
    transportation: false,
    merchandiseOrGiveaways: false,
    miscellaneous: false,
  });
  const [customCategory, setCustomCategory] = useState('');
  const [submitted, setSubmitted] = useState(false); // Track if form has been submitted
  const [isAnyCheckboxChecked, setIsAnyCheckboxChecked] = useState(false); // Track if at least one checkbox is checked
  const [isDialogOpen, setIsDialogOpen] = useState(true); // Track if the dialog is open
  const [isCustomCategoryOpen, setIsCustomCategoryOpen] = useState(false); // Track if the custom category section is open

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    const updatedCategories = { ...categories, [name]: checked };
    setCategories(updatedCategories);
    setIsAnyCheckboxChecked(checked || Object.values(updatedCategories).some(Boolean)); };

  const handleSubmit = (event) => {
    event.preventDefault();
    onTotalBudgetChange(totalBudget); // Update the total budget value in the parent component
    console.log('Submitted:', { totalBudget, categories });
    setSubmitted(true); 
  };

  const handleClose = () => {
    onClose();
    setIsDialogOpen(false);
  };

  const handleAddCustomCategory = () => {
    if (customCategory.trim() !== '') {
      setCategories({
        ...categories,
        [customCategory.toLowerCase()]: true,
      }); setCustomCategory('');}};

  return (
    <div className="dialog-overlay">
      <div className="dialog-content">

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2>Enter Budget Details</h2>
            <CloseIcon onClick={handleClose} />
          </div>
        
        <form onSubmit={handleSubmit}>
          <div>
            <label>Total Budget Amount:</label>
            <input
              type="number"
              value={totalBudget}
              onChange={(e) => setTotalBudget(e.target.value)}
              required
              style={{ marginBottom: '6px' }} // Add margin here
            />
          </div>
          <div>
            <label>Select all budgeting categories:</label>
            <div>
              <label>
                <input
                  type="checkbox"
                  name="decor"
                  checked={categories.decor}
                  onChange={handleCheckboxChange}
                />
                Decor
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  name="foodAndBeverages"
                  checked={categories.foodAndBeverages}
                  onChange={handleCheckboxChange}
                />
                Food & Beverages
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  name="supplies"
                  checked={categories.supplies}
                  onChange={handleCheckboxChange}
                />
                Supplies
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  name="entertainment"
                  checked={categories.entertainment}
                  onChange={handleCheckboxChange}
                />
                Entertainment
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  name="rentalsFee"
                  checked={categories.rentalsFee}
                  onChange={handleCheckboxChange}
                />
                Rentals or Fee
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  name="staffingVolunteers"
                  checked={categories.staffingVolunteers}
                  onChange={handleCheckboxChange}
                />
                Staffing or Volunteers
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  name="transportation"
                  checked={categories.transportation}
                  onChange={handleCheckboxChange}
                />
                Transportation
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  name="merchandiseOrGiveaways"
                  checked={categories.merchandiseOrGiveaways}
                  onChange={handleCheckboxChange}
                />
                Merchandise or Giveaways
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  name="miscellaneous"
                  checked={categories.miscellaneous}
                  onChange={handleCheckboxChange}
                />
                Miscellaneous
              </label>
            </div>
          </div>
          
          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
            <button type="submit" disabled={!isAnyCheckboxChecked}>Submit</button>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <button onClick={() => setIsCustomCategoryOpen(true)} style={{ marginLeft: '10px' }}>Add Custom</button>
              {isCustomCategoryOpen && (
                <div className="custom-category-dialog" style={{ marginLeft: '10px' }}>
                  <input
                    type="text"
                    placeholder="Enter custom category"
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                  />
                  <button onClick={handleAddCustomCategory}>Add</button>
                </div>
              )}
            </div>
          </div>
        </form>
        
          {submitted && (
            <BudgetSubcategories
              totalBudget={totalBudget}
              categories={categories}
              onClose={onClose} // Pass onClose function to BudgetSubcategories
          />)}
      </div>
    </div>
  );}

export default BudgetCategories;