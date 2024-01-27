import React, { useState } from 'react';
import { Button, TextField, Typography, Box, AppBar, Toolbar, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import QRCode from 'qrcode.react';

const AttendancePage = () => {
  const [attendanceLink, setAttendanceLink] = useState('');
  const [generatedQR, setGeneratedQR] = useState(null);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);

  const handleLinkChange = (event) => {
    setAttendanceLink(event.target.value);
  };

  const generateQRCode = () => {
    // Generate QR code logic
    if (attendanceLink) {
      setGeneratedQR(<QRCode value={attendanceLink} />);
    } else {
      setGeneratedQR(null);
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
    const canvas = document.querySelector('canvas'); // Assuming the QRCode is rendered as a canvas
    const imageURL = canvas.toDataURL('image/png');
    const downloadLink = document.createElement('a');
    downloadLink.href = imageURL;
    downloadLink.download = 'qrcode.png';
    downloadLink.click();
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

  return (
    <div>
      <AppBar position="static" style={{ backgroundColor: 'red' }}>
        <Toolbar>
          <Typography variant="h6" style={{ color: 'white', fontWeight: 'bold' }}>
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
      </div>
    </div>
  );
};

export default AttendancePage;