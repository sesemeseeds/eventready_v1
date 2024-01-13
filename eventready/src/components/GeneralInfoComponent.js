import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";

export default function GeneralInfoComponent() {

  const [open, setOpen] = React.useState(false);



  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div>
      <div style={{ width: "50%", float: "left" }}>
        <h1>Event Title</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
      <div style={{ width: "50%", float: "left" }}>
        <Button variant="contained" onClick={handleClickOpen}>
          {" "}
          Edit{" "}
        </Button>
        <h1> Side section</h1>
        <div> Date of the Event</div>
        <div> Time of the event </div>
        <div> Days until the event </div>
        <br></br>

        <div>Location</div>
        <div>Address</div>
      </div>

      <React.Fragment>
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: "form",
            onSubmit: (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              const EventTitle = formJson.EventTitle;
              const EventDate = formJson.EventDate;
              const EventTime = formJson.EventTime;
              const EventLocation = formJson.EventLocation;
              const EventAddress = formJson.EventAddress;
              const EventDescription = formJson.EventDescription;

           
              console.log(formJson)
              handleClose();


            //   axios.post(API_URL, this.state).then(() => {
            //     this.props.resetState();
            //     this.props.toggle();
            //   });

            },
          }}
        >
          <DialogTitle>Edit Event Properties</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="EventTitle"
              name="EventTitle"
              label="Event Title"
              type="text"
              fullWidth
              variant="outlined"
            />
                 <TextField
              autoFocus
              required
              margin="dense"
              id="EventDate"
              name="EventDate"
              label="Event Date"
              InputLabelProps={{ shrink: true, required: false }}
              type="Date"
              fullWidth
              variant="outlined"
            />
                 <TextField
              autoFocus
              required
              margin="dense"
              id="EventTime"
              name="EventTime"
              label="Event Time"
              type="text"
              fullWidth
              variant="outlined"
            />
                 <TextField
              autoFocus
              required
              margin="dense"
              id="EventLocation"
              name="EventLocation"
              label="Event Location"
              type="text"
              fullWidth
              variant="outlined"
            />
                 <TextField
              autoFocus
              required
              margin="dense"
              id="EventAddress"
              name="EventAddress"
              label="Event Address"
              type="text"
              fullWidth
              variant="outlined"
            />
                 <TextField
              autoFocus
              required
              margin="dense"
              id="EventDescription"
              name="EventDescription"
              label="Event Description"
              type="text"
              fullWidth
              variant="outlined"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Subscribe</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </div>
  );
}
