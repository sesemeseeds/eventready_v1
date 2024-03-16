import React, { useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import { Dialog, DialogTitle, DialogContent, TextField, Button, FormControlLabel, Checkbox, Typography, Box } from '@material-ui/core';

// Format category name with spaces between words
const formatCategoryName = (name) => {
  return name
    .split(/(?=[A-Z])/) // Split camelCase string into array of words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter of each word
    .join(' '); // Join words with spaces
};

function BudgetSubcategories({ totalBudget, categories, onClose }) {
  const [expandedCategories, setExpandedCategories] = useState([]);
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [spentAmount, setSpentAmount] = useState(0); // State to track spent amount
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
        setSpentAmount(spentAmount + totalCost);
      } else {
        setSpentAmount(spentAmount - totalCost);
      }
    }
  };

  const handleSubmit = () => {
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

  // Define an array to hold the selected categories
  const selectedCategories = Object.keys(categories).filter(category => categories[category]);

  return (
    <div>
      <h2>Selected Categories</h2>
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
                <Box key={index} border={1} padding={2} marginTop={2} position="relative">
                  {/* Edit icon positioned at the top right */}
                  <EditIcon style={{ position: 'absolute', top: 0, right: 0, cursor: 'pointer' }} onClick={() => handleEditClick(index, data)} />
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
        <DialogTitle>{editIndex !== null ? 'Edit Details' : 'Add Details'}</DialogTitle>
        <DialogContent>
          <TextField name="name" label="Name" value={formData.name} onChange={handleChange} fullWidth />
          <TextField name="description" label="Description" value={formData.description} onChange={handleChange} fullWidth />
          <TextField name="quantity" label="Quantity" type="number" value={formData.quantity} onChange={handleChange} fullWidth />
          <TextField name="cost" label="Cost" type="number" value={formData.cost} onChange={handleChange} fullWidth />
          <FormControlLabel
            control={<Checkbox checked={formData.paid} onChange={handleCheckboxChange} name="paid" />}
            label="Paid"
          />
          <Button onClick={handleSubmit} variant="contained" color="primary" fullWidth>Submit</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default BudgetSubcategories;
