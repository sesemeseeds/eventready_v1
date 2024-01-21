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
import AxiosInstance from '../components/Axios'

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

  const [allEvents, setAllEvents] = React.useState([]);
  const [loading, setLoading] = React.useState(true)

  const getAllEvents = () => {
    AxiosInstance.get(`/event`).then((res) =>{
      setAllEvents(res.data)
      console.log(res.data)
      setLoading(false)
    })
  }

  React.useEffect(() => {
    getAllEvents();
  }, []);

    return (
        //<h1>Landing Page</h1>
      <div>
        <Header></Header>
          <Box sx={{ width: '50%' }}>
          <div>
              <Grid container 
                direction="row"
                justifyContent="center"
                alignItems="stretch"
                rowSpacing={4} 
                columnSpacing={{ xs: 1, sm: 2 , md:3}}>
                   {allEvents && allEvents.map((event) => (
                    <Grid item xs={4} key={event.id}>
                      <Card sx={{ width: '100%' }}>
                        <CardMedia/>
                        <CardContent sx={{ height: '150px' }}>
                          <Typography gutterBottom variant="h5" component="div">
                            {event.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ maxHeight: '100px', overflow: 'hidden'}}>
                            {event.description}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button size="small">Edit Icon</Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
              </Grid>
          </div>
          </Box>
        <Footer></Footer>
      </div>
    )
}