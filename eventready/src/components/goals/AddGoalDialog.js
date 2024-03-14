import { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Checkbox, Divider, Tooltip, Grid } from '@mui/material';

import AxiosInstance from "../../components/Axios";

const AddGoalDialog = ({ isOpen, onClose, eventId, setAllGoals  }) => {
  const [tasks, setTasks] = useState([]);
  const [goalNames, setGoalNames] = useState({});
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [newGoalData, setNewGoalData] = useState({
    name: '',
    due_date: '',
    description: '',
    progress: 0,
    tasks: []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGoalData({
      ...newGoalData,
      [name]: value
    });
  };

  useEffect(() => {
    const fetchTasks = () => {
        AxiosInstance.get(`/tasks/?event_id=${eventId}`)
            .then(response => {
                setTasks(response.data);
                const taskIdsWithGoals = response.data.filter(task => task.goal !== null).map(task => task.goal);
                const uniqueTaskIds = [...new Set(taskIdsWithGoals)];
                uniqueTaskIds.forEach(taskId => {
                    AxiosInstance.get(`/goals/${taskId}/`)
                        .then(response => {
                            setGoalNames(prevState => ({ ...prevState, [taskId]: response.data.name }));
                        })
                        .catch(error => {
                            console.error("Error fetching goal name:", error);
                        });
                });
            })
            .catch(error => {
                console.error("Error fetching tasks:", error);
            });
    };

    fetchTasks();
}, [eventId]);

const handleAddGoal = async () => {
    try {
      const response = await AxiosInstance.post('goals/', {
        event_id: eventId,
        ...newGoalData
      });
      const newGoal = response.data;
      const updatedTasks = tasks.map(task => {
        if (selectedTasks.includes(task.id)) {
          return {
            ...task,
            goal: newGoal.id
          };
        }
        return task;
      });
  
      await Promise.all(updatedTasks.map(task => AxiosInstance.put(`/tasks/${task.id}/`, task)));
      
      setAllGoals(prevGoals => [...prevGoals, newGoal]);
      onClose();
  
      window.location.reload();
    } catch (error) {
      console.error("Error adding new goal:", error);
    }
  };

    const handleTaskCheckboxChange = (taskId) => {
        const selectedIndex = selectedTasks.indexOf(taskId);
        let newSelectedTasks = [];

        if (selectedIndex === -1) {
            newSelectedTasks = [...selectedTasks, taskId];
        } else {
            newSelectedTasks = selectedTasks.filter(id => id !== taskId);
        }

        setSelectedTasks(newSelectedTasks);

        // Update the newGoalData with the selected tasks
        setNewGoalData(prevData => ({
            ...prevData,
            tasks: newSelectedTasks
        }));
    };
  
  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md">
    <DialogTitle>Create Goal</DialogTitle>
    <DialogContent sx={{ height: 500, overflowY: 'hidden', paddingTop: '10px !important' }}>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                    label="Name"
                    name="name"
                    value={newGoalData.name}
                    onChange={handleInputChange}
                    fullWidth
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    label="Description"
                    name="description"
                    value={newGoalData.description}
                    onChange={handleInputChange}
                    fullWidth
                    multiline
                    rows={16}
                />
            </Grid>
            <Grid item xs={6} style={{ height: '400px' }}>
                <TextField
                    label="Due Date"
                    name="due_date"
                    type="date"
                    value={newGoalData.due_date}
                    onChange={handleInputChange}
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        min: new Date().toISOString().split('T')[0] 
                    }}
                />
                <div style={{ height: '350px', overflowY: 'auto' }}>
                    {tasks.map(task => (
                        <div key={task.id}>
                            {task.goal === null ? (
                                <>
                                    <Checkbox
                                        checked={selectedTasks.indexOf(task.id) !== -1}
                                        onChange={() => handleTaskCheckboxChange(task.id)}
                                    />
                                    <span>{task.title}</span>
                                </>
                            ) : (
                                <Tooltip title={`Associated with a different goal: ${goalNames[task.goal]}`} placement="left-end">
                                    <div>
                                        <Checkbox disabled />
                                        <span>{task.title}</span>
                                    </div>
                                </Tooltip>
                            )}
                            <Divider />
                        </div>
                    ))}
                </div>
            </Grid>
        </Grid>
    </DialogContent>
    <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleAddGoal} variant="contained" color="primary">Add Goal</Button>
    </DialogActions>
</Dialog>
  );
};

export default AddGoalDialog;