import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { Box } from "@mui/material";
import { useForm } from "react-hook-form";

export default function GeneralInfoComponent() {
  const [open, setOpen] = React.useState(false);
  const [EventTitle, setEventTitle] = React.useState(String);
  const [EventDate, setEventDate] = React.useState(String);
  const [EventTime, setEventTime] = React.useState(String);
  const [EventLocation, setEventLocation] = React.useState(String);
  const [EventAddress, setEventAddress] = React.useState(String);
  const [EventDescription, setEventDescription] = React.useState(String);
  const [loading, setLoading] = React.useState(true);

  const GetData = () => {
    //this is where the GET request will go

    // Example

    // AxiosInstance.get(`project/${MyId}`).then((res) =>{
    //   console.log(res.data)
    //   setValue('name',res.data.name)
    //   setValue('status',res.data.status)
    //   setValue('projectmanager',res.data.projectmanager)
    //   setValue('comments',res.data.comments)
    //   setValue('start_date',Dayjs(res.data.start_date))
    //   setValue('end_date',Dayjs(res.data.end_date))
    //   setLoading(false)
    // })

    const today = new Date()
    setEventTitle("Tests");
    setEventDate("Hardcoded Event Date");
    setEventTime("Hardcoded Event Time");
    setEventLocation("Hardcoded Event Location");
    setEventAddress("Hardcoded Event Address");
    setEventDescription(
      "This is a test description I will make it kinda long hahahahahahahahhahahahahahahahahhaha"
    );
    setLoading(false);
  };

  React.useEffect(() => {
    GetData();
  }, []);

  const { register, handleSubmit, setValue, control } = useForm({
   
  });

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
    setEventTime(data.EventTime);
    setEventLocation(data.EventLocation);
    setEventAddress(data.EventAddress);
    setEventDescription(data.EventDescription);
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
      <div style={{ width: "50%", float: "left" }}>
        <h1>{EventTitle} </h1>
        <p>{EventDescription}</p>
      </div>
      <div style={{ width: "50%", float: "left" }}>
        <Button variant="contained" onClick={handleClickOpen}>
          {" "}
          Edit{" "}
        </Button>
        <h1> Side section</h1>
        <div> {EventDate} </div>
        <div> {EventTime} </div>
        <div> Days until the event </div>
        <br></br>

        <div>{EventLocation}</div>
        <div>{EventAddress}</div>
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
                  name="EventTime"
                  label="Event Time"
                  type="text"
                  fullWidth
                  variant="outlined"
                  defaultValue={EventTime}
                  {...register("EventTime")}
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
                  name="EventAddress"
                  label="Event Address"
                  type="text"
                  fullWidth
                  variant="outlined"
                  defaultValue={EventAddress}
                  {...register("EventAddress")}
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

                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button type="submit">Submit</Button>
                </DialogActions>
              </form>
            )}
          </>
        </DialogContent>
      </Dialog>
    </div>
  );
}
