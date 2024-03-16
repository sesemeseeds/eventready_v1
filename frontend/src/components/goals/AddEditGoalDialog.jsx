import { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid, Typography } from '@mui/material';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import AxiosInstance from "../Axios";

import TaskList from './TaskList';

const AddEditGoalDialog = ({ isOpen, onClose, eventId, setAllGoals, goal  }) => {
    const [tasks, setTasks] = useState([]);
    const [goals, setGoals] = useState({});
    const [selectedTasks, setSelectedTasks] = useState([]);
    const [originalSelectedTasks, setOriginalSelectedTasks] = useState([]);
    const [originalGoalData, setOriginalGoalData] = useState(null);
    const [newGoalData, setNewGoalData] = useState({
        name: '',
        due_date: '',
        description: '',
        progress: 0,
        tasks: []
    });

    useEffect(() => {
        if (goal) {
            setNewGoalData({
                name: goal.name || '',
                due_date: goal.due_date || '',
                description: goal.description || '',
                progress: goal.progress || 0,
                tasks: goal.tasks || [],
            });
            setOriginalGoalData(goal);
            if (goal.tasks && goal.tasks.length > 0) {
                setSelectedTasks(goal.tasks.map(task => task.id));
                setOriginalSelectedTasks(goal.tasks.map(task => task.id));
            }
        }
    }, [goal]);

    useEffect(() => {
        if (tasks.length > 0) {
            const associatedTasks = tasks.filter(task => task.goal === goal?.id);
            const initiallySelectedTasks = associatedTasks.map(task => task.id);
            setSelectedTasks(initiallySelectedTasks);
            setOriginalSelectedTasks(initiallySelectedTasks);
        }
    }, [tasks, goal?.id]);

    const fetchTasksAndGoals = async () => {
        try {
            const response = await AxiosInstance.get(`/tasks/?event_id=${eventId}`);
            const tasksData = response.data;

            // Collect unique goal IDs from tasks
            const goalIds = [...new Set(tasksData.map(task => task.goal).filter(Boolean))];

            // Fetch all goals in parallel
            const goalsPromises = goalIds.map(goalId => AxiosInstance.get(`/goals/${goalId}/`));
            const goalsResponses = await Promise.all(goalsPromises);
            const goalsData = goalsResponses.map(response => response.data);

            // Organize goal data into an object for easy access
            const goalsArray = goalsData.map(goal => ({ id: goal.id, name: goal.name }));

            setTasks(tasksData);
            setGoals(goalsArray);
        } catch (error) {
            console.error("Error fetching tasks and goals:", error);
        }
    };

    useEffect(() => {
        fetchTasksAndGoals();
    }, [eventId]);

    const isAddButtonDisabled = !newGoalData.name || !newGoalData.due_date;

    const handleAddGoal = async () => {
        try {
            let response;
            if (goal) {
                response = await AxiosInstance.put(`goals/${goal.id}/`, {
                    ...goal,
                    ...newGoalData
                });
            } else {
                response = await AxiosInstance.post('goals/', {
                    event_id: eventId,
                    ...newGoalData
                });
            }
            
            const updatedGoal = response.data;

            const updatedTasks = tasks.map(task => {
                if (selectedTasks.includes(task.id)) {
                    return {
                        ...task,
                        goal: updatedGoal.id,
                    };
                } else if (task.goal === goal?.id) {
                    return {
                        ...task,
                        goal: null,
                    };
                }
                return task;
            });

            await Promise.all(updatedTasks.map(task => AxiosInstance.put(`/tasks/${task.id}/`, task)));
            
            if (!goal) {
                setAllGoals(prevGoals => [...prevGoals, updatedGoal]);
            }
            
            onClose();
            window.location.reload();
        } catch (error) {
            console.error("Error adding/editing goal:", error);
        }
    };

    useEffect(() => {
        calculateAndSetProgress();
    }, [selectedTasks]);

    const calculateAndSetProgress = () => {
        const totalTasks = selectedTasks.length;
        const doneTasks = selectedTasks.filter(taskId => {
            const task = tasks.find(task => task.id === taskId);
            return task && task.status === 'Done';
        }).length;
        const progress = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

        setNewGoalData(prevData => ({
            ...prevData,
            progress: progress
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewGoalData({
            ...newGoalData,
            [name]: value
        });
    };

    const handleCancel = () => {
        if (originalGoalData) {
            setNewGoalData(originalGoalData);
        }
        setSelectedTasks(originalSelectedTasks);
        onClose();
    };

    return (
        <Dialog open={isOpen} onClose={onClose} maxWidth="md">
            <DialogTitle>
                {goal ? 'Edit Goal' : 'Create Goal'}
            </DialogTitle>
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
                    <Grid item xs={6} style={{paddingTop: '8px'}}>
                    <ReactQuill
                        theme="snow"
                        value={newGoalData.description}
                        onChange={value => setNewGoalData({...newGoalData, description: value})}
                        placeholder="Enter your description here!"
                        style={{ marginTop: 8, marginBottom: 16, height: 345 }}
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
                            eventId={eventId}
                            goal={goal}
                            goals={goals}
                            tasks={tasks}
                            selectedTasks={selectedTasks}
                            setSelectedTasks={setSelectedTasks}
                            refreshTasks={fetchTasksAndGoals}
                        />
                        </div>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel}>Cancel</Button>
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