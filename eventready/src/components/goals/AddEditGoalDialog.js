import { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid, Typography } from '@mui/material';

import AxiosInstance from "../Axios";

import TaskList from './TaskList';

const AddEditGoalDialog = ({ isOpen, onClose, eventId, setAllGoals, goal  }) => {
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

  useEffect(() => {
    if (goal) {
        // Populate newGoalData with the goal data
        setNewGoalData({
            name: goal.name || '',
            due_date: goal.due_date || '',
            description: goal.description || '',
            progress: goal.progress || 0,
            tasks: goal.tasks || [],
        });
        // Populate selected tasks if they exist in the goal
        if (goal.tasks && goal.tasks.length > 0) {
            setSelectedTasks(goal.tasks.map(task => task.id));
        }
    }
  }, [goal]);

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

  const isAddButtonDisabled = !newGoalData.name || !newGoalData.due_date;

  const handleAddGoal = async () => {
    try {
        let response;
        if (goal) {
            // Editing existing goal
            response = await AxiosInstance.put(`goals/${goal.id}/`, {
                ...goal,
                ...newGoalData
            });
        } else {
            // Adding new goal
            response = await AxiosInstance.post('goals/', {
                event_id: eventId,
                ...newGoalData
            });
        }
        
        const updatedGoal = response.data;

        // Update tasks if necessary
        const updatedTasks = tasks.map(task => {
            if (selectedTasks.includes(task.id)) {
                return {
                    ...task,
                    goal: updatedGoal.id
                };
            }
            return task;
        });

        await Promise.all(updatedTasks.map(task => AxiosInstance.put(`/tasks/${task.id}/`, task)));
        
        // Update list of goals if it's a new goal
        if (!goal) {
            setAllGoals(prevGoals => [...prevGoals, updatedGoal]);
        }

        onClose();
        window.location.reload();
    } catch (error) {
        console.error("Error adding/editing goal:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGoalData({
      ...newGoalData,
      [name]: value
    });
  };

    return (
        <Dialog open={isOpen} onClose={onClose} maxWidth="md">
        <DialogTitle>{goal ? 'Edit Goal' : 'Create Goal'}</DialogTitle>
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
                    {(!newGoalData.name || !newGoalData.due_date) && (
                        <Typography
                            variant="body2"
                            color="error"
                            style={{ position: 'absolute', bottom: 18, right: 250 }}
                        >
                            Please provide a name and a due date.
                        </Typography>
                    )}
                    <div style={{ height: '350px', width: '400px'}}>
                    <TaskList
                        goal={null}
                        goalNames={goalNames}
                        tasks={tasks}
                        selectedTasks={selectedTasks}
                        setSelectedTasks={setSelectedTasks}
                    />
                    </div>
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button
                onClick={handleAddGoal}
                variant="contained"
                color="primary"
                disabled={isAddButtonDisabled}
            >
                {goal ? 'Edit Goal' : 'Add Goal'}
            </Button>
        </DialogActions>
    </Dialog>
  );
};

export default AddEditGoalDialog;