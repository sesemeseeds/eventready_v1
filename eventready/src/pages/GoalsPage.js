import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import AxiosInstance from "../components/Axios";

import { Grid, IconButton } from '@mui/material';

import GoalCard from "../components/goals/GoalCard";
import AddEditGoalDialog from "../components/goals/AddEditGoalDialog";
import { AddCircleOutline as AddCircleOutlineIcon } from '@mui/icons-material';

const GoalsPage = () => {
  const [allGoals, setAllGoals] = useState([]);
  const [openDialog, setOpenDialog] = useState(false); 
  
  const MyParam = useParams();
  const eventId = MyParam.id;

  useEffect(() => {
    const getAllGoals = async () => {
      try {
        const response = await AxiosInstance.get(`goals/?event_id=${eventId}`);
        const goalData = response.data;
        if (!goalData) {
            setAllGoals([]);
        } else {
            setAllGoals(goalData);
        }
      } catch (error) {
        console.error("Error fetching event goals:", error);
      }
    };

    getAllGoals();
  }, [eventId]);

  const handleDeleteGoal = async (goalId) => {
    try {
        await AxiosInstance.delete(`goals/${goalId}/`);
        setAllGoals(allGoals.filter(goal => goal.id !== goalId));
    } catch (error) {
        console.error("Error deleting goal:", error);
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  // Function to close the dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div className='container'>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="stretch"
        rowSpacing={4}
        columnSpacing={4}
        sx={{ width: '100%', margin: 0 }}
      >
        {allGoals &&
          allGoals.map((goal) => (
            <Grid item key={goal.id}>
              <GoalCard
                eventId={eventId}
                goal={goal}
                handleDeleteGoal={handleDeleteGoal}
                setAllGoals={setAllGoals}
              />
            </Grid>
          ))}
      </Grid>
      <IconButton 
        sx={{ 
          position: 'fixed', 
          top: 100, 
          right: 35,
          backgroundColor: 'white',
          borderRadius: '50%',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
        }} 
        onClick={handleOpenDialog}
      >
        <AddCircleOutlineIcon fontSize="large" />
      </IconButton>
      <AddEditGoalDialog isOpen={openDialog} onClose={handleCloseDialog} eventId={eventId} setAllGoals={setAllGoals} goal={null}/>
    </div>
  );
};

export default GoalsPage;