import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import * as React from "react";
import DialogActions from '@mui/material/DialogActions';
import TextField from "@material-ui/core/TextField";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
// import { TimePicker } from '@mui/x-date-pickers/TimePicker';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export default function GeneralInfoComponent() {
  const [openDialog, handleDisplay] = React.useState(false);

  const handleClose = () => {
    handleDisplay(false);
  };

  const openDialogBox = () => {
    handleDisplay(true);
  };

  const handleSubmit = () => {
    // Add your form submission logic here
    // e.g., make an API request, update state, etc.
    handleClose();
    console.log()
  };

  const dialogStyle = {
    padding: "20px",
  };
  const buttonStyle = {
    width: "10rem",
    fontsize: "1.5rem",
    height: "2rem",
    padding: "5px",
    borderRadius: "10px",
    backgroundColor: "green",
    color: "White",
    border: "2px solid yellow",
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
        <Button variant="contained" onClick={openDialogBox}>
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

      <>
        <Dialog onClose={handleClose} open={openDialog}>
          <DialogTitle> Edit Event Properties </DialogTitle>
          
          <h3 style={dialogStyle}>
          <DialogContent>
      
          <TextField
            autoFocus
            style={{float: 'left'}}
            margin="dense"
            id="EventTitle"
            label="Event Title"
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="EventDate"
            label="Date"
            InputLabelProps={{ shrink: true, required: false }}
            type="Date"
            fullWidth
          />
             <TextField
            autoFocus
            margin="dense"
            id="EventLocation"
            label="Location"
            InputLabelProps={{ shrink: true, required: false }}
            type="text"
            fullWidth
          />
             <TextField
            autoFocus
            
            margin="dense"
            id="EventAddress"
            label="Address"
            InputLabelProps={{ shrink: true, required: false }}
            type="text"
            width={{'50%'}}
          />
        </DialogContent>
          </h3>

          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </>
    </div>
  );
}
