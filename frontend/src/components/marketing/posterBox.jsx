import { useState, useEffect } from 'react';
import { Button, TextField, Typography, Box, Card } from '@mui/material';
import AxiosInstance from "../Axios";
import "../../styles/Marketing.css";


const PosterBox = ({ eventId }) => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState(String);

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
        }
      } catch (error) {
        console.error("Error fetching Marketing Poster:", error);
      }
    };
    getPoster();
  }, [eventId]);

  const updatePosterImage = async (e) => {
    e.preventDefault();

    // TODO: create a deleteOldPoster backend endpoint to remove the old poster before uploading a new one
    // if (image !== null && typeof image === 'string') {
    //   // Assuming the URL of the old poster is stored in the 'image' state
    //   try {
    //     // Send a request to your backend to delete the old poster file
    //     await AxiosInstance.delete(`deleteOldPoster/?poster_url=${image}`);
    //   } catch (error) {
    //     console.error('Error deleting old poster image:', error);
    //   }
    // }
  
    // Create FormData payload
    let savePayload = new FormData();
    savePayload.append('name', image.name);
    savePayload.append('image', image, image.name);
    savePayload.append('caption', caption);
    savePayload.append('event_id', eventId);
  
    try {
      // Check if a poster already exists for the event
      const response = await AxiosInstance.get(`marketingPoster/?event_id=${eventId}`);
      const posterData = response.data;
  
      if (posterData.length === 0) {
        // If no poster exists, create a new one
        await AxiosInstance.post('marketingPoster/', savePayload, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      } else {
        // If a poster exists, update the existing one
        const posterId = posterData[0].id;
        await AxiosInstance.patch(`marketingPoster/${posterId}/`, savePayload, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
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

            <Box 
            style={{
                flex: 1,
                padding: '20px',
                borderRadius: '5px 5px 10px 10px',
                backgroundColor: 'white',
                marginTop: '-10px',
            }}
            >

            <div style={{ display: 'block' }}>
                <label htmlFor="file-upload" className="custom-file-upload" style={{ display: 'inline-block', alignItems: 'center', marginTop: '10px', justifyContent: 'space-between' }}>
                    <div className="choose-file-button" style={{ display: 'flex', alignItems: 'center' }}>
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
                <div  style={{ display: 'flex', justifyContent: 'flex-end' }}>
                {image && (
                    <Button 
                    style={{ color: '#000000', backgroundColor: 'fafafa'}}
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
                    style={{ maxWidth: '200px', height: 'auto', borderRadius: '5px', marginTop: '10px' }}
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
                    style={{ backgroundImage: 'linear-gradient(15deg, #80d0c7 0%,  #13547a 0%)', color: '#FFFFFF' }}
                    onClick={updatePosterImage}
                >
                Share Graphic
                </Button>
                </div>
            </div>
            </Box>
    </Card>
  );
};

export default PosterBox;
