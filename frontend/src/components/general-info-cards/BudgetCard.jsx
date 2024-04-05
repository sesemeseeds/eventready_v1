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
  const [availableBudget, setAvailableBudget] = useState(0);
  const [totalBudget, setTotalBudget] = useState(0);
  const [leftoverBudget, setLeftoverBudget] = useState(0);

  const calculateValues = () => {
    if (!budget || budget.length === 0) return 0;
    budget?.filter((bud) => {
      const total = bud.total;
      const leftover = bud.leftover;
      const progress = (leftover / total) * 100;
      setAvailableBudget(total - leftover);
      setTotalBudget(total);
      setLeftoverBudget(leftover);
      setValue(progress);
    });
  };

  useEffect(() => {
    calculateValues();
  }, [budget]);

  return (
    <Card sx={{ boxShadow: 3, width: 300,  height: 300   }}>
          <Box sx={{ backgroundImage: "linear-gradient(15deg, #80d0c7 0%,  #13547a 0%)", paddingLeft: "10px" }}>
        {" "}
        <Typography  variant="h5" component="div" color="white">
          Budget
        </Typography>
      </Box>

 
        <CardContent sx={{ height: 310, textAlign: "-webkit-center" }}>
          <Box>
            <Typography fontWeight="bold" marginBottom="20px" fontSize="20px">
              ${availableBudget} Available
            </Typography>
          </Box>
          <Box sx={{ width: 190 }}>
            <CircularProgressbar
              value={value}
              text={`$${leftoverBudget} / $${totalBudget} Used `}
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
