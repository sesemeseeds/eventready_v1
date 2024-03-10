import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

import AxiosInstance from "../Axios";

const AddGoalDialog = ({ isOpen, onClose, eventId, setAllGoals  }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [newGoalData, setNewGoalData] = useState({
    name: '',
    due_date: '',
    description: '',
    progress: 0
  });

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGoalData({
      ...newGoalData,
      [name]: value
    });
  };

  const handleAddGoal = async () => {
    try {
      const response = await AxiosInstance.post('goals/', {
        event_id: eventId,
        ...newGoalData
      });
      const newGoal = response.data;
      setAllGoals(prevGoals => [...prevGoals, newGoal]);
      onClose(); // Close the dialog after adding the goal
    } catch (error) {
      console.error("Error adding new goal:", error);
    }
  };
  
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Add New Goal</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          name="name"
          value={newGoalData.name}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Due Date"
          name="due_date"
          type="date"
          value={newGoalData.due_date}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Description"
          name="description"
          value={newGoalData.description}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Progress"
          name="progress"
          type="number"
          value={newGoalData.progress}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          inputProps={{
            min: 0,
            max: 100,
            step: 1
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleAddGoal} variant="contained" color="primary">Add Goal</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddGoalDialog;