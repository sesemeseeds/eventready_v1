import React, { useState } from 'react';
import { Button, TextField, Typography, Box, AppBar, Toolbar, Dialog, DialogTitle, DialogContent, DialogActions, Container } from '@mui/material';
import QRCode from 'qrcode.react';

const MarketingPage = () => {
  const [reminders, setReminders] = useState([]);
  const [reminderName, setReminderName] = useState('');
  const [reminderDateTime, setReminderDateTime] = useState('');
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [shareDialogOpen, setShareDialogOpen] = useState(false);

  const addReminder = () => {
    if (reminderName && reminderDateTime) {
      setReminders([...reminders, { name: reminderName, dateTime: reminderDateTime }]);
      setReminderName('');
      setReminderDateTime('');
    }
  };

  const handleImageUpload = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
  };

  const handleCaptionChange = (event) => {
    setCaption(event.target.value);
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
          <Typography variant="h5" style={{ color: 'white', fontWeight: 'bold' }}>
            Marketing
          </Typography>
        </Toolbar>
      </AppBar>

      <Container
        maxWidth="xl"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'white',
          padding: '20px',
          minHeight: '100vh',
        }}
      >
        <Box
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <Box
            style={{
              flex: 1,
              padding: '20px',
              marginRight: '20px',
              backgroundColor: '#e5ffd2',
              borderRadius: '10px',
            }}
          >
            <Typography
              variant="h6"
              style={{ color: '#006400', fontWeight: 'bold', marginBottom: '10px' }}
            >
              Reminders
            </Typography>
            <div>
              <TextField
                type="text"
                placeholder="Reminder Name"
                value={reminderName}
                onChange={(e) => setReminderName(e.target.value)}
                fullWidth
                style={{ marginBottom: '10px' }}
              />
              <TextField
                type="datetime-local"
                value={reminderDateTime}
                onChange={(e) => setReminderDateTime(e.target.value)}
                InputLabelProps={{ shrink: true }}
                fullWidth
                
              />
              <Button
                style={{ backgroundColor: '#009822', color: '#FFFFFF', marginTop: '15px' }}
                variant="contained"
                onClick={addReminder}
                
              >
                Add Reminder
              </Button>
            </div>
            <ul style={{ marginTop: '10px' }}>
              {reminders.map((reminder, index) => (
                <li key={index}>
                  {reminder.name} at {new Date(reminder.dateTime).toLocaleString()}
                </li>
              ))}
            </ul>
          </Box>

          <Box
            style={{
              flex: 1,
              padding: '20px',
              marginRight: '20px',
              backgroundColor: '#f5e9ff',
              borderRadius: '10px',
            }}
          >
            <Typography variant="h6" style={{ color: '#8A2BE2', fontWeight: 'bold', marginBottom: '10px' }}>
              Upload Graphic
            </Typography>
            <label htmlFor="file-upload" className="custom-file-upload" style={{ display: 'block', marginBottom: '10px' }}>
              Choose File
            </label>
            <input
              type="file"
              id="file-upload"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
            {image && (
              <img
                src={URL.createObjectURL(image)}
                alt="Uploaded"
                style={{ width: '100%', borderRadius: '5px', marginTop: '10px' }}
              />
            )}
            <TextField
              placeholder="Enter caption..."
              value={caption}
              onChange={handleCaptionChange}
              multiline
              rows={4}
              style={{ marginTop: '10px' }}
              fullWidth
            />
          </Box>

          <Box
            style={{
              flex: 1,
              padding: '20px',
              backgroundColor: '#ffe1d2',
              borderRadius: '10px',
            }}
          >
            <Typography variant="h6" style={{ color: '#FF0000', fontWeight: 'bold', marginBottom: '10px' }}>
              Helpful Links
            </Typography>
            <Box display="flex" justifyContent="space-between">
            <Button
              variant="contained"
              style={{ backgroundColor: '#20C4CB', color: '#FFFFFF', marginRight: '10px', marginTop: '30px' }}
              onClick={() => window.open('https://www.canva.com/', '_blank')}
            >
              Canva
            </Button>
            <Button
              variant="contained"
              style={{ backgroundColor: '#a259ff', color: '#FFFFFF', marginRight: '10px', marginTop: '30px' }}
              onClick={() => window.open('https://www.figma.com/', '_blank')}
            >
              Figma
            </Button>
            <Button
              variant="contained"
              style={{ backgroundColor: '#FF0000', color: '#FFFFFF', marginTop: '30px' }}
              onClick={() => window.open('https://www.adobe.com/', '_blank')}
            >
              Adobe
            </Button>
            </Box>
            <div style={{ marginTop: '20px' }}>
              <Button
                variant="contained"
                style={{ backgroundColor: '#0000FF', color: '#FFFFFF', marginTop: '50px' }}
                onClick={openShareDialog}
              >
                Share Graphic
              </Button>
            </div>
          </Box>
        </Box>
      </Container>

      {/* Share Dialog */}
      <Dialog open={shareDialogOpen} onClose={closeShareDialog}>
        <DialogTitle>Share Options</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column">
            <Button
              variant="contained"
              style={{ marginTop: '10px', backgroundColor: '#4267B2', color: '#FFFFFF' }}
              onClick={openFacebook}
            >
              Facebook
            </Button>
            <Button
              variant="contained"
              style={{ marginTop: '10px', backgroundColor: '#d62976', color: '#FFFFFF' }}
              onClick={openInstagram}
            >
              Instagram
            </Button>
            <Button
              variant="contained"
              style={{ marginTop: '10px', backgroundColor: '#1490DF', color: '#FFFFFF' }}
              onClick={openOutlook}
            >
              Outlook
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeShareDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default MarketingPage;