import { useState, useEffect } from 'react';

import { Checkbox, Divider, FormControlLabel, Grid, Switch, Typography, TableSortLabel, Tooltip, IconButton  } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import AddTaskDialog from '../tasks-components/AddTaskDialog';

const TaskList = ({ eventId, goal, goals, tasks, selectedTasks, setSelectedTasks, refreshTasks }) => {
    const [hideAssociatedTasks, setHideAssociatedTasks] = useState(true);
    const [sortBy, setSortBy] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');
    const [sortedTasks, setSortedTasks] = useState([]);
    const [openAddTaskDialog, setOpenAddTaskDialog] = useState(false);

    useEffect(() => {
        const filteredTasks = tasks.slice().filter(task => {
            if (!hideAssociatedTasks) {
                return true;
            }
            return !task.goal || task.goal === goal?.id;
        });

        const sortedTasks = filteredTasks.sort((a, b) => {
            if (sortBy === 'title') {
                const aValue = (String(a.title) || "").toLowerCase();
                const bValue = (String(b.title) || "").toLowerCase();
                return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
            } else if (sortBy === 'goal') {
                const aValue = goals[a.goal]?.name || '';
                const bValue = goals[b.goal]?.name || '';
                return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
            }
            return 0;
        });

        setSortedTasks(sortedTasks);
    }, [tasks, goal?.id, hideAssociatedTasks, sortBy, sortDirection, goals]);

    const handleTaskCheckboxChange = (taskId) => {
        const selectedIndex = selectedTasks.indexOf(taskId);
        let newSelectedTasks = [];

        if (selectedIndex === -1) {
            newSelectedTasks = [...selectedTasks, taskId];
        } else {
            newSelectedTasks = selectedTasks.filter(id => id !== taskId);
        }

        setSelectedTasks(newSelectedTasks);
    };

    const toggleHideAssociatedTasks = () => {
        setHideAssociatedTasks(!hideAssociatedTasks);
    };

    const isSelectAllDisabled = !tasks.some(task => task.goal === null) && !tasks.some(task => task.goal === goal?.id);

    const handleSelectAll = () => {
        const selectableTasks = tasks.filter(task => task.goal === null || task.goal === goal?.id);
        const allTaskIds = selectableTasks.map(task => task.id);
    
        if (selectedTasks.length === allTaskIds.length) {
            setSelectedTasks([]);
        } else {
            const deselectedTaskIds = allTaskIds.filter(taskId => !selectedTasks.includes(taskId));
            setSelectedTasks([...selectedTasks, ...deselectedTaskIds]);
        }
    };

    const handleSort = property => {
        const direction = sortBy === property && sortDirection === 'asc' ? 'desc' : 'asc';
        setSortBy(property);
        setSortDirection(direction);
    };

    const handleOpenAddTaskDialog = () => {
        setOpenAddTaskDialog(true);
    };
    
    const handleCloseAddTaskDialog = () => {
        setOpenAddTaskDialog(false);
    };

    return (
        <div>
            {/* Header outside the scrollable container */}
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={2}>
                    <Checkbox 
                        indeterminate={selectedTasks.length > 0 && selectedTasks.length < tasks.length}
                        checked={selectedTasks.length === tasks.length && tasks.length > 0}
                        onChange={handleSelectAll}
                        disabled={isSelectAllDisabled}
                        style={{padding: '9px 0px 9px 9px'}}
                    />
                </Grid>
                <Grid item xs={5}>
                    <TableSortLabel
                        active={sortBy === 'title'}
                        direction={sortDirection}
                        onClick={() => handleSort('title')}
                    >
                        <Typography variant="h9">Task</Typography>
                    </TableSortLabel>
                    {goal &&
                        <Tooltip title="Add Task" placement="left">
                            <IconButton style={{padding: '0px',  marginLeft:'70px'}} onClick={handleOpenAddTaskDialog}>
                                <AddIcon />
                            </IconButton>
                        </Tooltip>
                    }
                </Grid>
                {/* Goal name column */}
                <Grid item xs={5} >
                    <TableSortLabel
                        active={sortBy === 'goal'}
                        direction={sortDirection}
                        onClick={() => handleSort('goal')}
                    >
                        <Typography variant="h9">Goal</Typography>
                    </TableSortLabel>
                    <Tooltip title={`Toggle Associated Goals`} placement='right'>
                        <FormControlLabel
                            style={{marginRight: '0px', paddingLeft: '15px'}}
                            control={<Switch checked={!hideAssociatedTasks} onChange={toggleHideAssociatedTasks} />}
                            label=""
                        />
                    </Tooltip>
                </Grid>
            </Grid>
            <Divider/>

            {/* Scrollable container */}
            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {sortedTasks.length === 0 ? (
                    <Typography 
                    variant="caption" 
                    component="div" 
                    sx={{ 
                        textAlign: 'center', 
                        paddingTop: '20px', 
                        fontStyle: 'italic', 
                        color: 'gray' 
                    }}
                >
                    No Available Tasks
                </Typography>
                ) : (
                    // Render the tasks
                    sortedTasks.map(task => (
                        <Grid item xs={12} key={task.id}>
                            <Grid container alignItems="center" spacing={2}>
                                {/* Checkbox column */}
                                <Grid item xs={2}>
                                    {task.goal === goal?.id || !task.goal ? (
                                        <Grid item xs={1}>
                                            <Checkbox
                                                checked={selectedTasks.indexOf(task.id) !== -1}
                                                onChange={() => handleTaskCheckboxChange(task.id)}
                                            />
                                        </Grid>
                                    ) : (
                                        <Grid item xs={2} style={{ display: 'none' }}></Grid>
                                    )}
                                </Grid>
                                {/* Task name column */}
                                <Grid item xs={5}>
                                    <span>{task.title}</span>
                                </Grid>
                                {/* Goal name column */}
                                <Grid item xs={5}>
                                    <span>{goals.find(g => g.id === task.goal)?.name}</span>
                                </Grid>
                            </Grid>
                            <Divider />
                        </Grid>
                    ))
                )}
            </div>

            <AddTaskDialog
                open={openAddTaskDialog}
                onClose={handleCloseAddTaskDialog}
                refreshTasks={refreshTasks}
                eventId={eventId}
                columnId={'1'}
                goals={goals}
                defaultGoal={goal}
            />
        </div>
    );
};

export default TaskList;