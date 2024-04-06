import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { Box, Grid, Card, CardActionArea, CardContent, CardActions, Button, Typography, Menu, MenuItem, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Footer from "../components/Footer";
import Header from "../components/Header";
import AxiosInstance from "../components/Axios";
import { useForm } from "react-hook-form";
import "../styles/Landing.css";

export const LandingPage = () => {
  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteID, setDeleteID] = useState(null);
  const {user, isLoaded, isSignedIn} = useUser();
  
  console.log('User - Loaded:', isLoaded);
  const UserID = user.id;

  useEffect(() => {
    console.log('User - Loaded:', isLoaded);
    console.log('User - Sign In:', isSignedIn);
    console.log('User - in Use Effect:', user);
    if (isSignedIn && isLoaded) {
      getAllEvents();
    }
    else{
      console.log('User is not loaded or not authenticated');
    }
  },[user, isLoaded, isSignedIn]);


  const getAllEvents = async () => {
    try {
      setLoading(true);
      const response = await AxiosInstance.get(`/event/`);
      console.log('Response:', response.data);
      //console.log('Response:', response.data[1].user_id);
      const userEvents = response.data.filter(event => event.user_id === user.id);
      console.log('User events:', userEvents);
      //console.log('User ID:', user.id);
      //console.log('User Events:', userEvents);
      // setAllEvents(response.data);
      setAllEvents(userEvents);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching events:", error);
      setLoading(false);
    }
  };
  
  React.useEffect(() => {
    getAllEvents();
  }, []);

  const { register, handleSubmit } = useForm({});
  
  const onSubmit = async (data,user) => {
    try {
      setLoading(true);
      console.log('User ID - on submit:', user.id);
      console.log('Is loaded - on submit:', user.isLoaded);
      await AxiosInstance.post(`/event/`, {
        name: data.EventTitle,
        description: data.EventDescription,
        user_id: UserID
      });
      await getAllEvents(); // Wait for events to be fetched after creation
      handleClose();
    } catch (error) {
      console.error("Error creating event:", error);
    } finally {
      setLoading(false);
    }
  };

const removeData = async () => {
  try {
    setLoading(true);
    if (!user) {
      throw new Error("User not authenticated");
    }
    await AxiosInstance.delete(`/event/${deleteID}/`);
    const updatedEvents = allEvents.filter((event) => event.id !== deleteID);
    setAllEvents(updatedEvents);
    setOpenDelete(false);
  } catch (error) {
    console.error("Error deleting event:", error);
  } finally {
    setLoading(false);
  }
};

  const handleClickOpen = () => {
    setLoading(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteOpen = (id) => {
    setOpenDelete(true);
    setDeleteID(id);
  };

  const handleDeleteClose = () => {
    setOpenDelete(false);
  };

  return (
    <div>
      <Header></Header>

      <Box className="landing-container">
        <div className="event-container">
          {user && (
            <Button
              sx={{ float: "right" }}
              size="medium"
              variant="outlined"
              onClick={handleClickOpen}
              cursor="pointer"
              startIcon={<AddIcon />}
            >
              Add
            </Button>
          )}
          <Grid
            container
            direction="row"
            alignItems=""
            rowSpacing={4}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {allEvents &&
              allEvents.map((event) => (
                <Grid item xs={4} key={event.id} id={event}>
                  <Card className="event-card">
                    <CardActionArea
                      component={Link}
                      to={`event/${event.id}/generalinfo`}
                      reloadDocument
                    >
                      <CardContent sx={{ height: "175px" }}>
                        <Typography gutterBottom variant="h5" component="div">
                          {event.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ maxHeight: "100px", overflow: "hidden" }}
                        >
                          {event.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    {user && (
                      <CardActions>
                        <Button
                          sx={{ float: "right" }}
                          size="medium"
                          onClick={() => handleDeleteOpen(event.id)}
                          cursor="pointer"
                          startIcon={<DeleteIcon />}
                        >
                          Delete
                        </Button>
                      </CardActions>
                    )}
                  </Card>
                </Grid>
              ))}
          </Grid>
        </div>

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
        <Dialog open={openDelete}>
          <DialogTitle>Delete Event</DialogTitle>
          <DialogContent>
            <>
              <Typography>
                Are you sure you want to delete? You will not be able to undo
                this action and all your data will be lost.
              </Typography>

              <DialogActions>
                <Button onClick={handleDeleteClose}>Cancel</Button>
                <Button onClick={removeData}>Yes</Button>
              </DialogActions>
            </>
          </DialogContent>
        </Dialog>
      </Box>
      <Footer></Footer>
    </div>
  );
};
