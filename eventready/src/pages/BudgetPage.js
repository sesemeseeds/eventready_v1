import React, { useState, useEffect } from 'react';
import { Button, LinearProgress, Container, Box, IconButton, Typography, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete'; // Import DeleteIcon

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

  const handleSave = () => {
    // Saving logic goes here
  };

  const handleShowCategories = () => {
    setShowCategories(true);
  };

  const handleCloseCategories = () => {
    setShowCategories(false);
  };

  const handleTotalBudgetSubmit = () => {
    setCurrentSpent(0); // Reset current spent when total budget is submitted
    setProgress(0); // Reset progress when total budget is submitted
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

  return (
    <Container maxWidth="md" style={{ marginTop: '50px' }}>
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
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
        <Button variant="contained" color="primary" onClick={handleShowCategories} style={{ color: 'white', backgroundColor: '#006F4E', marginRight: '10px' }}>
          Event Budget
        </Button>
      </Box>

      {/* Dark green content */}
      {showCategories && (
        <Box
          mt={2}
          p={2}
          bgcolor="#2c9100"
          borderRadius="10px"
          boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
          marginRight="200px"
          marginLeft="200px"
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
              padding: '10px',
              borderRadius: '5px',
              paddingLeft: '135px',
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
            onChange={(e) => setTotalBudget(e.target.value)}
            style={{ marginBottom: '10px', width: '100%' }}
            InputProps={{
              style: {
                backgroundColor: 'white',
                color: 'black'
              }
            }}
          />

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

          {/* Delete selected button */}
          <IconButton aria-label="delete-selected" onClick={handleDeleteSelected} style={{ position: 'absolute', bottom: '30px', right: '20px' }}>
            <DeleteIcon style={{ color: 'white' }} />
          </IconButton>

          {/* Buttons */}
          <Box display="flex" justifyContent="flex-start" mt={2} p={2} bgcolor="#2c9100" borderRadius="10px">
            <Button variant="contained" color="primary" onClick={handleTotalBudgetSubmit} style={{ marginRight: '10px' }}>
              Submit
            </Button>
            <Button variant="contained" color="secondary" onClick={handleCreateFormOpen}>
              Create Custom
            </Button>
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
    </Container>
  );
};

export default BudgetPage;
