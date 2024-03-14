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

  const calculateValue = () => {
    if (!goals || goals.length === 0) return 0;
    const completedGoals = goals.filter((goal) => goal.progress === 100).length;
    const totalGoals = goals.length;

    setCompletedGoals(completedGoals);
    setTotalGoals(totalGoals);
    return (completedGoals / totalGoals) * 100;
  };

  useEffect(() => {
    setValue(calculateValue());
  }, [goals]);

  return (
    <Card sx={{ boxShadow: 3, width: 300 }}>
      <Box sx={{ backgroundColor: "#FFB000", paddingLeft: "10px" }}>
        {" "}
        <Typography variant="h5" component="div">
          Goals
        </Typography>
      </Box>

      <CardActionArea>
        <CardContent>
          <div style={{ width: 250 }}>
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
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
