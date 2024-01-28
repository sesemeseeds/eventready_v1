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
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm } from "react-hook-form";


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
  const [open, setOpen] = React.useState(false);

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

  const { register, handleSubmit, setValue, control } = useForm({});

  const onSubmit = async (data) => {
    //setEventTitle(event.name);
    //setEventCreationDate(event.description);
    handleClose();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
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
                          <Button 
                            size="small"
                            onClick={handleClickOpen}
                            cursor="pointer"
                          >
                          Edit Icon
                          </Button>
                          <Dialog open={open}>
          <DialogTitle>Edit Event Properties</DialogTitle>
          <DialogContent>
            <>
              {loading ? (
                <p>Loading data...</p>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <TextField
                    margin="dense"
                    name="EventTitle"
                    label="Event Title"
                    type="text"
                    fullWidth
                    variant="outlined"
                    defaultValue={event.name}
                    {...register("EventTitle")}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    name="EventDescription"
                    label="Event Description"
                    type="text"
                    fullWidth
                    variant="outlined"
                    defaultValue={event.description}
                    {...register("EventDescription")}
                  />
                  <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Submit</Button>
                  </DialogActions>
                </form>
              )}
            </>
          </DialogContent>
        </Dialog>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
              </Grid>
          </div>
          </Box>
        {/* <Footer></Footer> */}
      </div>
    )
}