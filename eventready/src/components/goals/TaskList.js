import {useState, useEffect} from 'react';
import { Checkbox, Divider, Tooltip } from '@mui/material';

import AxiosInstance from "../Axios";


const TaskList = ({ goalId, goalNames, tasks, selectedTasks, setSelectedTasks }) => {
    
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
