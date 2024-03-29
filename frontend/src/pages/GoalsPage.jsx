import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AxiosInstance from "../components/Axios";

import { Button, Grid, IconButton } from "@mui/material";

import GoalCard from "../components/goals/GoalCard";
import AddEditGoalDialog from "../components/goals/AddEditGoalDialog";
import AddIcon from "@mui/icons-material/Add";

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
      setAllGoals(allGoals.filter((goal) => goal.id !== goalId));
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
    <div className="container">
      <Button
        variant="contained"
        sx={{
          display: "flex",
          float: "right",
          backgroundColor: " #13547a ",
     
        }}
        startIcon={<AddIcon />}
        size="medium"
        onClick={handleOpenDialog}
      >
        Add Goal
      </Button>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="stretch"
        rowSpacing={4}
        columnSpacing={4}
        sx={{ width: "100%", margin: 0 }}
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

      <AddEditGoalDialog
        isOpen={openDialog}
        onClose={handleCloseDialog}
        eventId={eventId}
        setAllGoals={setAllGoals}
        goal={null}
      />
    </div>
  );
};

export default GoalsPage;
