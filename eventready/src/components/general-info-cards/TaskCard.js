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

export default function TaskCard({ tasks }) {
  const [value, setValue] = useState(0);
  const [totalTasks, settotalTasks] = useState(0);
  const [completedTasks, setcompletedTasks] = useState(0);
  const [highPriorityTasks, setHighPriorityTasks] = useState(0);
  const [tasksWithNearDeadlines, setTasksWithNearDeadlines] = useState(0);

  const calculateValue = () => {
    if (!tasks || tasks.length === 0) return 0;
    const completedTasks = tasks.filter(
      (task) => task.status === "Done"
    ).length;
    const totalTasks = tasks.length;
  
    setcompletedTasks(completedTasks);
    settotalTasks(totalTasks);

    return (completedTasks / totalTasks) * 100;
  };

  const getTasksCounts = () => {
    if (!tasks || tasks.length === 0) return 0;
    const highPriorityTasksCount = tasks.filter(
      (task) => task.priority >= 8 && task.priority <= 10 && task.status !== "Done"
    ).length;
    const tasksWithNearDeadlineCount = tasks.filter((task) =>  { 
      if (task.deadline_date && task.status !== "Done") {
        const deadlineDate = new Date(task.deadline_date);
        const now = new Date();
        const differenceInDays = Math.floor(
          (deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
        );
        return differenceInDays <= 7 && differenceInDays >= 0;
      } else {
        return false;
      }
    }).length;


    setHighPriorityTasks(highPriorityTasksCount);
    setTasksWithNearDeadlines(tasksWithNearDeadlineCount);
  }

  useEffect(() => {
    getTasksCounts();
    setValue(calculateValue());
  }, [tasks]);

  return (
    <Card sx={{ boxShadow: 3, width: 300 }}>
      <Box sx={{ backgroundColor: "#FFB000", paddingLeft: "10px" }}>
        <Typography fontWeight="bold" variant="h5" component="div">
          Tasks
        </Typography>
      </Box>
      <CardActionArea>
        <CardContent sx={{ textAlign: "-webkit-center" }}>
          <div style={{ width: 220, marginBottom: "5px" }}>
            <CircularProgressbar
              value={value}
              text={`${completedTasks} / ${totalTasks} Tasks Completed`}
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
          </div>
          <div>
            <Typography fontSize="15px">
              <span>High Priority Tasks Incomplete: </span>
              <Typography component="span" fontWeight="bold">
                {highPriorityTasks}
              </Typography>
            </Typography>
          </div>
          <div>
            <Typography fontSize="15px" >
              <span>Tasks with Upcoming Deadline: </span>
              <Typography component="span" fontWeight="bold">
                {tasksWithNearDeadlines}
              </Typography>
            </Typography>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
