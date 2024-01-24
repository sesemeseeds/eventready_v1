import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function MarketingCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Marketing
          </Typography>
          <Typography variant="body2" color="text.secondary">
            This will be where the marketing information will go
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}