import React, { useState } from 'react';
import { Button, TextField, Typography, Box, AppBar, Toolbar, Dialog, DialogTitle, DialogContent, DialogActions, Container } from '@mui/material';

const MarketingPage = () => {
  const [reminders, setReminders] = useState([]);
  const [reminderName, setReminderName] = useState('');
  const [reminderDateTime, setReminderDateTime] = useState('');
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [shareDialogOpen, setShareDialogOpen] = useState(false);

  const [showReminder, setShowReminder] = useState(true);
  const [showUploadPoster, setShowUploadPoster] = useState(true);
  const [showHelpfulLinks, setShowHelpfulLinks] = useState(true);
  const [showUploadRecapImages, setShowUploadRecapImages] = useState(true);
  
  const toggleReminder = () => {
    setShowReminder(!showReminder);
  };

  const addReminder = () => {
    if (reminderName && reminderDateTime) {
      setReminders([...reminders, { name: reminderName, dateTime: reminderDateTime }]);
      setReminderName('');
      setReminderDateTime('');
    }
  };
  
  const toggleUploadPoster = () => {
    setShowUploadPoster(!showUploadPoster);

  };
  
  const toggleHelpfulLinks = () => {
    setShowHelpfulLinks(!showHelpfulLinks);
  };

  const toggleUploadRecapImages = () => {
    setShowUploadRecapImages(!showUploadRecapImages);
  };


  const handleImageUpload = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
  };

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
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

  // State and functions for Recap Images Section
  const [recapImages, setRecapImages] = useState([]);

  const handleRecapImageUpload = (event) => {
    const selectedImages = event.target.files;
    setRecapImages([...recapImages, ...Array.from(selectedImages)]);
  };

  const handleRecapImageClear = (index) => {
    const updatedImages = [...recapImages];
    updatedImages.splice(index, 1);
    setRecapImages(updatedImages);
  };



  return (
    <div>
      {/* <AppBar position="static" style={{ backgroundColor: 'red', height: '80px' }}>
        <Toolbar>
          <Typography variant="h4" style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', width: '100%', marginTop: '20px' }}>
            Marketing
          </Typography>
        </Toolbar>
      </AppBar> */}

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
              marginRight: '20px',
              marginTop: '40px',
              marginBottom: '70px',
              
            }}
          >
            {/* Dark green content */}
            <Box
              style={{
                borderRadius: '10px',
                position: 'relative',
              }}
            >
              <Typography
                variant="h6"
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  marginBottom: '10px',
                  backgroundColor: '#2c9100',
                  padding: '10px',
                  borderRadius: '5px',
                  paddingLeft: '20px',
                  cursor: 'pointer',
                }}
                onClick={toggleReminder}
              >
                Reminders
              </Typography>

              {/* Light green content */}
              {showReminder && (
                <Box
                  style={{
                    flex: 1,
                    padding: '20px',
                    marginTop: '-10px',
                    backgroundColor: '#e9ffda',
                    borderRadius: '5px 5px 10px 10px',
                    display: showReminder ? 'block' : 'none',  
                  }}
                >
                  <TextField
                    type="text"
                    placeholder="Reminder Name"
                    value={reminderName}
                    onChange={(e) => setReminderName(e.target.value)}
                    fullWidth
                    style={{ marginTop: '10px' }}
                  />
                  <TextField
                    type="datetime-local"
                    value={reminderDateTime}
                    onChange={(e) => setReminderDateTime(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    style={{ marginTop: '10px' }}
                  />
                  <Button
                    style={{ backgroundColor: '#45b316', color: '#FFFFFF', marginTop: '40px' }}
                    variant="contained"
                    onClick={addReminder}
                  >
                    Add Reminder
                  </Button>

                  {/* Display added reminders */}
                  <ul style={{ marginTop: '10px' }}>
                    {reminders.map((reminder, index) => (
                      <li key={index}>
                        {reminder.name} at {new Date(reminder.dateTime).toLocaleString()}
                      </li>
                    ))}
                  </ul>
                </Box>
              )}
            </Box>
          </Box>


          {/* Upload Graphic Section */}

             <Box
             style={{
               flex: 1,
               marginRight: '20px',
               marginTop: '40px',
               marginBottom: '70px',
             }}
            >
            {/* Dark purple header */}
            <Typography
            variant="h6"
            style={{
            color: 'white',
            fontWeight: 'bold',
            marginBottom: '10px',
            backgroundColor: '#b54fdc',
            padding: '10px',
            borderRadius: '5px',
            paddingLeft: '20px',
            }}
            onClick={toggleUploadPoster}
            >
             Upload Poster
             </Typography>

               {/* Light purple header */}
             {showUploadPoster && (
             <Box style={{
              flex: 1,
              padding: '20px',
              borderRadius: '5px 5px 10px 10px',
              backgroundColor: '#f8e7ff',
              marginTop: '-10px',
              
              }}
              >

      <div style={{ display: 'block' }}>
      <label htmlFor="file-upload" className="custom-file-upload" style={{ display: 'flex', alignItems: 'center', marginTop: '10px', justifyContent: 'space-between' }}>
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
            style={{ color: '#000000' }}
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
        rows={2}
        style={{ marginTop: '20px' }}
        fullWidth
      />
      {/* Share Graphic Button */}
      <div style={{ marginTop: '40px' }}>
        <Button
          variant="contained"
          style={{ backgroundColor: '#d056ff', color: '#FFFFFF' }}
          onClick={openShareDialog}
        >
          Share Graphic
        </Button>
      </div>
    </div>
    </Box>
  )}
  </Box>


          {/* Helpful Links Section */}
          <Box
            style={{
              flex: 1,
              marginRight: '20px',
              marginTop: '40px',
              marginBottom: '70px',
            }}
          >
            {/* Dark yellow content */}
            <Box
              style={{
                borderRadius: '10px',
                position: 'relative',
                cursor: 'pointer',
              }}
              onClick={toggleHelpfulLinks}
            >
              <Typography
                variant="h6"
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  marginBottom: '10px',
                  backgroundColor: '#fdb300',
                  padding: '10px',
                  borderRadius: '5px',
                  paddingLeft: '20px',
                }}
              >
                Helpful Links
              </Typography>

              {/* Light yellow content */}
              {showHelpfulLinks && (
                <Box
                  style={{
                    padding: '20px',
                    marginTop: '-10px',
                    backgroundColor: '#ffeec5',
                    borderRadius: '5px 5px 10px 10px',
                    display: showHelpfulLinks ? 'block' : 'none',
                  }}
                >
                  <Typography variant="body1" style={{ color: 'black', marginBottom: '10px', marginTop: '5px' }}>
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
              )}
            </Box>
          </Box>
        </Box>


        {/* Upload Recap Images Section */}
        <Box
          style={{
            flex: 1,
            padding: '20px',
            borderRadius: '10px',
            backgroundColor: '#d1e9ff',
            position: 'relative',
            marginTop: '-15px',
            marginBottom:'15px',
            width: '97%',  // Spread to bottom width
          }}
        >
          {/* Dark blue header */}
          <Typography
            variant="h6"
            style={{
              color: 'white',
              fontWeight: 'bold',
              marginBottom: '10px',
              backgroundColor: '#1f92ff',
              padding: '10px',
              borderRadius: '5px',
              position: 'absolute',
              top: 0, left: 0, right: 0,
              paddingLeft: '20px',
            }}
            onClick={toggleUploadRecapImages}
          >
            Upload Recap Images
          </Typography>

          {/* Light blue content */}
          {showUploadRecapImages && (
          <Box
            style={{
            padding: '20px',
            marginTop: '-10px',
            backgroundColor: '#d1e9ff',
            borderRadius: '5px 5px 10px 10px',
            display: showUploadRecapImages ? 'block' : 'none',
          }}
        >
          <Typography variant="body1" style={{ color: 'black', marginTop: '55px' }}>
            Relive the magic of your events by uploading recap images. Let the pictures tell the story and showcase the vibrant essence of your organization.
          </Typography>

          
          {/* File input and label */}
          <label htmlFor="recap-image-upload" className="custom-file-upload">
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '30px', marginBottom: '20px', justifyContent: 'space-between' }}>
              Choose File
              <input
                type="file"
                id="recap-image-upload"
                multiple
                accept="image/*"
                onChange={handleRecapImageUpload}
                style={{ display: 'none' }}
              />
            </div>
          </label>

          {/* Display uploaded images and clear buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {recapImages.map((image, index) => (
              <div key={index} style={{ marginRight: '10px', marginBottom: '10px', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {/* Display image with a max width of 300px */}
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Recap Image ${index + 1}`}
                  style={{ maxWidth: '300px', borderRadius: '5px', marginBottom: '5px' }} />

                {/* Clear button in top right corner */}
                <Button
                  style={{ color: '#FFFFFF', fontSize: '12px', backgroundColor: '#1f92ff', padding: '4px', minWidth: '30px', fontWeight: 'bold', fontFamily: 'Futura', position: 'absolute', top: '8px', right: '9px', borderRadius: '100%' }}
                  onClick={() => handleRecapImageClear(index)}>
                  X
                </Button>

              </div>
            ))}
          </div>
        </Box>
        )}
        </Box>
      </Container>
    </div>
  );
};

export default MarketingPage;

