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
export default function BudgetCard({ budget }) {
  const [value, setValue] = useState(0);
  const [totalGoals, setTotalGoals] = useState(0);
  const [completedGoals, setCompletedGoals] = useState(0);

  const calculateValue = () => {
    // if (!goals || goals.length === 0) return 0;
    // const completedGoals = goals.filter((goal) => goal.progress === 100).length;
    // const totalGoals = goals.length;
    // setCompletedGoals(completedGoals);
    // setTotalGoals(totalGoals);
    // return (completedGoals / totalGoals) * 100;
  };

  useEffect(() => {
    // setValue(calculateValue());
  }, [budget]);

  return (
    <Card sx={{ boxShadow: 3, width: 300 }}>
      <Box sx={{ backgroundColor: "#FFB000", paddingLeft: "10px" }}>
        {" "}
        <Typography fontWeight="bold" variant="h5" component="div">
          Budget
        </Typography>
      </Box>

      <CardActionArea>
        <CardContent sx={{ height: 310, textAlign: "-webkit-center" }}>
          <Box>
            <Typography fontWeight="bold" marginBottom="20px" fontSize="20px">
              $500.00 Available
            </Typography>
          </Box>
          <Box sx={{ width: 220 }}>
            <CircularProgressbar
              value={75}
              // text={`
              //     ${completedGoals} / ${totalGoals}  Goals Completed`}
              text={"$2500 / $3000 Budget Used"}
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
      </CardActionArea>
    </Card>
  );
}
