import React, { useState } from 'react';
import { TextField, Button, LinearProgress, Typography, Container, Box, IconButton, Checkbox } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const BudgetPage = () => {
  const [totalBudget, setTotalBudget] = useState('');
  const [currentSpent, setCurrentSpent] = useState('');
  const [totalBudgetEditable, setTotalBudgetEditable] = useState(false);
  const [currentSpentEditable, setCurrentSpentEditable] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showCategories, setShowCategories] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryCost, setNewCategoryCost] = useState('');
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');

  const handleTotalBudgetChange = (event) => {
    const newValue = event.target.value.replace('$', '');
    let newBudget = parseFloat(newValue);
    if (isNaN(newBudget)) {
      newBudget = '';
    } else {
      if (newBudget === 0) {
        setCurrentSpent(0);
      }
      if (newBudget < currentSpent) {
        newBudget = currentSpent;
      }
    }
    setTotalBudget(newBudget);
    setProgress(calculateProgress(newBudget, currentSpent));
  };

  const handleSpentChange = (event) => {
    const newValue = event.target.value.replace('$', '');
    let newSpent = parseFloat(newValue);
    if (isNaN(newSpent)) {
      newSpent = '';
    } else {
      newSpent = Math.min(Math.max(0, newSpent), totalBudget);
      if (newSpent === 0) {
        const newCategories = categories.map(category => ({
          ...category,
          checked: false
        }));
        setCategories(newCategories);
      }
    }
    setCurrentSpent(newSpent);
    setProgress(calculateProgress(totalBudget, newSpent));
  };

  const calculateProgress = (totalBudget, currentSpent) => {
    return totalBudget === 0 ? 0 : (currentSpent / totalBudget) * 100;
  };

  const handleSave = () => {
    setTotalBudgetEditable(false);
    setCurrentSpentEditable(false);
  };

  const handleEdit = () => {
    setTotalBudgetEditable(!totalBudgetEditable);
    setCurrentSpentEditable(!currentSpentEditable);
  };

  const handleShowCategories = () => {
    setShowCategories(true);
  };

  const handleCloseCategories = () => {
    setShowCategories(false);
  };

  const handleAddCategory = () => {
    if (newCategoryName.trim() !== '' && newCategoryCost.trim() !== '') {
      const parsedCost = parseFloat(newCategoryCost);
      if (!isNaN(parsedCost) && parsedCost >= 0) {
        const newCategory = {
          name: newCategoryName,
          cost: parsedCost,
          checked: false,
          subcategories: [],
        };
        setCategories([...categories, newCategory]);
        setNewCategoryName('');
        setNewCategoryCost('');
        setError('');
      } else {
        setError('Invalid category cost. Please enter a valid number.');
      }
    }
  };

  const handleAddSubcategory = (index) => {
    const newSubcategory = {
      name: '',
      cost: '',
    };
    const newCategories = [...categories];
    newCategories[index].subcategories.push(newSubcategory);
    setCategories(newCategories);
  };

  const handleDeleteCategory = (index) => {
    const newCategories = [...categories];
    const deletedCategory = newCategories.splice(index, 1)[0];
    setCurrentSpent(prevSpent => prevSpent - parseFloat(deletedCategory.cost));
    setCategories(newCategories);
  };

  const handleDeleteSubcategory = (categoryIndex, subcategoryIndex) => {
    const newCategories = [...categories];
    const deletedSubcategory = newCategories[categoryIndex].subcategories.splice(subcategoryIndex, 1)[0];
    newCategories[categoryIndex].cost -= parseFloat(deletedSubcategory.cost);
    setCategories(newCategories);
  };

  const handleSubcategoryNameChange = (categoryIndex, subcategoryIndex, event) => {
    const newName = event.target.value;
    const newCategories = [...categories];
    newCategories[categoryIndex].subcategories[subcategoryIndex].name = newName;
    setCategories(newCategories);
  };

  const handleSubcategoryCostChange = (categoryIndex, subcategoryIndex, event) => {
    if (event.key === 'Enter') {
      handleAddSubcategory(categoryIndex);
    } else {
      const newValue = event.target.value.replace('$', '');
      let newCost = parseFloat(newValue);
      if (isNaN(newCost)) {
        newCost = '';
      }
      const newCategories = [...categories];
      const previousCost = parseFloat(newCategories[categoryIndex].subcategories[subcategoryIndex].cost) || 0;
  
      newCategories[categoryIndex].subcategories[subcategoryIndex].cost = newCost;
  
      let totalCost = 0;
  
      newCategories[categoryIndex].subcategories.forEach((subcategory) => {
        if (!isNaN(parseFloat(subcategory.cost))) {
          totalCost += parseFloat(subcategory.cost);
        }
      });
  
      if (!isNaN(parseFloat(newCategories[categoryIndex].cost))) {
        totalCost += parseFloat(newCategories[categoryIndex].cost);
      }
  
      totalCost -= previousCost;
  
      newCategories[categoryIndex].cost = totalCost.toFixed(2);
  
      setCategories(newCategories);
    }
  };

  const handleCheckboxChange = (index) => (event) => {
    const isChecked = event.target.checked;
    const categoryCost = parseFloat(categories[index].cost);

    if (!isNaN(categoryCost)) {
      const newCategories = [...categories];
      newCategories[index].checked = isChecked;
      let newCurrentSpent = 0;

      newCategories.forEach(category => {
        if (category.checked && !isNaN(parseFloat(category.cost))) {
          newCurrentSpent += parseFloat(category.cost);
        }
      });

      setCurrentSpent(newCurrentSpent);
      setCategories(newCategories);
      setProgress(calculateProgress(totalBudget, newCurrentSpent));
    }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '50px' }}>
      <Box display="flex" alignItems="center">
        <TextField
          label="Current Spent"
          variant="outlined"
          value={currentSpent === '' ? '' : `$${currentSpent}`}
          onChange={handleSpentChange}
          disabled={!currentSpentEditable}
          style={{ marginRight: '10px' }}
        />
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
        <Box style={{ position: 'relative' }}>
          <TextField
            label="Total Budget"
            variant="outlined"
            value={totalBudget === '' ? '' : `$${totalBudget}`}
            onChange={handleTotalBudgetChange}
            disabled={!totalBudgetEditable}
            style={{ marginRight: '10px' }}
          />

          {!totalBudgetEditable && (
            <Button
              variant="outlined"
              color="primary"
              onClick={handleEdit}
              style={{ position: 'absolute', top: 0, right: 0, marginTop: '8px', marginRight: '18px' }}
            >
              {totalBudgetEditable ? 'Done' : 'Edit'}
            </Button>
          )}
        </Box>
      </Box>

      {showCategories && (
        <Box mt={2} p={2} bgcolor="#F1F9EC" position="fixed" bottom="120px" left="30%" transform="translateX(-50%)" borderRadius="10px" boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)">
          <IconButton aria-label="close" onClick={handleCloseCategories} style={{ position: 'absolute', top: '10px', right: '10px' }}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" gutterBottom>
            Spending Categories
          </Typography>
          <Box mb={1}>
            <TextField
              label="Category Name"
              variant="outlined"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              style={{ marginRight: '10px' }}
            />
            <TextField
              label="Cost"
              variant="outlined"
              value={newCategoryCost}
              onChange={(e) => setNewCategoryCost(e.target.value)}
              style={{ marginRight: '10px' }}
            />
            
            <IconButton aria-label="add" onClick={handleAddCategory} style={{ fontSize: '1.5rem', marginLeft: '6px', backgroundColor: '#006F4E', color: '#FFFFFF', marginTop: '7px' }}>
              <AddIcon />
            </IconButton>


            {error && (
              <Typography variant="body2" color="error" style={{ marginLeft: '10px' }}>{error}</Typography>
            )}
          </Box>

          <Box style={{ maxHeight: '200px', overflowY: 'auto' }}>
            {categories.map((category, categoryIndex) => (
              <Box key={categoryIndex} mt={1}>
                <Box display="flex" alignItems="center">
                  <Checkbox checked={category.checked} onChange={handleCheckboxChange(categoryIndex)} />
                  <Typography variant="body1" style={{ marginRight: '10px' }}>{category.name} (${category.cost})</Typography>
                  <IconButton aria-label="add" onClick={() => handleAddSubcategory(categoryIndex)}>
                    <AddIcon />
                  </IconButton>
                  <IconButton aria-label="delete" onClick={() => handleDeleteCategory(categoryIndex)}>
                    <RemoveIcon />
                  </IconButton>
                </Box>
                {category.subcategories.map((subcategory, subcategoryIndex) => (
                  <Box key={subcategoryIndex} ml={4} display="flex" alignItems="center" mt={1}>
                    <TextField
                      label="Subcategory Name"
                      variant="outlined"
                      value={subcategory.name}
                      onChange={(e) => handleSubcategoryNameChange(categoryIndex, subcategoryIndex, e)}
                      style={{ marginRight: '10px' }}
                    />
                    <TextField
                      label="Subcategory Cost"
                      variant="outlined"
                      value={subcategory.cost === '' ? '' : `$${subcategory.cost}`}
                      onChange={(e) => handleSubcategoryCostChange(categoryIndex, subcategoryIndex, e)}
                      onKeyPress={(e) => handleSubcategoryCostChange(categoryIndex, subcategoryIndex, e)}
                      style={{ width: '190px' }}
                    />
                    <IconButton aria-label="delete" onClick={() => handleDeleteSubcategory(categoryIndex, subcategoryIndex)}>
                      <RemoveIcon />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            ))}
          </Box>
        </Box>
      )}

      <Box mt={2} display="flex" justifyContent="space-between">
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>

        <Button variant="contained" color="primary" onClick={handleShowCategories} style={{ color: 'white', backgroundColor: '#006F4E', marginRight: '10px' }}>
          Spending Categories
        </Button>

      </Box>
    </Container>
  );
};

export default BudgetPage;