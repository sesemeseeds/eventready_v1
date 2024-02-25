import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import AxiosInstance from "../components/Axios";

import ProgressDonut from '../components/goals/ProgressDonut'

const GoalsPage = () => {
  const [allGoals, setAllGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [goalName, setGoalName] = useState(String);
  const [goalDueDate, setGoalDueDate] = useState(String);
  const [goalDescription, setGoalDescription] = useState(String);

  const MyParam = useParams();
  const eventId = MyParam.id;

  useEffect(() => {
    const getAllGoals = async () => {
      try {
        const response = await AxiosInstance.get(`goals/?event=${eventId}`);
        const goalData = response.data;
        if (!goalData) {
            setAllGoals([]);
        } else {
            setAllGoals(goalData);
            console.log(goalData);
        }
      } catch (error) {
        console.error("Error fetching event goals:", error);
      }
    };

    getAllGoals();
  }, [eventId]);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear() % 100;

    const formattedDate = `${month}/${day}/${year}`;
  
    return formattedDate;
  }

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
                <Card sx={{ width: "200px", height: "200px" }}>
                    <CardMedia />
                    <CardContent sx={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: "100%" }}>
                        <ProgressDonut value={goal.progress}/>
                        <Typography variant="h7" component="div" sx={{ fontWeight: 'bold', textAlign: 'center', paddingTop: '10px' }}>
                            {goal.name}
                        </Typography>
                        <Typography variant="caption" sx={{ position: 'absolute', bottom: '8px', right: '8px' }}>due: {formatDate(goal.due_date)}</Typography>
                    </CardContent>
                </Card>
                </Grid>
            ))}
        </Grid>
    </div>
  );
};

export default GoalsPage;