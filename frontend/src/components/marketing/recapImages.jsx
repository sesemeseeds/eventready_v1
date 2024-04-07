import { useState, useEffect } from 'react';

import { Box, Typography, Button } from '@mui/material';

import "../../styles/Marketing.css";

const RecapImagesBox = ({ eventId }) => {
    const [recapImages, setRecapImages] = useState([]);
    const [showUploadRecapImages, setShowUploadRecapImages] = useState(false);

    const toggleUploadRecapImages = () => {
        setShowUploadRecapImages(!showUploadRecapImages);
    };
    
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
    <Box
      style={{
        flex: 1,
        padding: '20px',
        borderRadius: '10px',
        backgroundColor: '#d1e9ff',
        position: 'relative',
        margin: '15px',
        width: '98%'
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
          top: 0,
          left: 0,
          right: 0,
          paddingLeft: '20px',
          userSelect: 'none',
          cursor: 'pointer',
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
          <label htmlFor="recap-image-upload" className="custom-file-upload" style={{ display: 'inline-block', alignItems: 'center', marginTop: '10px', justifyContent: 'space-between' }}>
            <div className="choose-file-button" style={{ display: 'flex', alignItems: 'center', marginTop: '30px', marginBottom: '20px', justifyContent: 'space-between' }}>
              Choose File(s)
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
  );
};

export default RecapImagesBox;
