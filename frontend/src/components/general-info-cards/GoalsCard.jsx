import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useState, useEffect } from "react";
import CardHeader from "@mui/material/CardHeader";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Tooltip } from "@mui/material";
import { Box, Container } from "@mui/material";
export default function GoalsCard({ goals }) {
  const [value, setValue] = useState(0);
  const [totalGoals, setTotalGoals] = useState(0);
  const [completedGoals, setCompletedGoals] = useState(0);
  const [goalWithNearDeadline, setGoalWithNearDeadline] = useState(0);
  const calculateValue = () => {
    if (!goals || goals.length === 0) return 0;
    const completedGoals = goals.filter((goal) => goal.progress === 100).length;
    const totalGoals = goals.length;

    setCompletedGoals(completedGoals);
    setTotalGoals(totalGoals);
    return (completedGoals / totalGoals) * 100;
  };

  const getGoalCounts = () => {
    if (!goals || goals.length === 0) return 0;

    const goalsWithNearDeadlineCount = goals.filter((goal) => {
      if (goal.due_date && goal.progress !== 100) {
        const deadlineDate = new Date(goal.due_date);
        const now = new Date();
        const differenceInDays = Math.floor(
          (deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
        );
        return differenceInDays <= 7 && differenceInDays >= 0;
      } else {
        return false;
      }
    }).length;

    setGoalWithNearDeadline(goalsWithNearDeadlineCount);
  };

  useEffect(() => {
    getGoalCounts();
    setValue(calculateValue());
  }, [goals]);

  return (
    <Card sx={{ boxShadow: 3, width: 300, height: 300   }}>
          <Box sx={{ backgroundImage: "linear-gradient(15deg, #80d0c7 0%,  #13547a 0%)", paddingLeft: "10px" }}>
        {" "}
        <Typography  variant="h5" component="div" color="white">
          Goals
        </Typography>
      </Box>


        <CardContent sx={{ height: 310, textAlign: "-webkit-center" }}>
          <Box >
            <Typography marginBottom="32px" fontSize="15px">
              <span>Goals with Upcoming Deadline: </span>
              <Typography component="span" fontWeight="bold">
                {goalWithNearDeadline}
              </Typography>
            </Typography>
          </Box>
          <Box sx={{width: 190 }}>
            <CircularProgressbar
              value={value}
              text={`
                  ${completedGoals} / ${totalGoals}  Goals Completed`}
              strokeWidth={10}
              styles={{
                path: {
                  stroke: `rgb(${255 - value * 2.55}, ${value * 2.55}, 0)`,
                  strokeLinecap: "butt",
                  transition: "stroke-dashoffset 0.5s ease 0s",
                },
                text: {
                  fill: "#000",
                  fontSize: "6px",
                  fontWeight: "bold",
                  textAlign: "center",
                },
                trail: {
                  stroke: "#d6d6d6",
                },
              }}
            />
          </Box>
        </CardContent>

    </Card>
  );
}
