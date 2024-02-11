import * as React from "react";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import Card from "@mui/material/Card";
import { Menu, MenuItem } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
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
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { useForm } from "react-hook-form";
import "../styles/Landing.css";

export const LandingPage = () => {
  const [allEvents, setAllEvents] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [contextMenu, setContextMenu] = React.useState(null);
  const [deleteID, setDeleteID] = React.useState(null);

  const getAllEvents = () => {
    AxiosInstance.get(`/event`).then((res) => {
      setAllEvents(res.data);
      console.log(res.data);
      setLoading(false);
    });
  };

  React.useEffect(() => {
    getAllEvents();
  }, []);

  const handleContextMenu = (event, id) => {
    event.preventDefault();
    setDeleteID(id);
    console.log(deleteID);

    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : null
    );
  };

  const { register, handleSubmit } = useForm({});

  const onSubmit = async (data) => {
    AxiosInstance.post(`/event/`, {
      name: data.EventTitle,
      description: data.EventDescription,
    });
    // .then((res) =>{
    //   navigate(`/`)
    // })
    getAllEvents();
    handleClose();
  };

  const removeData = async () => {
    AxiosInstance.delete(`/event/${deleteID}`)
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
  };
  const handleMenuClose = () => {
    setContextMenu(null);
  };

  const handleDeleteOpen = (e) => {
    setOpenDelete(true);
  };
  const handleDeleteClose = () => {
    setOpenDelete(false);
  };

  return (
    <div>
      <Header></Header>

      <Box className="landing-container">
        <div className="event-container">
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
                    onContextMenu={(e) => handleContextMenu(e, event.id)}
                    style={{ cursor: "context-menu" }}
                  >
                    <CardActionArea
                      component={Link}
                      to={`event/${event.id}/generalinfo`}
                    >
                      <CardContent sx={{ height: "250px" }}>
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
