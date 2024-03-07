import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
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
import DialogTitle from "@mui/material/DialogTitle";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(12),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

//   <Grid container
//   direction="row"
//   justifyContent="center"
//   alignItems="stretch">

export const LandingPage = () => {
  const [allEvents, setAllEvents] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [EventDescription, setEventDescription] = React.useState(String);
  const [EventTitle, setEventTitle] = React.useState(String);

  const getAllEvents = () => {
    AxiosInstance.get(`/event`).then((res) => {
      setAllEvents(res.data);
      // setEventTitle(res.data.name)
      // setEventDescription(res.data.description)
      console.log(res.data);
      setLoading(false);
    });
  };

  React.useEffect(() => {
    getAllEvents();
  }, []);

  const { register, handleSubmit, setValue, control } = useForm({});

  const onSubmit = async (data) => {
    AxiosInstance.post( `/event/`,{
      name: data.EventTitle,
      description: data.EventDescription,

    })
    // .then((res) =>{
    //   navigate(`/`)
    // })
    getAllEvents();
    handleClose();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Header></Header>
      <Box sx={{ width: "50%" }}>
        <div>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            rowSpacing={4}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {allEvents &&
              allEvents.map((event) => (
                <Grid item xs={4} key={event.id}>
                  <Card sx={{ width: "100%" }}>
                    <CardActionArea component={Link} to={`event/${event.id}/generalinfo`}>
                      <CardMedia />
                      {/* Dialog Box */}
                      {/* TODO: Fix to get each event in the TextField */}

                      <CardContent sx={{ height: "150px" }}>
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
                </Grid>
              ))}
          </Grid>
        </div>

        <Button size="small" onClick={handleClickOpen} cursor="pointer">
          Add Event Icon
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
      </Box>
      <Footer></Footer>
    </div>
  );
};
