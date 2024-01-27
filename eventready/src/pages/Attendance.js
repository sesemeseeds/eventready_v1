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
      setGeneratedQR(<QRCode value={attendanceLink} size={332} />);
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
      <AppBar position="static" style={{ backgroundColor: 'red' }}>
        <Toolbar>
          <Typography variant="h5" style={{ color: 'white', fontWeight: 'bold' }}>
            Attendance
          </Typography>
        </Toolbar>
      </AppBar>

      <Typography variant="subtitle1" style={{ padding: '10px', paddingTop: '10px', paddingLeft: '25px' }}>
        This page facilitates attendance tracking for event organizers. Generate QR codes for your events and easily manage attendance on the go.
      </Typography>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
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
          <DialogTitle>Share Options</DialogTitle>
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
            <Button onClick={closeShareDialog}>Close</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={Boolean(errorMessage)} onClose={closeErrorMessage}>
          <DialogTitle style={{ backgroundColor: 'red', color: 'white', fontWeight: 'bold', paddingRight: '24px', paddingLeft: '24px' }}>Error</DialogTitle>
          <DialogContent style={{ paddingTop: '16px', paddingBottom: '16px', paddingLeft: '24px', paddingRight: '24px',}}>
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
