import { useState, useEffect } from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';
import AxiosInstance from "../Axios";
import "../../styles/Marketing.css";


const PosterBox = ({ eventId }) => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState(String);
  const [showUploadPoster, setShowUploadPoster] = useState(true);

useEffect(() => {
  const getPoster = async () => {
    try {
      const response = await AxiosInstance.get(`marketingPoster/?event_id=${eventId}`);
      const posterData = response.data;
      if (!posterData) {
        setImage(null)
        setCaption("")
      } else {
      const lastPoster = posterData[posterData.length - 1]
        setImage(lastPoster.image)
        setCaption(lastPoster.caption)
              }
    } catch (error) {
      console.error("Error fetching Marketing Poster:", error);
    }
  };
      getPoster();
  }, [eventId]);

  const submitPosterImage = (e) => {
    e.preventDefault();
    let savePayload = new FormData();
    savePayload.append('name', image.name);
    savePayload.append('image', image, image.name);
    savePayload.append('caption', caption);
    savePayload.append('event_id', eventId);
   
      AxiosInstance.post('marketingPoster/', savePayload, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
            .catch(err => {
        console.error('Error submitting poster image:', err);
      });
      };
 
  const handleImageUpload = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  const toggleUploadPoster = () => {
    setShowUploadPoster(!showUploadPoster);
  };

  return (
    <div>
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
            cursor: 'pointer',
            userSelect: 'none',
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
                    style={{ backgroundColor: '#d056ff', color: '#FFFFFF' }}
                    onClick={submitPosterImage}
                >
                Share Graphic
                </Button>
                </div>
            </div>
            </Box>
        )}
    </div>
  );
};

export default PosterBox;
