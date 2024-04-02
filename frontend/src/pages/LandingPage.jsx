import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { Box, Grid, Card, CardActionArea, CardContent, CardActions, Button, Typography, Menu, MenuItem, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Footer from "../components/Footer";
import Header from "../components/Header";
import AxiosInstance from "../components/Axios";
import "../styles/Landing.css";
import fetchClerkToken from "../components/ClerkToken"; // Import the custom hook

export const LandingPage = () => {
  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteID, setDeleteID] = useState(null);
  const { user } = useUser();

  console.log("User authenticated:", user, "User ID:", user?.id);

  const getAllEvents = async () => {
    try {
      setLoading(true);
      if (user) {
        const token = await fetchClerkToken(); // Fetch the Clerk JWT token
        AxiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Set the Authorization header
        const response = await AxiosInstance.get(`/event/user/${user.id}/`);
        setAllEvents(response.data);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
            setLoading(false);
          }
        };

        useEffect(() => {
          getAllEvents();
        }, [user]);

        const onSubmit = async (data) => {
          try {
            setLoading(true);
            if (!user) {
              throw new Error("User not authenticated");
            }

            const token = await fetchClerkToken(); // Fetch the Clerk JWT token
            AxiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Set the Authorization header
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
            setLoading(true);
            if (!user) {
              throw new Error("User not authenticated");
            }
            const token = await fetchClerkToken(); // Fetch the Clerk JWT token
            AxiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Set the Authorization header
            await AxiosInstance.delete(`/event/${deleteID}/`);
            const del = allEvents.filter((event) => event.id !== deleteID);
            setAllEvents(del);
            setOpenDelete(false);
          } catch (error) {
            console.error("Error deleting event:", error);
          } finally {
            setLoading(false);
          }
        };

        const handleClickOpen = () => {
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
                      <form>
                        <TextField
                          margin="dense"
                          name="EventTitle"
                          label="Event Title"
                          type="text"
                          fullWidth
                          variant="outlined"
                        />
                        <TextField
                          autoFocus
                          margin="dense"
                          name="EventDescription"
                          label="Event Description"
                          type="text"
                          fullWidth
                          variant="outlined"
                        />
                        <DialogActions>
                          <Button onClick={handleClose}>Cancel</Button>
                          <Button onClick={onSubmit}>Submit</Button>
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
