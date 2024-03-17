import { useState, useEffect } from 'react';

import AxiosInstance from "../Axios";

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Paper, Divider, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Tooltip, Switch } from '@mui/material';
import {TruncateText} from '../util/TruncateText';
import FormatDate from '../util/FormatDate';
import DescriptionDialog from '../dialog/DescriptionDialog';

const TaskAssociationDialog = ({ eventId, open, onClose, goal, setProgress }) => {
    const [tasks, setTasks] = useState([]);
    const [selectedTasks, setSelectedTasks] = useState([]);
    const [associatedTasks, setAssociatedTasks] = useState([]);
    const [openDescriptionDialog, setOpenDescriptionDialog] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const [hideDoneTasks, setHideDoneTasks] = useState(false); 

    const MAX_NAME_LENGTH = 50;

    useEffect(() => {
        const fetchTasks = () => {
            AxiosInstance.get(`/tasks/?event_id=${eventId}`)
                .then(response => {
                    setTasks(response.data);
                })
                .catch(error => {
                    console.error("Error fetching tasks:", error);
                });
        };

        fetchTasks();
    }, [eventId]);

    useEffect(() => {
        setProgress(calculateProgress());
    }, [tasks, selectedTasks, goal.id, setProgress]);

    useEffect(() => {
        if (tasks.length > 0) {
            const associatedTasks = tasks.filter(task => task.goal === goal.id);
            const initiallySelectedTasks = associatedTasks.map(task => task.id);
            setAssociatedTasks(associatedTasks);
            setSelectedTasks(initiallySelectedTasks);
        }
    }, [tasks, goal.id]);

    const calculateProgress = () => {
        const totalTasks = selectedTasks.length;
        const doneTasks = selectedTasks.filter(taskId => {
            const task = tasks.find(task => task.id === taskId);
            return task && task.status === 'Done';
        }).length;
        const progress = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;
        
        return progress;
    };

    const getPriorityLabel = (priority) => {
        switch (true) {
          case priority >= 1 && priority <= 3:
            return "Low";
          case priority >= 4 && priority <= 7:
            return "Medium";
          case priority >= 8 && priority <= 10:
            return "High";
          default:
            return "Unknown";
        }
    };
    
    const handleDescriptionClick = (taskId) => {
        setSelectedTaskId(taskId);
        setOpenDescriptionDialog(true);
    };

    const handleCloseDescriptionDialog = () => {
        setOpenDescriptionDialog(false);
    };

    const toggleHideDoneTasks = () => {
        setHideDoneTasks(prevState => !prevState);
    };

    const handleCancel = () => {
        onClose();
    };
    
    return (
        <div>
            <Dialog open={open} onClose={onClose} maxWidth="lg">
                <Paper sx={{ width: 800, height: 600 }}>
                    <DialogTitle>Task Breakdown for  
                        <TruncateText text={" " + goal.name} maxLength={MAX_NAME_LENGTH}/>
                    </DialogTitle>
                    <div>         
                    <Switch
                        checked={hideDoneTasks}
                        onChange={toggleHideDoneTasks}
                        inputProps={{ 'aria-label': 'show done tasks' }}
                        />
                    <span>Hide Completed Tasks</span>
                </div>
                    <Divider/>
                    <DialogContent sx={{ height: 442, overflowY: 'auto', padding: '0 20px' }}>
                    <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Task Name</TableCell>
                                        <TableCell>Priority</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Assignee</TableCell>
                                        <TableCell>Deadline</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {associatedTasks.map(task => (
                                            (!hideDoneTasks || task.status !== 'Done') &&
                                        <TableRow key={task.id}>
                                            <TableCell>
                                                {   task.description ? 
                                                (
                                                    <Tooltip title="Show Task Description" placement="left" onClick={() => handleDescriptionClick(task.id)}>
                                                        <span style={{cursor: 'pointer'}}>{task.title}</span>
                                                    </Tooltip>
                                                ) 
                                                :
                                                (
                                                    <span>{task.title}</span>
                                                )
                                                }
                                            </TableCell>
                                            <TableCell>{getPriorityLabel(task.priority)}</TableCell>
                                            <TableCell>{task.status}</TableCell>
                                            <TableCell>{task.assigned_to}</TableCell>
                                            <TableCell>{FormatDate(task.deadline_date, 'MM/DD/YYYY')}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </DialogContent>
                    <Divider/>
                    <DialogActions style={{ position: 'absolute', bottom: 0, right: 0 }}>
                        <Button onClick={handleCancel}>Close</Button>
                    </DialogActions>
                </Paper>
            </Dialog>
            <DescriptionDialog
                isOpen={openDescriptionDialog && selectedTaskId !== null}
                onClose={handleCloseDescriptionDialog}
                description={tasks.find(task => task.id === selectedTaskId)?.description}
                title={tasks.find(task => task.id === selectedTaskId)?.title}
            />
        </div>
    );
};

export default TaskAssociationDialog;
