import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function GoalsCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Goals
          </Typography>
          <Typography variant="body2" color="text.secondary">
            This is where the goals information will go
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}