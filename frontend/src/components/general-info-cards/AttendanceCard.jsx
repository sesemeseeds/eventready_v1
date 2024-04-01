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
import FeedIcon from "@mui/icons-material/Feed";

export default function AttendanceCard({ attendance }) {
  const [totalAttendee, setTotalAttendee] = useState(0);
  const [totalResponse, setTotalResponse] = useState(0);

  const calculateValue = () => {
    if (!attendance || attendance.length === 0) return 0;
    const totalAttended = attendance?.filter(
      (attendee) => attendee.attended === true
    ).length;
    const totalResponses = attendance.length;
    setTotalAttendee(totalAttended);
    setTotalResponse(totalResponses);
  };

  useEffect(() => {calculateValue();}, [attendance]);

  return (
    <Card sx={{ boxShadow: 3, width: 300, height: 300   }}>
      <Box sx={{ backgroundImage: "linear-gradient(15deg, #80d0c7 0%,  #13547a 0%)", paddingLeft: "10px" }}>
        {" "}
        <Typography  variant="h5" component="div" color="white">
          Attendance
        </Typography>
      </Box>

      <CardActionArea>
        <CardContent sx={{ height: 300 }}>
          <Box sx={{ display: "flex", alignItems: "center", marginTop: 3 }}>
            {" "}
            <FeedIcon sx={{ fontSize: 50 }}> </FeedIcon>
            <Typography fontSize="20px" fontWeight="bold">
              {totalResponse} Form Responses
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", marginTop: 5 }}>
            {" "}
            <PersonIcon sx={{ fontSize: 50 }}> </PersonIcon>
            <Typography fontSize="20px" fontWeight="bold">
              {totalAttendee} People Attended
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
