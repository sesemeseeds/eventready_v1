import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { Box, Container } from "@mui/material";
import { useForm } from "react-hook-form";
import Footer  from "../components/Footer"
import Header from "../components/Header"
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AxiosInstance from '../components/Axios'

export default function GeneralInfoComponent() {
  const [open, setOpen] = React.useState(false);
  const [EventTitle, setEventTitle] = React.useState(String);
  const [EventDate, setEventDate] = React.useState(String);
  const [EventStartTime, setEventStartTime] = React.useState(String);
  const [EventEndTime, setEventEndTime] = React.useState(String);
  const [EventLocation, setEventLocation] = React.useState(String);
  const [EventDescription, setEventDescription] = React.useState(String);
  const [EventCreationDate, setEventCreationDate] = React.useState(String);
  const [EventActive, setEventActive] = React.useState(String);
  const [loading, setLoading] = React.useState(true);

  const GetData = () => {
    //this is where the GET request will go

    // Example
    // TODO: hardcoded as 1
    // AxiosInstance.get(`event/${MyId}`).then((res) =>{
    AxiosInstance.get(`event/1`).then((res) =>{
      console.log(res.data)
      setEventTitle(res.data.name)
      setEventDate(res.data.date)
      setEventStartTime(res.data.start_time)
      setEventEndTime(res.data.end_time)
      setEventLocation(res.data.location)
      setEventDescription(res.data.description)
      setEventCreationDate(res.data.created)
      setEventActive(res.data.active)
      setLoading(false)
    })

    const today = new Date();
    setEventTitle("Tests");
    setEventDate("Hardcoded Event Date");
    setEventStartTime ("Hardcoded Event Start Time");
    setEventEndTime ("Hardcoded Event End Time");
    setEventLocation("Hardcoded Event Location");
    setEventDescription(
      "Lorem ipsum dolor sit amet. Sed labore omnis et praesentium autem in amet autem eos doloribus voluptate ea architecto nulla? Vel internos quas At minima repellendus et itaque dolores. Ut expedita nihil non blanditiis asperiores eos eligendi explicabo? Sed explicabo veniam qui odio recusandae ut placeat praesentium id galisum doloribus. Et delectus assumenda ad voluptatem reiciendis sit provident nisi et nemo repellat et architecto delectus et voluptas perferendis sit adipisci enim"
    );
    setEventCreationDate("Hardcoded Event Creation Date")
    setEventActive("Hardcoded Event Active")
    setLoading(false);
  };

  React.useEffect(() => {
    GetData();
  }, []);

  const { register, handleSubmit, setValue, control } = useForm({});

  const onSubmit = async (data) => {
    //this is where the PUT request will g

    // Example

    // AxiosInstance.put( `project/${MyId}/`,{
    //   name: data.name,
    //   projectmanager: data.projectmanager,
    //   status: data.status,
    //   comments: data.comments,
    //   start_date: StartDate,
    //   end_date: EndDate,
    // })

    setEventTitle(data.EventTitle);
    setEventDate(data.EventDate);
    setEventStartTime(data.EventTime);
    setEventEndTime(data.EventTime);
    setEventLocation(data.EventLocation);
    setEventDescription(data.EventDescription);
    setEventCreationDate(data.EventDescription);
    setEventActive(data.EventDescription);
    console.log(data);
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
 
      <Box style={{ padding: "2%" }}>

        <div>
          {" "}
          <Box
            style={{
              height: "50vh",
              width: "65%",
              float: "left",
              marginRight: "5%",
            }}
          >
            <h1>{EventTitle} </h1>
            <hr></hr>
            <p>{EventDescription}</p>
            <hr></hr>
          </Box>
          <Box style={{ width: "30%", float: "left" }}>
            <EditOutlinedIcon
              style={{ float: "right" }}
              variant="contained"
              onClick={handleClickOpen}
              fontSize="large"
              cursor="pointer"
            >
              Edit
            </EditOutlinedIcon>
            <h1> Side section</h1>
            <div> {EventDate} </div>
            <div> {EventStartTime} </div>
            <div> {EventEndTime} </div>
            <div> Days until the event </div>
            <hr></hr>
            <div>{EventLocation}</div>
          
          </Box>
        </div>
        <Box style={{float: "left", width: "100%"}}>
          <hr></hr>
            <h1>Cards</h1>
          </Box>

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
                    defaultValue={EventTitle}
                    {...register("EventTitle")}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    name="EventDate"
                    label="Event Date"
                    InputLabelProps={{ shrink: true, required: false }}
                    type="Date"
                    fullWidth
                    variant="outlined"
                    defaultValue={EventDate}
                    {...register("EventDate")}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    name="Event Start Time"
                    label="Event Start Time"
                    type="text"
                    fullWidth
                    variant="outlined"
                    defaultValue={EventStartTime}
                    {...register("EventStartTime")}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    name="Event End Time"
                    label="Event End Time"
                    type="text"
                    fullWidth
                    variant="outlined"
                    defaultValue={EventEndTime}
                    {...register("EventEndTime")}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    name="EventLocation"
                    label="Event Location"
                    type="text"
                    fullWidth
                    variant="outlined"
                    defaultValue={EventLocation}
                    {...register("EventLocation")}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    name="EventDescription"
                    label="Event Description"
                    type="text"
                    fullWidth
                    variant="outlined"
                    defaultValue={EventDescription}
                    {...register("EventDescription")}
                  />
                  //TODO: change event activity?

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
    </div>
  );
}
