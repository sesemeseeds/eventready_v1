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
      <AppBar position="static" style={{ backgroundColor: 'red' , height : '80px'}}>
        <Toolbar>
          <Typography variant="h4" style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', width: '100%', marginTop: '20px' }}>
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
          padding: '15px',
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
          {/* Reminders Section */}
          <Box
            style={{
              flex: 1,
              padding: '20px',
              marginRight: '20px',
              borderRadius: '10px',
              backgroundColor: '#e9ffda', // lighter color for Reminders
              position: 'relative',
              marginTop: '40px', // Further adjusted position
            }}
          >
            <Typography
              variant="h6"
              style={{ 
                color: 'white', 
                fontWeight: 'bold', 
                marginBottom: '10px', 
                backgroundColor: '#006400', 
                padding: '10px', 
                borderRadius: '5px', 
                position: 'absolute', 
                top: 0, left: 0, right: 0,
                paddingLeft: '20px'}}
            >
              Reminders
            </Typography>
            <Typography variant="body1" style={{ color: 'black', marginTop: '55px' }}>
            Don't miss a beat with our nifty Reminders feature.             
            </Typography>
            <div>
              <TextField
                type="text"
                placeholder="Reminder Name"
                value={reminderName}
                onChange={(e) => setReminderName(e.target.value)}
                fullWidth
                style={{ marginTop: '30px' }}
              />
              <TextField
                type="datetime-local"
                value={reminderDateTime}
                onChange={(e) => setReminderDateTime(e.target.value)}
                InputLabelProps={{ shrink: true }}
                fullWidth
                style={{ marginTop: '20px' }}
              />
              <Button
                style={{ backgroundColor: '#009822', color: '#FFFFFF', marginTop: '20px' }}
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

          {/* Upload Graphic Section */}
          <Box
          style={{ flex: 1, padding: '20px',marginRight: '20px',borderRadius: '10px',
          backgroundColor: '#f2ebff', // lighter color for Upload Graphic
          position: 'relative', marginTop: '40px', // Further adjusted position 
          }}>

  <Typography 
    variant="h6" 
    style={{ 
      color: 'white', 
      fontWeight: 'bold', 
      marginBottom: '10px', 
      backgroundColor: '#8A2BE2', 
      padding: '10px', 
      borderRadius: '5px', 
      position: 'absolute', 
      top: 0, left: 0, right: 0,
      paddingLeft: '20px'}}
  >
    Upload Poster
  </Typography>
  <label htmlFor="file-upload" className="custom-file-upload" style={{ display: 'flex', alignItems: 'center', marginTop: '60px', justifyContent: 'space-between' }}>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    Choose File
    <input
      type="file"
      id="file-upload"
      accept="image/*"
      onChange={handleImageUpload}
      style={{ display: 'none' }}
    />
  </div>
  {image && (
     <Button
     style={{ color: '#000000' }}  // Removed backgroundColor
     onClick={() => setImage(null)}
   >
      Clear
    </Button>
  )}
</label>

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
  {/* Share Graphic Button */}
  <div style={{ marginTop: '20px' }}>
    <Button
      variant="contained"
      style={{ backgroundColor: '#0000FF', color: '#FFFFFF' }}
      onClick={openShareDialog}
    >
      Share Graphic
    </Button>
  </div>
</Box>

          {/* Helpful Links Section */}
          <Box
            style={{
              flex: 1,
              padding: '20px',
              borderRadius: '10px',
              backgroundColor: '#ffeee8', // lighter color for Helpful Links
              position: 'relative',
              marginTop: '40px', // Further adjusted position
            }}
          >
            <Typography 
              variant="h6" 
              style={{ 
                color: 'white', 
                fontWeight: 'bold', 
                marginBottom: '10px', 
                backgroundColor: '#ff5f08', 
                padding: '10px', 
                borderRadius: '5px', 
                position: 'absolute', 
                top: 0, left: 0, right: 0,
                paddingLeft: '20px'}}
            >
              Helpful Links
            </Typography>
            <Typography variant="body1" style={{ color: 'black', marginBottom: '10px', marginTop: '55px' }}>
            Embarking on a creative journey with graphics? Dive into these fantastic resources to unleash your inner designer and craft amazing posters, vibrant flyers, eye-catching logos, and more for your spectacular event! Let your imagination run wild and bring your ideas to life!
            </Typography>
            <Box display="flex" justifyContent="space-between">
              <Button
                variant="contained"
                style={{ backgroundColor: '#20C4CB', color: '#FFFFFF', marginRight: '10px', marginTop: '10px' }}
                onClick={() => window.open('https://www.canva.com/', '_blank')}
              >
                Canva
              </Button>
              <Button
                variant="contained"
                style={{ backgroundColor: '#a259ff', color: '#FFFFFF', marginRight: '10px', marginTop: '10px' }}
                onClick={() => window.open('https://www.figma.com/', '_blank')}
              >
                Figma
              </Button>
              <Button
                variant="contained"
                style={{ backgroundColor: '#FF0000', color: '#FFFFFF', marginTop: '10px' }}
                onClick={() => window.open('https://www.adobe.com/', '_blank')}
              >
                Adobe
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>

      {/* Share Dialog */}
      <Dialog open={shareDialogOpen} onClose={closeShareDialog}>
        <DialogTitle style={{ backgroundColor: 'red', color: 'white', fontWeight: 'bold', paddingRight: '24px' }}>Share Options</DialogTitle>
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
          <Button style={{ backgroundColor: 'red', color: 'white' }} variant="contained" onClick={closeShareDialog}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MarketingPage;