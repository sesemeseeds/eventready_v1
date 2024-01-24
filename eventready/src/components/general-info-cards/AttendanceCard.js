import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function AttendanceCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Attendance
          </Typography>
          <Typography variant="body2" color="text.secondary">
          This is where the attendance information will go
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}