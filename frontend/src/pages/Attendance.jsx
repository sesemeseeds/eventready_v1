import React, { useState } from 'react';
import {Button,TextField,Typography,Box,AppBar,Toolbar,Dialog,DialogTitle,DialogContent,DialogActions,} from '@mui/material';
import QRCode from 'qrcode.react';
import "../styles/Attendance.css";

const AttendancePage = () => {
  const [attendanceLink, setAttendanceLink] = useState('');
  const [generatedQR, setGeneratedQR] = useState(null);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLinkChange = (event) => {
    setAttendanceLink(event.target.value);};

  const isValidURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }};

  const generateQRCode = () => {
    // Generate QR code logic
    if (!attendanceLink) {
      setGeneratedQR(null);
      setErrorMessage('Link cannot be empty. Please enter a valid URL.');
    } else if (isValidURL(attendanceLink)) {
      setGeneratedQR(<QRCode value={attendanceLink} size={280} />);
      setErrorMessage('');
    } else {
      setGeneratedQR(null);
      setErrorMessage('Oops! Looks like an Invalid link. Please enter a valid URL.');
    }};

  const handleKeyPress = (event) => {
    // Trigger generateQRCode function on "Enter" key press
    if (event.key === 'Enter') {
      generateQRCode();
    }};

  const downloadQRCode = () => {
    // Download QR code logic
    if (isValidURL(attendanceLink)) {
      const canvas = document.querySelector('canvas');
      const imageURL = canvas.toDataURL('image/png');

      // Open the image in a new tab
      const newTab = window.open();

      // Write HTML to the new tab with styles for centering
      newTab.document.write(`
        <html>
          <head>
            <style>
              body {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100vh;
                margin: 0;
              }
              img {
                max-width: 100%;
                max-height: 100%;
              }
            </style>
          </head>
          <body>
            <img src="${imageURL}" alt="QR Code" />
          </body>
        </html>
      `);

      // Download the image
      const downloadLink = document.createElement('a');
      downloadLink.href = imageURL;
      downloadLink.download = 'qrcode.png';
      downloadLink.click();

      setErrorMessage('');
    } else {
      setErrorMessage('Invalid link. Please enter a valid URL.');
    }
  };
  const openFacebook = () => {
    window.open('https://www.facebook.com/');
  };
  const openInstagram = () => {
    window.open('https://www.instagram.com/');
  };
  const openOutlook = () => {
    window.open('https://outlook.live.com/');
  };
  const openShareDialog = () => {
    setShareDialogOpen(true);
  };
  const closeShareDialog = () => {
    setShareDialogOpen(false);
  };
  const closeErrorMessage = () => {
    setErrorMessage('');
  };

  return (
    <div className='container'>
      

      {/* Organizer's Guide Section */}
      

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', marginBottom: '30px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '50%' }}>
          <Box mt={3}>
            <TextField
              label="Attendance Form Link"
              variant="outlined"
              fullWidth
              value={attendanceLink}
              onChange={handleLinkChange}
              onKeyPress={handleKeyPress}
            />
          </Box>

          <Box mt={2}>
            <Button variant="contained" color="primary" style={{ backgroundColor: 'red' }} onClick={generateQRCode}>
              Generate QR Code
            </Button>
          </Box>

          {generatedQR && (
            <Box mt={2} style={{ height: '280px', overflow: 'hidden' }}>
              {generatedQR}
            </Box>
          )}

          {generatedQR && (
            <Box mt={2}>
              <Button variant="contained" color="primary" style={{ backgroundColor: 'red' }} onClick={downloadQRCode}>
                Download QR Code
              </Button>
              <Button variant="contained" color="primary" style={{ marginLeft: '10px', backgroundColor: 'red' }} onClick={openShareDialog}>
                Share QR Code
              </Button>
            </Box>
          )}
        </div>

        <Box style={{ marginLeft: '70px', height: '400px', position: 'relative' }}>
          <Typography variant="h6" style={{ marginBottom: '10px' }}>
            Attendance List
            <Button variant="outlined" style={{ marginLeft: '10px' }}>
              Filter
            </Button>
          </Typography>

          {/* Your live updating table goes here */}
          {/* Example: */}
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {/* Map through your attendees and render rows */}
            </tbody>
          </table>
        </Box>
      </div>


      {/* Components/dialogs*/}

      <Dialog open={shareDialogOpen} onClose={closeShareDialog}>
      <DialogTitle style={{ backgroundColor: 'red', color: 'white', fontWeight: 'bold' }}>
        Share Options
        </DialogTitle>
        <DialogContent>
        <Box display="flex" flexDirection="column" style={{ marginTop: '20px' }}>
              <Button variant="contained" color="primary" style={{ marginTop: '10px', backgroundColor: '#4267B2' }} onClick={openFacebook}>
                Facebook
              </Button>
              <Button variant="contained" color="primary" style={{ marginTop: '10px', backgroundColor: '#E1306C' }} onClick={openInstagram}>
                Instagram
              </Button>
              <Button variant="contained" color="primary" style={{ marginTop: '10px', backgroundColor: '#1490DF' }} onClick={openOutlook}>
                Outlook
              </Button>
        </Box>
        </DialogContent>
          <DialogActions>
            <Button style={{ backgroundColor: 'white', color: 'black' }} onClick={closeShareDialog}>
              Close
            </Button>
          </DialogActions>
      </Dialog>



        <Dialog open={Boolean(errorMessage)} onClose={closeErrorMessage}>
          <DialogTitle style={{ backgroundColor: 'red', color: 'white', fontWeight: 'bold' }}>
            Error
            </DialogTitle>
            <DialogContent style={{ marginTop: '10px' }}>
              <Typography>{errorMessage}</Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={closeErrorMessage} style={{ backgroundColor: 'white', color: 'black'}}>
                  Close
                </Button>
              </DialogActions>
          </Dialog>

    </div>
  );
};

export default AttendancePage;
