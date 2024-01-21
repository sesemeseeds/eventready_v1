import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Footer  from "../components/Footer"
import Header from "../components/Header"

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(12),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

//   <Grid container 
//   direction="row"
//   justifyContent="center"   
//   alignItems="stretch"> 

export const LandingPage = () => {
    return (
        //<h1>Landing Page</h1>
        <div>
        <Header></Header>
        <Box sx={{ width: '50%' }}>
        <Grid container 
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        rowSpacing={4} 
        columnSpacing={{ xs: 1, sm: 2 , md:3}}>
          <Grid item xs={4}>
        <Card sx={{ width: '100%' }}>
        <CardMedia
            // component="img"
            // alt="green iguana"
            // height="140"
            // image="/static/images/cards/contemplative-reptile.jpg"
        />
        <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Event 1
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This is the meta data of Event 1. This will have event description.
          This is the meta data of Event 1. This will have event description.
          This is the meta data of Event 1. This will have event description.
        </Typography>
        </CardContent>
        <CardActions>
            <Button size="small">Edit Icon</Button>
        </CardActions>
        </Card>
          </Grid>
          <Grid item xs={4}>
          <Card sx={{ width: '100%' }}>
        <CardMedia
            // component="img"
            // alt="green iguana"
            // height="140"
            // image="/static/images/cards/contemplative-reptile.jpg"
        />
        <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Event 2
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This is the meta data of Event 2. This will have event description.
          This is the meta data of Event 2. This will have event description.
          This is the meta data of Event 2. This will have event description.
        </Typography>
        </CardContent>
        <CardActions>
            <Button size="small">Edit Icon</Button>
        </CardActions>
        </Card>
          </Grid>
          <Grid item xs={4}>
          <Card sx={{ width: '100%' }}>
        <CardMedia
            // component="img"
            // alt="green iguana"
            // height="140"
            // image="/static/images/cards/contemplative-reptile.jpg"
        />
        <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Event 3
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This is the meta data of Event 3. This will have event description.
          This is the meta data of Event 3. This will have event description.
          This is the meta data of Event 3. This will have event description.
        </Typography>
        </CardContent>
        <CardActions>
            <Button size="small">Edit Icon</Button>
        </CardActions>
        </Card>
          </Grid>
          <Grid item xs={4}>
          <Card sx={{ width: '100%' }}>
        <CardMedia
            // component="img"
            // alt="green iguana"
            // height="140"
            // image="/static/images/cards/contemplative-reptile.jpg"
        />
        <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Event 4
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This is the meta data of Event 4. This will have event description.
          This is the meta data of Event 4. This will have event description.
          This is the meta data of Event 4. This will have event description.
        </Typography>
        </CardContent>
        <CardActions>
            <Button size="small">Edit Icon</Button>
        </CardActions>
        </Card>
          </Grid>
        </Grid>
      </Box>
      <Footer></Footer>
      </div>
    )
}