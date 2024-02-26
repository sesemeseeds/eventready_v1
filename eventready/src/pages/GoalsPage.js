import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import AxiosInstance from "../components/Axios";

import { Grid } from '@mui/material';

import GoalCard from "../components/goals/GoalCard";

const GoalsPage = () => {
  const [allGoals, setAllGoals] = useState([]);
  const [isLoading, setLoading] = useState(true);
  
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

  return (
    <div>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="stretch"
        rowSpacing={4}
        columnSpacing={3}
        sx={{ width: '100%', margin: 0 }}
      >
        {allGoals &&
          allGoals.map((goal) => (
            <Grid item key={goal.id}>
              <GoalCard
                goal={goal}
              />
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

export default GoalsPage;