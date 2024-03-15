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
import PersonIcon from "@mui/icons-material/Person";
import FeedIcon from '@mui/icons-material/Feed';

export default function AttendanceCard({ attendance }) {
  const [value, setValue] = useState(0);

  const calculateValue = () => {};

  useEffect(() => {}, [attendance]);

  return (
    <Card sx={{ boxShadow: 3, width: 300 }}>
      <Box sx={{ backgroundColor: "#FFB000", paddingLeft: "10px" }}>
        {" "}
        <Typography fontWeight="bold" variant="h5" component="div">
          Attendance
        </Typography>
      </Box>

      <CardActionArea>
        <CardContent sx={{ height: 310 }}>
        <Box sx={{ display: "flex", alignItems: "center", marginTop: 3}}>
            {" "}
            <FeedIcon sx={{ fontSize: 50 }}> </FeedIcon>
            <Typography fontSize="20px" fontWeight="bold">60 Form Responses</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", marginTop: 5 }}>
            {" "}
            <PersonIcon sx={{ fontSize: 50 }}> </PersonIcon>
            <Typography fontSize="20px" fontWeight="bold">50 People Attended</Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
