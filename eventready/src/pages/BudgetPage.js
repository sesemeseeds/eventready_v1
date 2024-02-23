// import React, { useState, useEffect } from 'react';
// import { Button, LinearProgress, Container, Box, IconButton, Typography, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import DeleteIcon from '@mui/icons-material/Delete'; // Import DeleteIcon

// const BudgetPage = () => {
//   const [totalBudget, setTotalBudget] = useState('');
//   const [currentSpent, setCurrentSpent] = useState('');
//   const [progress, setProgress] = useState(0);
//   const [showCategories, setShowCategories] = useState(false);
//   const [showCreateForm, setShowCreateForm] = useState(false);
//   const [newSectionName, setNewSectionName] = useState('');
//   const [budgetSections, setBudgetSections] = useState([
//     'Catering',
//     'Decorations',
//     'Rentals/Fees',
//     'Performers/Speakers',
//     'Marketing',
//     'Staffing'
//   ]);
//   const [selectedSections, setSelectedSections] = useState([]);
//   const [lightGreenHeight, setLightGreenHeight] = useState('auto');

//   useEffect(() => {
//     const calculateLightGreenHeight = () => {
//       const defaultSectionHeight = 32; // Height of each section item
//       const maxHeight = 143; // Maximum height for the light green part
//       const sectionCount = budgetSections.length;
//       const newHeight = defaultSectionHeight * sectionCount;
//       // If the section count exceeds 6, set the height to cover all sections and allow scrolling
//       setLightGreenHeight(sectionCount > 6 ? maxHeight : newHeight);
//     };

//     calculateLightGreenHeight();
//   }, [budgetSections]);

//   useEffect(() => {
//     const checkScrollbar = () => {
//       // Check if the content height exceeds the maximum height, and if so, set overflowY to auto
//       const lightGreenBox = document.getElementById('light-green-box');
//       if (lightGreenBox) {
//         lightGreenBox.style.overflowY = lightGreenBox.scrollHeight > lightGreenHeight ? 'auto' : 'visible';
//       }
//     };

//     checkScrollbar();
//   }, [budgetSections, lightGreenHeight]);

//   const handleTotalBudgetChange = (event) => {
//     const newValue = event.target.value.replace('$', '');
//     let newBudget = parseFloat(newValue);
//     if (isNaN(newBudget)) {
//       newBudget = '';
//     } else {
//       if (newBudget === 0) {
//         setCurrentSpent(0);
//       }
//     }
//     setTotalBudget(newBudget);
//     setProgress(calculateProgress(newBudget, currentSpent));
//   };

//   const calculateProgress = (totalBudget, currentSpent) => {
//     return totalBudget === 0 ? 0 : (currentSpent / totalBudget) * 100;
//   };

//   const handleSave = () => {
//     // Saving logic goes here
//   };

//   const handleShowCategories = () => {
//     setShowCategories(true);
//   };

//   const handleCloseCategories = () => {
//     setShowCategories(false);
//   };

//   const handleTotalBudgetSubmit = () => {
//     setCurrentSpent(0); // Reset current spent when total budget is submitted
//     setProgress(0); // Reset progress when total budget is submitted
//   };

//   const handleCreateFormOpen = () => {
//     setShowCreateForm(true);
//   };

//   const handleCreateFormClose = () => {
//     setShowCreateForm(false);
//   };

//   const handleCreateSection = () => {
//     setBudgetSections([...budgetSections, newSectionName]);
//     setShowCreateForm(false);
//   };

//   const handleDeleteSelected = () => {
//     setBudgetSections(budgetSections.filter(section => !selectedSections.includes(section)));
//     setSelectedSections([]);
//   };

//   const handleSectionSelection = (section) => {
//     if (selectedSections.includes(section)) {
//       setSelectedSections(selectedSections.filter(item => item !== section));
//     } else {
//       setSelectedSections([...selectedSections, section]);
//     }
//   };

//   return (
//     <Container maxWidth="md" style={{ marginTop: '50px' }}>
//       {/* Progress bar */}
//       <Box display="flex" alignItems="center" mt={2}>
//         <Typography variant="body1" style={{ marginRight: '10px' }}>
//           Current Spent: ${currentSpent}
//         </Typography>
//         <LinearProgress
//           variant="determinate"
//           value={progress}
//           sx={{
//             flexGrow: 1,
//             marginRight: '10px',
//             height: 30,
//             borderRadius: 10,
//             '& .MuiLinearProgress-bar': {
//               backgroundColor: '#0b8525',
//             },
//             backgroundColor: '#F1F9EC',
//           }}
//         />
//         <Typography variant="body1" style={{ marginRight: '10px' }}>
//           Total Budget: ${totalBudget}
//         </Typography>
//       </Box>

//       <Box mt={2} display="flex" justifyContent="space-between">
//         <Button variant="contained" color="primary" onClick={handleSave}>
//           Save
//         </Button>
//         <Button variant="contained" color="primary" onClick={handleShowCategories} style={{ color: 'white', backgroundColor: '#006F4E', marginRight: '10px' }}>
//           Event Budget
//         </Button>
//       </Box>

//       {/* Dark green content */}
//       {showCategories && (
//         <Box
//           mt={2}
//           p={2}
//           bgcolor="#2c9100"
//           borderRadius="10px"
//           boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
//           marginRight="200px"
//           marginLeft="200px"
//           position="relative"
//         >
//           {/* Remove Icon */}
//           <IconButton aria-label="close" onClick={handleCloseCategories} style={{ position: 'absolute', top: '10px', right: '10px' }}>
//             <CloseIcon style={{ color: 'white' }} />
//           </IconButton>

//           <Typography
//             variant="h6"
//             style={{
//               color: 'white',
//               fontWeight: 'bold',
//               marginBottom: '10px',
//               padding: '10px',
//               borderRadius: '5px',
//               paddingLeft: '135px',
//               cursor: 'pointer',
//             }}
//             onClick={handleCloseCategories}
//           >
//             EVENT BUDGET
//           </Typography>

//           {/* Enter Total Budget */}
//           <TextField
//             label="Enter Total Budget Amount"
//             variant="outlined"
//             value={totalBudget}
//             onChange={(e) => setTotalBudget(e.target.value)}
//             style={{ marginBottom: '10px', width: '100%' }}
//             InputProps={{
//               style: {
//                 backgroundColor: 'white',
//                 color: 'black'
//               }
//             }}
//           />

//           {/* Label for Select Relevant Budget Sections */}
//           <label style={{ display: 'block', marginBottom: '5px', color: 'white' }}>Select Relevant Budget Sections:</label>

//           {/* Light green content */}
//           <Box
//             mt={2}
//             p={2}
//             bgcolor="#F1F9EC"
//             borderRadius="10px"
//             boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
//             position="relative"
//             id="light-green-box"
//             style={{ maxHeight: lightGreenHeight, overflowY: 'auto' }}
//           >
//             <Box>
//               <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
//                 {budgetSections.map((section, index) => (
//                   <li key={index}>
//                     <input type="checkbox" id={`section-${index}`} name={`section-${index}`} onChange={() => handleSectionSelection(section)} />
//                     <label htmlFor={`section-${index}`}>{section}</label>
//                   </li>
//                 ))}
//               </ul>
//             </Box>
//           </Box>

//           {/* Delete selected button */}
//           <IconButton aria-label="delete-selected" onClick={handleDeleteSelected} style={{ position: 'absolute', bottom: '30px', right: '20px' }}>
//             <DeleteIcon style={{ color: 'white' }} />
//           </IconButton>

//           {/* Buttons */}
//           <Box display="flex" justifyContent="flex-start" mt={2} p={2} bgcolor="#2c9100" borderRadius="10px">
//             <Button variant="contained" color="primary" onClick={handleTotalBudgetSubmit} style={{ marginRight: '10px' }}>
//               Submit
//             </Button>
//             <Button variant="contained" color="secondary" onClick={handleCreateFormOpen}>
//               Create Custom
//             </Button>
//           </Box>
//         </Box>
//       )}

//       {/* Create Custom Form Dialog */}
//       <Dialog open={showCreateForm} onClose={handleCreateFormClose}>
//         <DialogTitle>Create New Budgeting Section</DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             label="Name"
//             type="text"
//             fullWidth
//             value={newSectionName}
//             onChange={(e) => setNewSectionName(e.target.value)}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCreateFormClose}>Cancel</Button>
//           <Button onClick={handleCreateSection} color="primary">Create</Button>
//         </DialogActions>
//       </Dialog>
//     </Container>
//   );
// };

// export default BudgetPage;




import React, { useState, useEffect } from 'react';
import { Button, LinearProgress, Container, Box, IconButton, Typography, TextField, Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
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
  const [savedCategories, setSavedCategories] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [budgetItemName, setBudgetItemName] = useState('');
  const [budgetItemDescription, setBudgetItemDescription] = useState('');
  const [budgetItemCategory, setBudgetItemCategory] = useState('');
  const [budgetItemQuantity, setBudgetItemQuantity] = useState('');
  const [budgetItemCost, setBudgetItemCost] = useState('');
  const [budgetItemTotal, setBudgetItemTotal] = useState('');
  const [budgetItemDocuments, setBudgetItemDocuments] = useState([]);

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
    setSavedCategories(selectedSections); // Save selected categories
    setShowCategories(false); // Hide categories after saving
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

  const handleCreateBudgetForCategory = (category) => {
    // Function to handle creating a budget for the selected category
    setBudgetItemName('');
    setBudgetItemDescription('');
    setBudgetItemCategory('');
    setBudgetItemQuantity('');
    setBudgetItemCost('');
    setBudgetItemTotal('');
    setBudgetItemDocuments([]);
    setDialogOpen(true);
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

      {/* Budget Item Creation Dialog */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Create New Budget Item</DialogTitle>
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
          <Button onClick={handleDialogClose} color="primary">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Display selected categories */}
      {savedCategories.length > 0 && (
        <Box mt={2}>
          <Typography variant="h6">Saved Categories:</Typography>
          {savedCategories.map((category, index) => (
            <Box key={index} mt={1}>
              <Typography>{category}</Typography>
              <Button variant="contained" color="primary" onClick={() => handleCreateBudgetForCategory(category)} style={{ marginLeft: '10px' }}>
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



