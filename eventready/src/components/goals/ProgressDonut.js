import { useState, useEffect } from 'react';

import AxiosInstance from "../Axios";

import { CircularProgressbar } from 'react-circular-progressbar';
import { Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, Button, Checkbox, Paper, Divider } from '@mui/material';
import 'react-circular-progressbar/dist/styles.css';

const ProgressDonut = ({ eventId, goalId }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [value, setValue] = useState(0);
  const [goalNames, setGoalNames] = useState({}); 

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

  useEffect(() => {
    fetchTasks();
    
  }, [eventId]);

  useEffect(() => {
    const calculateProgress = () => {
      const associatedTasks = tasks.filter(task => task.goal === goalId);
      const totalTasks = associatedTasks.length;
      const doneTasks = associatedTasks.filter(task => task.status === 'Done').length;
      const progress = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;
      return progress;
    };
  
    setValue(calculateProgress());
  }, [tasks, goalId]);

  useEffect(() => {
    const associatedTasks = tasks.filter(task => task.goal === goalId);
    const initiallySelectedTasks = associatedTasks.map(task => task.id);
    setSelectedTasks(initiallySelectedTasks);
  }, [tasks, goalId]);

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

  const handleAssociateTasks = () => {
    const updateTasksPromises = selectedTasks.map(taskId => {
      return AxiosInstance.patch(`/tasks/${taskId}/`, { goal: goalId });
    });
  
    // Execute all update promises concurrently
    Promise.all(updateTasksPromises)
      .then(responses => {
        return AxiosInstance.patch(`/goals/${goalId}/`, { tasks: selectedTasks });
      })
      .then(response => {
        handleCloseDialog();
      })
      .catch(error => {
        console.error("Error associating tasks:", error);
      });
  };
  
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div style={{ width: 100, height: 100, cursor: 'pointer' }}>
      <Tooltip title="View/Manage Associated Tasks">
        <div onClick={handleOpenDialog}>
          <CircularProgressbar
            value={value}
            text={`${value}%`}
            strokeWidth={10}
            styles={{
              path: {
                stroke: `rgb(${255 - (value * 2.55)}, ${value * 2.55}, 0)`,
                strokeLinecap: 'butt',
                transition: 'stroke-dashoffset 0.5s ease 0s',
              },
              text: {
                fill: '#000', 
                fontSize: '24px',
                fontWeight: 'bold',
              },
              trail: {
                stroke: '#d6d6d6',
              },
            }}
          />
        </div>
      </Tooltip>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <Paper sx={{ width: 500, height: 500 }}>
          <DialogTitle>Associated Tasks</DialogTitle>
          <Divider/>
          <DialogContent sx={{ height: 380, overflowY: 'auto', padding: '0 20px' }}>
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
              <Divider/>
            </div>
          ))}
          </DialogContent>
          <Divider/>
          <DialogActions style={{ position: 'absolute', bottom: 0, right: 0 }}>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleAssociateTasks}>Associate Tasks</Button>
          </DialogActions>
        </Paper>
      </Dialog>
    </div>
  );
};

export default ProgressDonut;
