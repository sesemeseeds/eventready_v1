import React, { useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Dialog, DialogTitle, DialogContent, TextField, Button, FormControlLabel, Checkbox, Typography, Box } from '@material-ui/core';

// Format category name with spaces between words
const formatCategoryName = (name) => {
  if (!name) return ''; // Return an empty string if name is undefined
  return name
    .split(/(?=[A-Z])/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter of each word
    .join(' '); // Join words with spaces
};


function BudgetSubcategories({ totalBudget, categories, onClose, onItemPaid }) {
  const [expandedCategories, setExpandedCategories] = useState([]);
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [editIndex, setEditIndex] = useState(null); // State to track the index of the category being edited

  const handleAddClick = (category) => {
    setOpenDialog(true);
    setFormData({ category, name: '', description: '', quantity: '', cost: '', paid: false });
  };

  const handleEditClick = (index, data) => {
    setOpenDialog(true);
    setFormData(data);
    setEditIndex(index);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData({});
    setEditIndex(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });

    // Update spent amount if the item is marked as paid
    if (name === 'paid') {
      const { quantity, cost } = formData;
      const totalCost = quantity * cost;
      if (checked) {
        onItemPaid(totalCost); // Call the onItemPaid function with the total cost
      } else {
        onItemPaid(-totalCost); // Subtract the total cost from the current spent amount
      }
    }
  };

  const handleSubmit = () => {
    const totalCost = formData.quantity * formData.cost;
    if (totalCost > totalBudget) {
      alert(`Total cost $${totalCost} cannot exceed the total budget $${totalBudget}`);
      return;
    }

    if (editIndex !== null) {
      const updatedCategories = [...expandedCategories];
      updatedCategories[editIndex] = formData;
      setExpandedCategories(updatedCategories);
    } else {
      setExpandedCategories([...expandedCategories, formData]);
    }
    setOpenDialog(false);
    setFormData({});
    setEditIndex(null);
  };

  const handleDeleteClick = (index) => {
    const updatedCategories = [...expandedCategories];
    const deletedItem = updatedCategories.splice(index, 1)[0];
    setExpandedCategories(updatedCategories);

    // Update the spent amount if a paid item is deleted
    if (deletedItem.paid) {
      const totalCost = deletedItem.quantity * deletedItem.cost;
      onItemPaid(-totalCost); // Subtract the total cost from the current spent amount
    }
  };

  // Define an array to hold the selected categories
  const selectedCategories = Object.keys(categories).filter(category => categories[category]);

  // Check if all required fields are filled and valid
  const isFormValid = formData.name && formData.description && formData.quantity && formData.cost;

  return (
    <div>
      <h2>Selected Budget Categories</h2>
      {/* Render selected categories */}
      {selectedCategories.map(category => (
        <div key={category}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p>{formatCategoryName(category)}</p> {/* Display formatted category name */}
            {/* Render "Add" icon */}
            <AddIcon style={{ marginLeft: '8px', cursor: 'pointer' }} onClick={() => handleAddClick(category)} />
          </div>
          {/* Render information under the heading */}
          {expandedCategories.map((data, index) => {
            if (data.category === category) {
              return (
                <Box key={index}  padding={2} marginTop={2} borderRadius= {10} position="relative" style={{ backgroundColor: '#ecfde4', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}>
                  {/* Edit icon positioned at the top right */}
                  <EditIcon style={{ position: 'absolute', top: 15, right: 15, cursor: 'pointer', color: '#456236'}} onClick={() => handleEditClick(index, data)} />
                  <DeleteIcon style={{ position: 'absolute', bottom: 15, right: 15, cursor: 'pointer', color: '#456236'}} onClick={() => handleDeleteClick(index)} />
                  <Typography>Name: {data.name}</Typography>
                  <Typography>Description: {data.description}</Typography>
                  <Typography>Quantity: {data.quantity}</Typography>
                  <Typography>Cost: {data.cost}</Typography>
                  <Typography>Paid: {data.paid ? 'Yes' : 'No'}</Typography>
                  <Typography>Total Cost: {data.quantity * data.cost}</Typography>
                </Box>
              );
            }
            return null;
          })}
        </div>
      ))}

      {/* Dialog for entering category details */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle style={{ backgroundColor: '#4CAF50', color: 'white' }}>
          {editIndex !== null
            ? 'Edit Details'
            : `Add ${formatCategoryName(formData.category)} Details`}
        </DialogTitle>
        <DialogContent style={{ backgroundColor: '#F0FFF0' }}>
          <TextField name="name" label="Name" value={formData.name} onChange={handleChange} fullWidth required />
          <TextField
            name="description"
            label="Description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={2}
            required
          />
          <TextField name="quantity" label="Quantity" type="number" value={formData.quantity} onChange={handleChange} fullWidth required />
          <TextField name="cost" label="Cost" type="number" value={formData.cost} onChange={handleChange} fullWidth required />
          <FormControlLabel
            control={<Checkbox checked={formData.paid} onChange={handleCheckboxChange} name="paid" style={{ color: 'green' }} />}
            label="Paid"
          />
          <Button onClick={handleSubmit} variant="contained" color="primary" fullWidth style={{ backgroundColor: '#4CAF50' }} disabled={!isFormValid}>
            Submit
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default BudgetSubcategories;