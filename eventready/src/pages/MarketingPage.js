import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, TextField, Button, Box, Container } from '@mui/material';

const MarketingPage = () => {
  const [reminders, setReminders] = useState([]);
  const [reminderName, setReminderName] = useState('');
  const [reminderDateTime, setReminderDateTime] = useState('');
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');

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

  return (
    <div>
      <AppBar position="static" style={{ backgroundColor: 'red' }}>
        <Toolbar>
          <Typography variant="h6" style={{ color: 'white', fontWeight: 'bold' }}>
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
              backgroundColor: '#C1FFC1', // Minty green background
              borderRadius: '10px',
            }}
          >
            <Typography
              variant="h6"
              style={{ color: '#006400', fontWeight: 'bold', marginBottom: '10px' }} // Dark green color
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
              />
              <TextField
                type="datetime-local"
                value={reminderDateTime}
                onChange={(e) => setReminderDateTime(e.target.value)}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
              <Button
                style={{ backgroundColor: '#008B8B', color: '#FFFFFF', marginTop: '10px' }}
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
              marginRight: '20px', // Space between the second and third sections
              backgroundColor: '#E6E6FA', // Lilac background
              borderRadius: '10px',
            }}
          >
            <Typography variant="h6" style={{ color: '#8A2BE2', fontWeight: 'bold', marginBottom: '10px' }}>
              Image Upload
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
              backgroundColor: '#FFE4B5', // Light Orange background
              borderRadius: '10px',
            }}
          >
            <Typography variant="h6" style={{ color: '#FF0000',fontWeight: 'bold', marginBottom: '10px' }}>
              Helpful Links
            </Typography>
            <Button
            variant="contained"
            style={{ backgroundColor: '#FF0000', color: '#FFFFFF', marginRight: '10px' }} // Red color
            onClick={() => window.open('https://www.canva.com/', '_blank')}
            >
            Canva
          </Button>
          <Button
          variant="contained"
          style={{ backgroundColor: '#FF0000', color: '#FFFFFF', marginRight: '10px' }} // Red color
          onClick={() => window.open('https://www.figma.com/', '_blank')}
          >
      Figma
    </Button>
    <Button
      variant="contained"
      style={{ backgroundColor: '#FF0000', color: '#FFFFFF' }} // Red color
      onClick={() => window.open('https://www.adobe.com/', '_blank')}
    >
      Adobe
    </Button>
            <div style={{ marginTop: '20px' }}>
              <Typography style={{ fontSize: '14px', color: '#6A5ACD' }}>Share</Typography>
              {/* Add content for sharing */}
            </div>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default MarketingPage;
