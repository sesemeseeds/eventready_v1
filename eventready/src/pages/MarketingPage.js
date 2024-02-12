import React, { useState } from 'react';
import { Button, TextField, Typography, Box, AppBar, Toolbar, Dialog, DialogTitle, DialogContent, DialogActions, Container } from '@mui/material';
import { useForm } from "react-hook-form";
import axios from 'axios';
import AxiosInstance from "../components/Axios";
import { useParams } from "react-router-dom";

const MarketingPage = () => {
  const [reminders, setReminders] = useState([]);
  const [reminderName, setReminderName] = React.useState(String);
  const [reminderDateTime, setReminderDateTime] = React.useState(String);
  const [image, setImage] = useState(null);
  const [caption, setCaption] = React.useState(String);
  const [recapImages, setRecapImages] = useState([]);

  // const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [showReminder, setShowReminder] = useState(true);
  //TODO: recap images linked to backend database
  const [showUploadPoster, setShowUploadPoster] = useState(true);
  const [showHelpfulLinks, setShowHelpfulLinks] = useState(true);
  const [showUploadRecapImages, setShowUploadRecapImages] = useState(true);
  
  // get the root poster image, latest one uploaded from database to show to user on load
  const getPosterImage = () => {   
    axios.get(`http://localhost:8000/api/marketingPoster`)        // get request to get the marketing poster
      .then(response => {                                         // response.data shows all the posters uploaded
        if (!response.data) {                                     // if there is no poster uploaded, just sets the caption and image to null
          setImage(null)
          setCaption(null)
        } else {
          const lastPoster = response.data[response.data.length - 1]      // gets the last poster
          setImage(`http://localhost:8000${lastPoster.image}`)            // setImage to the url of the last poster
          setCaption(lastPoster.caption)                                  // setCaption of caption of the last poster
        }      
      })
      .catch(error => {
        console.error('Error:', error);                           // Handle errors here
      });
  };

  // get the reminders of the repository
  const getReminders = () => {
    axios.get(`http://localhost:8000/api/marketingReminders`)
      .then(response => {
        const remindersData = response.data;                          // redeclare reminder data
        if (!remindersData || !Array.isArray(remindersData)) {        // if payload is nothing, set the reminderData to an empty array
          setReminders([]);
        } else {
          const formattedReminders = remindersData.map(reminder => ({       // format the reminders: id, name, datetime to present in client-side
            id: reminder.id,
            name: reminder.name,
            dateTime: combineDateTime({                         // combine the data into the readable client-side data
              date: reminder.date,
              time: reminder.time
            })
          }));
          setReminders(formattedReminders);                    // setReminders called using the formattedReminders
        }      
      })
      .catch(error => {
        console.error('Error:', error);                       // Handle errors here
      });
  };

  // on load, call these functions to get latest data
  React.useEffect(() => {
    getPosterImage();
    getReminders();
  }, []);

  const toggleReminder = () => {
    setShowReminder(!showReminder);
  };

  const addReminder = () => {
    if (reminderName && reminderDateTime) {
      setReminders([...reminders, { name: reminderName, dateTime: reminderDateTime }]);
      const dateTime = splitDateTime(reminderDateTime)
      const data = {}
      data['name'] = reminderName
      data['date'] = dateTime.date
      data['time'] = dateTime.time
      let url = 'http://localhost:8000/api/marketingReminders/';
      axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => {
          // console.log(res.data);
        })
        .catch(err => console.log(err))
    };
    setReminderName('');
    setReminderDateTime('');
  };

  const splitDateTime = (dateTimeString) => {
    var dateTimeArray = dateTimeString.split('T');

    var dateComponent = dateTimeArray[0];
    var timeComponent = dateTimeArray[1];

    var dateParts = dateComponent.split('-');
    var year = dateParts[0];
    var month = dateParts[1];
    var day = dateParts[2];

    var timeParts = timeComponent.split(':');
    var hour = timeParts[0];
    var minute = timeParts[1];

    return {
        date: year + '-' + month + '-' + day,
        time: hour + ':' + minute
    };
  }

  const combineDateTime = (dateTimeObject) => {
    const { date, time } = dateTimeObject;
    const [year, month, day] = date.split('-');
    const [hour, minute] = time.split(':');

    const combinedDateTimeString = `${year}-${month}-${day}T${hour}:${minute}`;

    return combinedDateTimeString;
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


  const handleImageUpload = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };
  
  const submitPosterImage = (e) => {
    e.preventDefault();
    let form_data = new FormData();
    form_data.append('name', image.name);
    form_data.append('image', image, image.name);
    form_data.append('caption', caption);
    let url = 'http://localhost:8000/api/marketingPoster/';
    axios.post(url, form_data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
        .then(res => {
          // console.log(res.data);
        })
        .catch(err => console.log(err))
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

  const handleRecapImageUpload = (e) => {
    const selectedImages = e.target.files;
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
              <Box 
                style={{
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
                  </label>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {image && (
                      <Button
                        style={{ color: '#000000' }}
                        onClick={() => setImage(null)}
                      >
                        Clear
                      </Button>
                    )}
                  </div>
                  {image && (
                    <img
                      src={image instanceof Blob ? URL.createObjectURL(image) : image}
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
                      onClick={submitPosterImage}
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

