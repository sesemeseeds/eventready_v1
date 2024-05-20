import { useState, useEffect } from 'react';
import { Button, TextField, Typography, Box, Card } from '@mui/material';
import AxiosInstance from "../Axios";
import "../../styles/Marketing.css";
import { convertLength } from '@mui/material/styles/cssUtils';

const PosterBox = ({ eventId }) => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [imageUploaded, setImageUploaded] = useState(false);

  useEffect(() => {
    const getPoster = async () => {
      try {
        const response = await AxiosInstance.get(`marketingPoster/?event_id=${eventId}`);
        const posterData = response.data;
        if (posterData.length === 0) {
          setImage(null);
          setCaption("");
        } else {
          const poster = posterData[0];
          setImage(poster.image);
          setCaption(poster.caption);
          setImageUploaded(true);
        }
      } catch (error) {
        console.error("Error fetching Marketing Poster:", error);
      }
    };
    getPoster();
  }, [eventId]);

  const handleDeleteImage = async () => {
    try {
      const response = await AxiosInstance.get(`marketingPoster/?event_id=${eventId}`);
      const posterData = response.data;
      if (posterData.length !== 0) {
        const posterId = posterData[0].id;
        await AxiosInstance.delete(`marketingPoster/${posterId}/`);
        setImageUploaded(false);
      }
    } catch (error) {
      console.error('Error deleting poster image:', error);
    } finally {
      setImage(null);
    }
  };

  const updatePosterImage = async (e) => {
    e.preventDefault();
    let savePayload = new FormData();
    savePayload.append('name', image.name);
    savePayload.append('image', image, image.name);
    savePayload.append('caption', caption);
    savePayload.append('event_id', eventId);
    try {
      const response = await AxiosInstance.get(`marketingPoster/?event_id=${eventId}`);
      const posterData = response.data;
      if (posterData.length === 0) {
        await AxiosInstance.post('marketingPoster/', savePayload, { headers: { 'Content-Type': 'multipart/form-data' } });
        setImageUploaded(true);
      } else {
        const posterId = posterData[0].id;
        await AxiosInstance.patch(`marketingPoster/${posterId}/`, savePayload, { headers: { 'Content-Type': 'multipart/form-data' } });
        setImageUploaded(true);
      }
    } catch (error) {
      console.error('Error updating poster image:', error);
    }
  };

  const handleImageUpload = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  return (
    <Card>
      <Typography
        variant="h6"
        style={{
          color: 'white',
          fontWeight: 'bold',
          marginBottom: '10px',
          backgroundImage: 'linear-gradient(15deg, #80d0c7 0%,  #13547a 0%)',
          padding: '10px',
          borderRadius: '5px',
          paddingLeft: '20px',
        }}
      >
        Upload Poster
      </Typography>
      <Box style={{ display: 'flex', height: '600px', placeContent: 'center' }}>
        {/* Left side with image */}
        {( !image && (
            <div style={{ display: 'flex', alignSelf: 'center' }}>
            <label htmlFor="file-upload"  style={{ display: 'inline-block' }}>
              <Button variant="outlined" color="primary" component="span">Choose File</Button>
              <input
                type="file"
                id="file-upload"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
            </label>
          </div>
          )
        )}
        {( image && (
          <>
            <Box style={{ flex: 0.6 }}>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                {image && (
                  <img
                  src={image instanceof Blob ? URL.createObjectURL(image) : image}
                  alt="Uploaded"
                  style={{ maxWidth: '400px', height: 'auto', borderRadius: '5px' }}
                  />
                )}
              </div>
            </Box>
            <Box style={{ flex: 0.4, padding: '20px', borderRadius: '0px 5px 5px 0px', backgroundColor: 'white', display: 'flex', flexDirection: 'column' }}>
              {image && (
                <>
                  <TextField
                    placeholder="Enter caption..."
                    value={caption}
                    onChange={handleCaptionChange}
                    multiline
                    rows={20}
                    style={{ marginBottom: '20px' }}
                    fullWidth
                    />
                  {imageUploaded ? (
                    <>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button
                          variant="outlined"
                          style={{ alignSelf: 'flex-start' }}
                          onClick={handleDeleteImage}
                          >
                          Delete
                        </Button>
                        <Button
                          variant="contained"
                          style={{ backgroundImage: 'linear-gradient(15deg, #80d0c7 0%,  #13547a 0%)', color: '#FFFFFF'}}
                          onClick={updatePosterImage}
                          >
                          Edit Description
                        </Button>
                      </div>
                    </>
                  ) : (
                    <Button
                      variant="contained"
                      style={{ backgroundImage: 'linear-gradient(15deg, #80d0c7 0%,  #13547a 0%)', color: '#FFFFFF' }}
                      onClick={updatePosterImage}
                      >
                      Share Graphic
                    </Button>
                  )}
                </>
              )}
            </Box>
          </>
        )
        )}
      </Box>
    </Card>
  );
};

export default PosterBox;
