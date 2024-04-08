import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Card, IconButton } from '@mui/material';
import { useParams } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import AxiosInstance from "../components/Axios";
import DeleteConfirmationDialog from '../components/dialog/DeleteConfirmationDialog';

import "../styles/Marketing.css";

const GalleryPage = () => {
  const [recapImages, setRecapImages] = useState([]);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [imageToDelete, setImageToDelete] = useState(null);
  const [fullscreenImage, setFullscreenImage] = useState(null);

  const MyParam = useParams();
  const eventId = MyParam.id;

  useEffect(() => {
    // Fetch recap images for the event
    const fetchRecapImages = async () => {
      try {
        const response = await AxiosInstance.get(`marketingPhotos/?event=${eventId}`);
        const recapPhotos = response.data;
        if (recapPhotos.length > 0) {
          setRecapImages(recapPhotos);
          setImageUploaded(true);
        }
      } catch (error) {
        console.error("Error fetching recap images:", error);
      }
    };

    fetchRecapImages();
  }, [eventId]);

  const handleRecapImageUpload = async (event) => {
    try {
      const formData = new FormData();
      for (let i = 0; i < event.target.files.length; i++) {
        const file = event.target.files[i];
        formData.append('image', file);
        formData.append('name', file.name);
      }
      formData.append('event_id', eventId);
      
      const response = await AxiosInstance.post('marketingPhotos/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setRecapImages([...recapImages, response.data]);
      
      setImageUploaded(true);
    } catch (error) {
      console.error("Error uploading recap images:", error);
    }
  };
  


  const handleRecapImageClear = (id) => {
    setImageToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirmation = async () => {
    try {
      await AxiosInstance.delete(`marketingPhotos/${imageToDelete}/`);
      setRecapImages(recapImages.filter(image => image.id !== imageToDelete));
    } catch (error) {
      console.error("Error deleting recap image:", error);
    } finally {
      setDeleteDialogOpen(false);
    }
  };

  const handleImageClick = (image) => {
    setFullscreenImage(image);
  };

  const handleCloseFullscreen = () => {
    setFullscreenImage(null);
  };

  return (
      <Box className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
        <input
          type="file"
          id="recap-image-upload"
          multiple
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleRecapImageUpload}
        />
        <label htmlFor="recap-image-upload">
          <Button variant="contained" color="primary" component="span">
            Upload Photo(s)
          </Button>
        </label>
        <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px' }}>
          {recapImages.map(image => (
            <div key={image.id} style={{ position: 'relative', marginRight: '10px', marginBottom: '10px' }}>
              <img
                src={image.image}
                alt={`Recap Image ${image.id}`}
                style={{ maxWidth: '300px', borderRadius: '5px', marginBottom: '5px', cursor: 'pointer' }}
                onClick={() => handleImageClick(image)}
              />
              <IconButton
                style={{ position: 'absolute', top: '5px', right: '5px', backgroundColor: 'white' }}
                onClick={() => handleRecapImageClear(image.id)}
              >
                <CloseIcon />
              </IconButton>
            </div>
          ))}
        </div>
        {fullscreenImage && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onClick={handleCloseFullscreen}
          >
            <div style={{ padding: '20px' }} onClick={(e) => e.stopPropagation()}>
              <img src={fullscreenImage.image} alt={`Recap Image ${fullscreenImage.id}`} style={{ objectFit: 'contain', height: '700px'}} />
            </div>
          </div>
        )}
        <DeleteConfirmationDialog
          isOpen={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          onDeleteConfirmation={handleDeleteConfirmation}
          name={`this recap image`}
          objectName="image"
        />
      </Box>
  );
};

export default GalleryPage;
