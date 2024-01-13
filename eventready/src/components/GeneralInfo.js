import Button from '@mui/material/Button';
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import * as React from "react";
export default function GeneralInfoComponent() {



   const [openDialog, handleDisplay] = React.useState(false);

   const handleClose = () => {
      handleDisplay(false);
   };

   const openDialogBox = () => {
      handleDisplay(true);
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
            <div style={{width: '50%', float:"left"}}>
                <h1>Event Title</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
            <div style={{width: '50%', float: "left"}}>
            <Button variant="contained" onClick={openDialogBox}> Edit </Button>
                <h1>  Side section</h1>
                <div> Date of the Event</div>
                <div> Time of the event </div>
                <div> Days until the event </div>
                <br></br>

                <div>Location</div>
                <div>Address</div>

            </div>
        
            <>
      
         <Dialog onClose = {handleClose} open = {openDialog}>
            <DialogTitle> Edit Event Properties </DialogTitle>
            <form>
                
            </form>
            <h3 style = {dialogStyle}>
               Click outside of the dialog to close the Dialog box.
            </h3>
         </Dialog>
      </>
      </div>



    )

}