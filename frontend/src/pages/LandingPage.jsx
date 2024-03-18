import * as React from "react";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import Card from "@mui/material/Card";
import { Menu, MenuItem } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Footer from "../components/Footer";
import Header from "../components/Header";
import AxiosInstance from "../components/Axios";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import AddIcon from "@mui/icons-material/Add";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import ArchiveIcon from '@mui/icons-material/Archive';
import Tooltip from '@mui/material/Tooltip';
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { set, useForm } from "react-hook-form";
import "../styles/Landing.css";

export const LandingPage = (display = "ActiveEvents") => {
  const [allEvents, setAllEvents] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [contextMenu, setContextMenu] = React.useState(null);
  const [deleteID, setDeleteID] = React.useState(null);

  const [errorMessage, setErrorMessage] = React.useState();
  const [error, setError] = React.useState(false);

  const getAllEvents = () => {
    AxiosInstance.get(`/event/`).then((res) => {
      if (display.display === "ActiveEvents") {
        const activeEvents = res.data.filter((event) => event.active);
        setAllEvents(activeEvents);
      }

      if (display.display === "InactiveEvents") {
        const inactiveEvents = res.data.filter((event) => !event.active);
        setAllEvents(inactiveEvents);
      }

      setLoading(false);
    });
  };

  React.useEffect(() => {
    getAllEvents();
  }, [open, display]);

  const { register, handleSubmit, reset } = useForm({});

  const onSubmit = async (data) => {
    try {
      await AxiosInstance.post(`/event/`, {
        name: data.EventTitle,
        description: data.EventDescription,
      });

      handleClose();
      getAllEvents();
      setError(false);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(
          "Event name already exists. Please choose a different name."
        );
      } else {
        setErrorMessage("An error occurred while posting the event:");
      }
      setError(true);
    }
  };

  const removeData = async () => {
    AxiosInstance.delete(`/event/${deleteID}/`)
      .then((res) => {
        const del = allEvents.filter((allEvents) => allEvents.id !== deleteID);
        setAllEvents(del);
      })
      .catch((error) => {
        console.error(error);
      });

    setOpenDelete(false);
    setContextMenu(null);
    getAllEvents();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setErrorMessage("");
    setError(false);
    reset();
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

  const handleArchive = async (id, name) => {
    try {
      if (display.display === "ActiveEvents") {

        await AxiosInstance.patch(`/event/${id}/`, { active: false, name });
   
      } else if (display.display === "InactiveEvents") {
 
        await AxiosInstance.patch(`/event/${id}/`, { active: true, name });

      }
    } catch (error) {
      console.error("Error toggling event status:", error);
    }
    getAllEvents();
  };
  
  

  const handleArchiveButtonClick = (event, id) => {
    handleArchive(id);
  };

  return (
    <div>
      <Box className="landing-container">
        <div className="event-container">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "25px",
            }}
          >
            <Typography variant="h4">
              {" "}
              {display.display === "ActiveEvents" ? "Events" : "Archived Events"}
            </Typography>
            <Button
              size="medium"
              variant="outlined"
              onClick={handleClickOpen}
              cursor="pointer"
              startIcon={<AddIcon />}
            >
              Add
            </Button>
          </Box>

          <Grid
            container
            direction="row"
            alignItems=""
            rowSpacing={4}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {allEvents &&
              allEvents
                .slice()
                .reverse()
                .map((event) => (
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
                        <CardContent sx={{ height: "225px" }}>
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
                      <CardActions sx={{ backgroundColor: "#009CDF" }}>
                        <Tooltip title="Delete"> <Button
                          sx={{ float: "right" }}
                          size="medium"
                          onClick={(e) => handleDeleteOpen(e, event.id)}
                          cursor="pointer"
                          startIcon={<DeleteIcon  style={{ color: 'black' }} />}
                        ></Button></Tooltip>
                       <Tooltip title={display.display === "ActiveEvents" ? "Archive" : "Unarchive"}>    <Button
                          sx={{ float: "right" }}
                          size="medium"
                          onClick={(e) => handleArchiveButtonClick(e, event.id, event.name)}
                          cursor="pointer"
                          startIcon={<ArchiveIcon style={{ color: 'black' }}/>}
                        ></Button></Tooltip>
                   
                      </CardActions>
                    </Card>
                    <Menu
                      open={contextMenu !== null}
                      onClose={handleMenuClose}
                      anchorReference="anchorPosition"
                      anchorPosition={
                        contextMenu !== null
                          ? {
                              top: contextMenu.mouseY,
                              left: contextMenu.mouseX,
                            }
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
                    error={error}
                    helperText={errorMessage}
                    required={true}
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
