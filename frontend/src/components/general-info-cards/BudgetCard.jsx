import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function BudgetCard() {
  return (
    <Card sx={{boxShadow: 3, width: 300 }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Budget
          </Typography>
          <Typography variant="body2" color="text.secondary">
            This is where the budget information will go
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}