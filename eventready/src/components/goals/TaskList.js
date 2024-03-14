import {useState, useEffect} from 'react';
import { Checkbox, Divider, Tooltip } from '@mui/material';

const TaskList = ({ tasks, selectedTasks, goalId, handleTaskCheckboxChange, goalNames }) => {
    
    return (
        <div>
            {tasks.map(task => (
                <div key={task.id}>
                    {task.goal === goalId || task.goal === null ? (
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
    );
};

export default TaskList;
