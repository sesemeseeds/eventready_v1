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
import ArchiveIcon from "@mui/icons-material/Archive";
import Tooltip from "@mui/material/Tooltip";
import { useUser } from "@clerk/clerk-react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

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
  const [eventTitle, setEventTitle] = React.useState("");
  const [eventDescription, setEventDescription] = React.useState("");
  const {user, isLoaded, isSignedIn} = useUser();

  const getAllEvents = () => {
    // console.log('User:',user.id);
    AxiosInstance.get(`/event/`).then((res) => {
      if (display.display === "ActiveEvents") {
        const activeEvents = res.data.filter((event) => event.active && event.user_id === user.id);
        setAllEvents(activeEvents);
      }

      if (display.display === "InactiveEvents") {
        const inactiveEvents = res.data.filter((event) => !event.active && event.user_id === user.id);
        setAllEvents(inactiveEvents);
      }

      setLoading(false);
    });
  };

  React.useEffect(() => {
    if (isSignedIn && isLoaded) {
      getAllEvents();
    }
    else{
      console.log('User is not loaded or not authenticated');
    }
  },[ user, isSignedIn, isLoaded, open, display]);

  const onSubmit = async () => {
    try {
      await AxiosInstance.post(`/event/`, {
        name: eventTitle,
        description: eventDescription,
        user_id: user.id,
      });

      handleClose();
      getAllEvents();
      setError(false);
      setEventTitle("");
      setEventDescription("");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(
          "Event name not valid. Please choose a different name."
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

  const handleMenuClose = () => {
    setContextMenu(null);
  };

  const handleClose = () => {
    setOpen(false);
    setErrorMessage("");
    setError(false);
    setEventTitle("");
    setEventDescription("");
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

  const handleArchiveButtonClick = (event, id, name) => {
    handleArchive(id, name);
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
              {display.display === "ActiveEvents"
                ? "Events"
                : "Archived Events"}
            </Typography>
            <Button sx={{backgroundImage: "linear-gradient(15deg, #80d0c7 0%,  #13547a 0%)"}}
              size="medium"
              variant="contained"
              onClick={handleClickOpen}
              cursor="pointer"
              startIcon={<AddIcon />}
              
            >
              Add Event
            </Button>
          </Box>

          {/* <hr style={{ marginBottom: "25px" }}></hr> */}

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
                        to={`event/${event.id}/info`}
                        reloadDocument
                      >
                        <CardContent sx={{ height: "225px" }}>
                          <Typography gutterBottom variant="h5" component="div">
                            {event.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ height: "150px", overflowY: "auto" }}
                            dangerouslySetInnerHTML={{
                              __html: event.description,
                            }}
                          ></Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions sx={{ backgroundImage: "linear-gradient(15deg, #80d0c7 0%,  #13547a 0%)" }}>
                      <Tooltip title="Delete">
                        <div>
                          <Button
                            sx={{ float: "right" }}
                            size="medium"
                            onClick={(e) => handleDeleteOpen(e, event.id)}
                            cursor="pointer"
                            startIcon={<DeleteIcon style={{ color: "white" }} />}
                          ></Button>
                        </div>
                      </Tooltip>
                      <Tooltip
                        title={
                          display.display === "ActiveEvents" ? "Archive" : "Unarchive"
                        }
                      >
                        <div>
                          <Button
                            sx={{ float: "right" }}
                            size="medium"
                            onClick={(e) =>
                              handleArchiveButtonClick(e, event.id, event.name)
                            }
                            cursor="pointer"
                            startIcon={<ArchiveIcon style={{ color: "white" }} />}
                          ></Button>
                        </div>
                      </Tooltip>
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
          <DialogContent sx={{ height: 325 }}>
            <TextField
              margin="dense"
              name="EventTitle"
              label="Event Title"
              type="text"
              required={true}
              fullWidth
              variant="outlined"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              error={error}
              helperText={errorMessage}
            />
            <div style={{height: '175px'}}>
              <CKEditor
                editor={ClassicEditor}
                data={eventDescription}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setEventDescription(data);
                }}
                config={{
                  extraPlugins: [function CustomHeightPlugin(editor) {
                    editor.on('ready', () => {
                      editor.ui.view.editable.element.style.height = '100%';
                    });
                  }],
                }}
              />
            </div>
          </DialogContent>
          <DialogActions >
            <Button  onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={onSubmit}>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={openDelete}>
          <DialogTitle>Delete Event</DialogTitle>
          <DialogContent>
            <>
              <Typography marginTop="15px">
                Are you sure you want to delete? You will not be able to undo
                this action and all your data will be lost.
              </Typography>
            </>
          </DialogContent>
          <DialogActions >
            <Button
             
              onClick={handleDeleteClose}
            >
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={removeData}>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
      <Footer></Footer>
    </div>
  );
};
