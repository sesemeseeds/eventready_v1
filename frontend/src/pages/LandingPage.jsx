import React, { useState, useEffect } from "react";
import { BrowserRouter, Link, Route, Routes, useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { useForm } from "react-hook-form";
import { Box, Grid, Card, CardActionArea, CardContent, CardActions, Button, Typography, Menu,
  MenuItem, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Footer from "../components/Footer";
import Header from "../components/Header";
import AxiosInstance from "../components/Axios";
import "../styles/Landing.css";


export const LandingPage = () => {
  const [allEvents, setAllEvents] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [contextMenu, setContextMenu] = React.useState(null);
  const [deleteID, setDeleteID] = React.useState(null);
  const { user } = useUser();

  console.log("User authenticated:", user, "User ID:", user?.id);

  const getAllEvents = async () => {
    try {
      setLoading(true);
      if (user) {
        const response = await AxiosInstance.get(`/event/user/${user.id}/`);
        setAllEvents(response.data);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getAllEvents();
  }, [user]);

  const { register, handleSubmit } = useForm({});

  const onSubmit = async (data) => {
    try {
      if (!user) {
        throw new Error("User not authenticated");
      }

      setLoading(true);
      await AxiosInstance.post(`/event/`, {
        name: data.EventTitle,
        description: data.EventDescription,
        user: user.id,
      });
      await getAllEvents();
      handleClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeData = async () => {
    try {
      if (!user) {
        throw new Error("User not authenticated");
      }
      await AxiosInstance.delete(`/event/${deleteID}/`);
      const del = allEvents.filter((event) => event.id !== deleteID);
      setAllEvents(del);
      setOpenDelete(false);
      setContextMenu(null);
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleMenuClose = () => {
    setContextMenu(null);
  };

  const handleDeleteOpen = (event, id) => {
    setOpenDelete(true);
    event.preventDefault();
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
                  <Card
                    className="event-card"
                    style={{ cursor: "context-menu" }}
                  >
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
                      <CardActions sx={{ display: "contents" }}>
                        <Button
                          sx={{ float: "right" }}
                          size="medium"
                          onClick={(e) => handleDeleteOpen(e, event.id)}
                          cursor="pointer"
                          startIcon={<DeleteIcon />}
                        ></Button>
                      </CardActions>
                    )}
                  </Card>
                  <Menu
                    open={contextMenu !== null}
                    onClose={handleMenuClose}
                    anchorReference="anchorPosition"
                    anchorPosition={
                      contextMenu !== null
                        ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                        : undefined
                    }
                  >
                    <MenuItem onClick={handleDeleteOpen}>Delete</MenuItem>
                  </Menu>
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