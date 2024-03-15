import { useState } from 'react';

import { Checkbox, Divider, FormControlLabel, Grid, Switch, Typography, TableSortLabel, Tooltip } from '@mui/material';

const TaskList = ({ goal, goalNames, tasks, selectedTasks, setSelectedTasks }) => {
    const [hideAssociatedTasks, setHideAssociatedTasks] = useState(true);
    const [sortBy, setSortBy] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');

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

    const handleSelectAll = () => {
        const allTaskIds = tasks.map((task) => task.id);
        if (selectedTasks.length === allTaskIds.length) {
          // Deselect all tasks
          setSelectedTasks([]);
        } else {
          // Select all tasks
          setSelectedTasks(allTaskIds);
        }
      };

    const handleSort = (property) => {
        const direction = sortBy === property && sortDirection === 'asc' ? 'desc' : 'asc';
        setSortBy(property);
        setSortDirection(direction);
    };

    const sortedTasks = tasks
        .slice()
        .filter(task => !hideAssociatedTasks ? !task.goal : true)
        .sort((a, b) => {
            if (sortBy) {
                const aValue = (String(a[sortBy]) || "").toLowerCase();
                const bValue = (String(b[sortBy]) || "").toLowerCase();
                if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
                if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
                return 0;
            }
            return 0;
        });

        return (
            <div>
                {/* Header outside the scrollable container */}
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={2}>
                        <Checkbox
                        indeterminate={selectedTasks.length > 0 && selectedTasks.length < tasks.length}
                        checked={selectedTasks.length === tasks.length}
                        onChange={handleSelectAll}
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
                    </Grid>
                    {/* Goal name column */}
                    <Grid item xs={5}>
                        <TableSortLabel
                            active={sortBy === 'goal'}
                            direction={sortDirection}
                            onClick={() => handleSort('goal')}
                        >
                            <Typography variant="h9">Goal</Typography>
                        </TableSortLabel>
                        <Tooltip title={`Toggle Associated Goals`} placement='right'>
                            <FormControlLabel
                                style={{paddingLeft: '10px'}}
                                control={<Switch checked={hideAssociatedTasks} onChange={toggleHideAssociatedTasks} />}
                                label=""
                            />
                        </Tooltip>
                    </Grid>
                </Grid>
                <Divider/>
    
                {/* Scrollable container */}
                <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    {sortedTasks.map(task => (
                        <Grid item xs={12} key={task.id}>
                            <Grid container alignItems="center" spacing={2}>
                                {/* Checkbox column */}
                                <Grid item xs={2}>
                                    {task.goal === goal?.id || !task.goal ? (
                                        <Checkbox
                                            checked={selectedTasks.indexOf(task.id) !== -1}
                                            onChange={() => handleTaskCheckboxChange(task.id)}
                                        />
                                    ) : (
                                        <Tooltip title={`Associated with a different goal`}>
                                            <Checkbox disabled />
                                        </Tooltip>
                                    )}
                                </Grid>
                                {/* Task name column */}
                                <Grid item xs={5}>
                                    <span>{task.title}</span>
                                </Grid>
                                {/* Goal name column */}
                                <Grid item xs={5}>
                                    <span>{goalNames[task.goal]}</span>
                                </Grid>
                            </Grid>
                            <Divider />
                        </Grid>
                    ))}
                </div>
            </div>
        );
    };
    
    export default TaskList;