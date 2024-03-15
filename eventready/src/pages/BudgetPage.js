import React, { useState, useEffect, useCallback } from 'react';
import { Button, LinearProgress, Container, Box, IconButton, Typography, TextField, Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel, FormGroup, Alert } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import "../styles/Budget.css";
const BudgetPage = () => {
  const [totalBudget, setTotalBudget] = useState('');
  const [currentSpent, setCurrentSpent] = useState('');
  const [progress, setProgress] = useState(0);
  const [showCategories, setShowCategories] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newSectionName, setNewSectionName] = useState('');
  const [budgetSections, setBudgetSections] = useState([
    'Catering',
    'Decorations',
    'Rentals/Fees',
    'Performers/Speakers',
    'Marketing',
    'Staffing'
  ]);
  const [selectedSections, setSelectedSections] = useState([]);
  const [lightGreenHeight, setLightGreenHeight] = useState('auto');
  const [savedCategories, setSavedCategories] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [budgetItemName, setBudgetItemName] = useState('');
  const [budgetItemDescription, setBudgetItemDescription] = useState('');
  const [budgetItemCategory, setBudgetItemCategory] = useState('');
  const [budgetItemQuantity, setBudgetItemQuantity] = useState('');
  const [budgetItemCost, setBudgetItemCost] = useState('');
  const [budgetItemTotal, setBudgetItemTotal] = useState('');
  const [budgetItemDocuments, setBudgetItemDocuments] = useState([]);

  // State variables for error messages
  const [totalBudgetError, setTotalBudgetError] = useState('');
  const [sectionSelectionError, setSectionSelectionError] = useState('');

  useEffect(() => {
    const calculateLightGreenHeight = () => {
      const defaultSectionHeight = 32; // Height of each section item
      const maxHeight = 143; // Maximum height for the light green part
      const sectionCount = budgetSections.length;
      const newHeight = defaultSectionHeight * sectionCount;
      // If the section count exceeds 6, set the height to cover all sections and allow scrolling
      setLightGreenHeight(sectionCount > 6 ? maxHeight : newHeight);
    };

    calculateLightGreenHeight();
  }, [budgetSections]);

  useEffect(() => {
    const checkScrollbar = () => {
      // Check if the content height exceeds the maximum height, and if so, set overflowY to auto
      const lightGreenBox = document.getElementById('light-green-box');
      if (lightGreenBox) {
        lightGreenBox.style.overflowY = lightGreenBox.scrollHeight > lightGreenHeight ? 'auto' : 'visible';
      }
    };

    checkScrollbar();
  }, [budgetSections, lightGreenHeight]);

  const handleTotalBudgetChange = (event) => {
    const newValue = event.target.value.replace('$', '');
    let newBudget = parseFloat(newValue);
    if (isNaN(newBudget)) {
      newBudget = '';
    } else {
      if (newBudget === 0) {
        setCurrentSpent(0);
      }
    }
    setTotalBudget(newBudget);
    setProgress(calculateProgress(newBudget, currentSpent));
  };

  const calculateProgress = (totalBudget, currentSpent) => {
    return totalBudget === 0 ? 0 : (currentSpent / totalBudget) * 100;
  };

  const handleUploadBudget = (event) => {
    const file = event.target.files[0];
    if (file) {
      // You can process the uploaded file here
      console.log('Uploaded file:', file);
    }
  };
  
  const handleSave = () => {
    let hasErrors = false;
  
    if (totalBudget === '') {
      setTotalBudgetError('Please enter total budget amount.');
      hasErrors = true;
    } else {
      setTotalBudgetError('');
    }
  
    if (selectedSections.length === 0) {
      setSectionSelectionError('Please select at least one budget section.');
      hasErrors = true;
    } else {
      setSectionSelectionError('');
    }
  
    if (hasErrors) {
      // There are errors, do not close the box
      return;
    }
  
    // Saving logic
    setSavedCategories(selectedSections); // Save selected categories
    setShowCategories(false); // Hide categories after saving
    
    // Clear budget items after saving
    setBudgetItems([]);
  };

  const handleShowCategories = () => {
    setShowCategories(true);
  };
  const handleCloseCategories = () => {
    setShowCategories(false);
  };
  const handleCreateFormOpen = () => {
    setShowCreateForm(true);
  };
  const handleCreateFormClose = () => {
    setShowCreateForm(false);
  };

  const handleCreateSection = () => {
    setBudgetSections([...budgetSections, newSectionName]);
    setShowCreateForm(false);
  };

  const handleDeleteSelected = () => {
    setBudgetSections(budgetSections.filter(section => !selectedSections.includes(section)));
    setSelectedSections([]);
  };

  const handleSectionSelection = (section) => {
    if (selectedSections.includes(section)) {
      setSelectedSections(selectedSections.filter(item => item !== section));
    } else {
      setSelectedSections([...selectedSections, section]);
    }
  };

  const [budgetItems, setBudgetItems] = useState([]);
  const [categoryCosts, setCategoryCosts] = useState({});

// Function to calculate the total cost of all budget items
  const calculateTotalCost = useCallback(() => {
    return budgetItems.reduce((total, item) => {
      const itemCost = parseFloat(item.cost);
      const itemQuantity = parseFloat(item.quantity);

      // Check if itemCost or itemQuantity is NaN, if yes, return total as is
      if (isNaN(itemCost) || isNaN(itemQuantity)) {
        return total;
      }

      return total + (itemCost * itemQuantity);
    }, 0);
  },[budgetItems]);

// Update progress and current spent when budget items change
  useEffect(() => {
    const totalCost = calculateTotalCost();
    setCurrentSpent(totalCost);
    const newProgress = calculateProgress(totalBudget, totalCost);
    setProgress(newProgress);
  }, [budgetItems, totalBudget, calculateTotalCost]);

  const handleCreateBudgetForCategory = (category) => {
    // Function to handle creating a budget for the selected category
    setBudgetItemName('');
    setBudgetItemDescription('');
    setBudgetItemCategory('');
    setBudgetItemQuantity('');
    setBudgetItemCost('');
    setBudgetItemTotal('');
    setBudgetItemDocuments([]);
    setDialogOpen(true); // Set dialogOpen to true to show the dialog

    // Add the newly created budget item to the budgetItems state
    const newBudgetItem = {
      category: category,
      name: budgetItemName,
      description: budgetItemDescription,
      quantity: budgetItemQuantity,
      cost: parseFloat(budgetItemCost),
      // Add other properties as needed
    };

     // Check if cost or quantity is NaN, if yes, return without updating state
    if (isNaN(newBudgetItem.cost) || isNaN(newBudgetItem.quantity)) {
      return;
  }

    // Calculate the total cost of the new budget item
    const newTotalCost = calculateTotalCost() + (newBudgetItem.cost * newBudgetItem.quantity);
    // Update the current spent
    setCurrentSpent(newTotalCost);
    // Update the progress
    const newProgress = calculateProgress(totalBudget, newTotalCost);
    setProgress(newProgress);
    setBudgetItems([...budgetItems, newBudgetItem]);
    setDialogOpen(true);

    // Close the create form dialog after creating a budget item
    setShowCreateForm(false);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleBudgetItemQuantityChange = (event) => {
    const quantity = event.target.value;
    setBudgetItemQuantity(quantity);
    const cost = parseFloat(budgetItemCost);
    const total = isNaN(cost) || isNaN(quantity) ? '' : cost * parseFloat(quantity);
    setBudgetItemTotal(total);
  };

  const handleBudgetItemCostChange = (event) => {
    const cost = event.target.value;
    setBudgetItemCost(cost);
    const quantity = parseFloat(budgetItemQuantity);
    const total = isNaN(cost) || isNaN(quantity) ? '' : parseFloat(cost) * quantity;
    setBudgetItemTotal(total);
  };

  const handleBudgetItemDocumentChange = (event) => {
    // Logic to handle adding documents to the budget item
    const files = event.target.files;
    console.log(files);
    setBudgetItemDocuments(files);
  };

  return (
    <Container  className='container'>
      {/* Progress bar */}
      <Box display="flex" alignItems="center" mt={2}>
        <Typography variant="body1" style={{ marginRight: '10px' }}>
          Current Spent: ${currentSpent}
        </Typography>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            flexGrow: 1,
            marginRight: '10px',
            height: 30,
            borderRadius: 10,
            '& .MuiLinearProgress-bar': {
              backgroundColor: '#0b8525',
            },
            backgroundColor: '#F1F9EC',
          }}
        />
        <Typography variant="body1" style={{ marginRight: '10px' }}>
          Total Budget: ${totalBudget}
        </Typography>
      </Box>

      <Box mt={2} display="flex" justifyContent="space-between">
        <Button variant="contained" color="primary" onClick={handleShowCategories} style={{ color: 'white', backgroundColor: '#006F4E', marginRight: '10px' }}>
          Event Budget
        </Button>
        <label htmlFor="upload-budget">
          <input
            style={{ display: 'none' }}
            id="upload-budget"
            type="file"
            accept=".xlsx"
            onChange={handleUploadBudget}
          />
          <Button variant="contained" component="span" color="primary">
            Upload Your Budget
          </Button>
        </label>
      </Box>

      {/* Dark green content */}
      {showCategories && (
        <Box
          mt={2}
          p={2}
          bgcolor="#2c9100"
          borderRadius="10px"
          boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
          position="relative"
        >
          {/* Remove Icon */}
          <IconButton aria-label="close" onClick={handleCloseCategories} style={{ position: 'absolute', top: '10px', right: '10px' }}>
            <CloseIcon style={{ color: 'white' }} />
          </IconButton>

          <Typography
            variant="h6"
            style={{
              color: 'white',
              fontWeight: 'bold',
              marginBottom: '10px',
              paddingLeft: '10px',
              cursor: 'pointer',
            }}
            onClick={handleCloseCategories}
          >
            EVENT BUDGET
          </Typography>

          {/* Enter Total Budget */}
          <TextField
            label="Enter Total Budget Amount"
            variant="outlined"
            value={totalBudget}
            onChange={(e) => handleTotalBudgetChange(e)}
            style={{ marginBottom: '10px', width: '100%' }}
            InputProps={{
              style: {
                backgroundColor: 'white',
                color: 'black'
              }
            }}
          />

          {/* Display error message for total budget */}
          {totalBudgetError && <Alert severity="error">{totalBudgetError}</Alert>}

          {/* Label for Select Relevant Budget Sections */}
          <label style={{ display: 'block', marginBottom: '5px', color: 'white' }}>Select Relevant Budget Sections:</label>

          {/* Light green content */}
          <Box
            mt={2}
            p={2}
            bgcolor="#F1F9EC"
            borderRadius="10px"
            boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
            position="relative"
            id="light-green-box"
            style={{ maxHeight: lightGreenHeight, overflowY: 'auto' }}
          >
            <Box>
              <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                {budgetSections.map((section, index) => (
                  <li key={index}>
                    <input type="checkbox" id={`section-${index}`} name={`section-${index}`} onChange={() => handleSectionSelection(section)} />
                    <label htmlFor={`section-${index}`}>{section}</label>
                  </li>
                ))}
              </ul>
            </Box>
          </Box>

          {/* Display error message for section selection */}
            {sectionSelectionError && (
              <Alert severity="error" style={{ marginTop: '10px' }}>
                {sectionSelectionError}
              </Alert>
            )}

          {/* Buttons */}
          <Box display="flex" justifyContent="flex-start" mt={2} p={2} bgcolor="#2c9100" borderRadius="10px">
            <Button variant="contained" color="primary" onClick={handleSave} sx={{ marginRight: '520px' }}>
              Save
            </Button>
            <Button variant="contained" color="secondary" onClick={handleCreateFormOpen}  >
              Create Custom
            </Button>
            {/* Delete selected button */}
            <IconButton aria-label="delete-selected" onClick={handleDeleteSelected} style={{ position: 'absolute', bottom: '30px', right: '20px' }}>
            <DeleteIcon style={{ color: 'white' }} />
            </IconButton>
          </Box>
        </Box>
      )}

      {/* Create Custom Form Dialog */}
      <Dialog open={showCreateForm} onClose={handleCreateFormClose}>
        <DialogTitle>Create New Budgeting Section</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={newSectionName}
            onChange={(e) => setNewSectionName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreateFormClose}>Cancel</Button>
          <Button onClick={handleCreateSection} color="primary">Create</Button>
        </DialogActions>
      </Dialog>

      {/* Budget Item Creation Dialog */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>{budgetItemCategory ? `Create New ${budgetItemCategory} Item` : "Create New Item"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={budgetItemName}
            onChange={(e) => setBudgetItemName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            value={budgetItemDescription}
            onChange={(e) => setBudgetItemDescription(e.target.value)}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Category</InputLabel>
            <Select
              value={budgetItemCategory}
              onChange={(e) => setBudgetItemCategory(e.target.value)}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="Food">Food</MenuItem>
              <MenuItem value="Decor">Decor</MenuItem>
              <MenuItem value="Rentals">Rentals</MenuItem>
              <MenuItem value="Entertainment">Entertainment</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="Quantity"
            type="number"
            fullWidth
            value={budgetItemQuantity}
            onChange={handleBudgetItemQuantityChange}
          />
          <TextField
            margin="dense"
            label="Cost"
            type="number"
            fullWidth
            value={budgetItemCost}
            onChange={handleBudgetItemCostChange}
          />
          <TextField
            margin="dense"
            label="Total"
            type="number"
            fullWidth
            value={budgetItemTotal}
            disabled
          />
          <FormGroup>
            <FormControlLabel
              control={<Checkbox />}
              label="Add Documents"
              onChange={handleBudgetItemDocumentChange}
            />
          </FormGroup>
          <input type="file" multiple />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={() => handleCreateBudgetForCategory(budgetItemCategory)} color="primary">Save</Button>
      </DialogActions>
      </Dialog>

      {/* Display budget items */}
      {budgetItems.length > 0 && (
        <Box mt={2}>
          <Typography variant="h6">Budget Subcategories Info:</Typography>
          {budgetItems.map((item, index) => (
            <Box key={index} mt={1}>
              {/* Only display details if all fields are filled */}
              {item.name && item.description && item.category && item.quantity && item.cost && (
                <>
                  <Typography>Name: {item.name}</Typography>
                  <Typography>Description: {item.description}</Typography>
                  <Typography>Category: {item.category}</Typography>
                  <Typography>Quantity: {item.quantity}</Typography>
                  <Typography>Cost: ${item.cost}</Typography>
                  <Typography>Total: ${item.cost * item.quantity}</Typography>
                  {/* Add logic to display documents if needed */}
                </>
              )}
            </Box>
          ))}
        </Box>
)}

      {/* Display selected categories */}
      {savedCategories.length > 0 && (
        <Box mt={2}>
          <Typography variant="h6">Budget Categories:</Typography>
          {savedCategories.map((category, index) => (
            <Box key={index} mt={1}>
              <Typography>{category}</Typography>
              <Button variant="contained" color="primary" 
                onClick={() => { handleCreateBudgetForCategory(category); setBudgetItemCategory(category); }} style={{ marginLeft: '10px' }}>
                Create Budget
              </Button>
            </Box>
          ))}
        </Box>
      )}
      
    </Container>
  );
};

export default BudgetPage;