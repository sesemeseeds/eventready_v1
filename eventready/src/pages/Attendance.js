import React, { useState } from 'react';
import { Button, TextField, Typography, Box, AppBar, Toolbar, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import QRCode from 'qrcode.react';

const AttendancePage = () => {
  const [attendanceLink, setAttendanceLink] = useState('');
  const [generatedQR, setGeneratedQR] = useState(null);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLinkChange = (event) => {
    setAttendanceLink(event.target.value);
  };

  const isValidURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

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
    }
  };

  const handleKeyPress = (event) => {
    // Trigger generateQRCode function on "Enter" key press
    if (event.key === 'Enter') {
      generateQRCode();
    }
  };

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
    <div>
      <AppBar position="static" style={{ backgroundColor: 'red', height: '80px' }}>
        <Toolbar>
          <Typography variant="h4" style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', width: '100%', marginTop: '20px' }}>
            Attendance
          </Typography>
        </Toolbar>
      </AppBar>

      <Typography variant="h6" style={{ padding: '10px', paddingTop: '10px', paddingLeft: '25px', marginBottom: '20px' }}>
        Effortlessly track attendance for your events with our dedicated Attendance Page. Simply generate QR codes for your events, providing a convenient solution to efficiently manage attendance while on the move.      </Typography>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '30vh' }}>
        <Box mt={3} style={{ width: '50%', margin: '0 auto' }}>
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
          <Box mt={2}>
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

        <Dialog open={shareDialogOpen} onClose={closeShareDialog}>
          <DialogTitle style={{ backgroundColor: 'red', color: 'white', fontWeight: 'bold', paddingRight: '24px' }}>Share Options</DialogTitle>
          <DialogContent>
            <Box display="flex" flexDirection="column">
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
            <Button onClick={closeShareDialog} style={{ backgroundColor: 'red', color: 'white' }}>OK</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={Boolean(errorMessage)} onClose={closeErrorMessage}>
          <DialogTitle style={{ backgroundColor: 'red', color: 'white', fontWeight: 'bold', paddingRight: '24px', paddingLeft: '24px' }}>Error</DialogTitle>
          <DialogContent style={{ paddingTop: '16px', paddingBottom: '16px', paddingLeft: '24px', paddingRight: '24px', }}>
            <Typography style={{ color: '#000000', marginBottom: '8px' }}>{errorMessage}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeErrorMessage} style={{ backgroundColor: 'red', color: 'white' }}>OK</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default AttendancePage;
