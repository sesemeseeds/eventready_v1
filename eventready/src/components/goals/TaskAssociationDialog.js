import { useState, useEffect } from 'react';

import AxiosInstance from "../Axios";

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Checkbox, Paper, Divider, Tooltip } from '@mui/material';
import TaskList from './TaskList';


const TaskAssociationDialog = ({ eventId, open, onClose, goalId, setProgress }) => {
    const [tasks, setTasks] = useState([]);
    const [selectedTasks, setSelectedTasks] = useState([]);
    const [originalSelectedTasks, setOriginalSelectedTasks] = useState([]);
    const [goalNames, setGoalNames] = useState({});

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

    useEffect(() => {
        setProgress(calculateProgress());
    }, [tasks, selectedTasks, goalId, setProgress]);

    useEffect(() => {
        if (tasks.length > 0) {
            const associatedTasks = tasks.filter(task => task.goal === goalId);
            const initiallySelectedTasks = associatedTasks.map(task => task.id);
            setSelectedTasks(initiallySelectedTasks);
            setOriginalSelectedTasks(initiallySelectedTasks);
        }
    }, [tasks, goalId]);

    const calculateProgress = () => {
        const totalTasks = selectedTasks.length;
        const doneTasks = selectedTasks.filter(taskId => {
            const task = tasks.find(task => task.id === taskId);
            return task && task.status === 'Done';
        }).length;
        const progress = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;
        
        return progress;
    };

    const handleAssociateTasks = () => {
        const deselectedTasks = tasks
            .filter(task => task.goal === goalId && !selectedTasks.includes(task.id))
            .map(task => task.id);
    
        const updateTasksPromises = selectedTasks.map(taskId => {
            return AxiosInstance.patch(`/tasks/${taskId}/`, { goal: goalId });
        });
    
        const disassociateTasksPromises = deselectedTasks.map(taskId => {
            return AxiosInstance.patch(`/tasks/${taskId}/`, { goal: null });
        });
    
        Promise.all([...updateTasksPromises, ...disassociateTasksPromises])
            .then(responses => {
                return AxiosInstance.patch(`/goals/${goalId}/`, { tasks: selectedTasks });
            })
            .then(response => {
                setProgress(prevProgress => {
                    const progress = calculateProgress();
                    return progress;
                });
                onClose();
            })
            .catch(error => {
                console.error("Error associating tasks:", error);
            });
        
        AxiosInstance.get(`/goals/${goalId}/`)
            .then(response => {
                const goal = response.data;
                goal.progress = calculateProgress();
                return AxiosInstance.patch(`/goals/${goalId}/`, goal); 
            })
            .catch(error => {
                console.error("Error updating goal progress:", error);
            });
    };

    const handleCancel = () => {
        setSelectedTasks(originalSelectedTasks);
        onClose();
    };
    
    return (
        <Dialog open={open} onClose={onClose}>
            <Paper sx={{ width: 500, height: 500 }}>
                <DialogTitle>Associated Tasks</DialogTitle>
                <Divider/>
                <DialogContent sx={{ height: 380, overflowY: 'auto', padding: '0 20px' }}>
                    <TaskList
                            goalId={goalId}
                            goalNames={goalNames}
                            tasks={tasks}
                            selectedTasks={selectedTasks}
                            setSelectedTasks={setSelectedTasks}
                        />
                </DialogContent>
                <Divider/>
                <DialogActions style={{ position: 'absolute', bottom: 0, right: 0 }}>
                    <Button onClick={handleCancel}>Cancel</Button>
                    <Button onClick={handleAssociateTasks}>Associate Tasks</Button>
                </DialogActions>
            </Paper>
        </Dialog>
    );
};

export default TaskAssociationDialog;
