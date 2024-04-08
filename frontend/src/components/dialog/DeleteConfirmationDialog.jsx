import React from 'react';
import { Dialog, DialogTitle, DialogContent, Button, DialogActions, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { TruncateText } from '../util/TruncateText';



const DeleteConfirmationDialog = ({ isOpen, onClose, onDeleteConfirmation, name, objectName }) => {
    const MAX_NAME_LENGTH = 32;

    return (
        <Dialog open={isOpen} onClose={onClose} PaperProps={{ style: { borderRadius: '5px' } }}>
            <DialogTitle>
                Delete {objectName.charAt(0).toUpperCase() + objectName.slice(1)}
            </DialogTitle>
            <DialogContent>
                <Typography marginTop="15px" >Are you sure you want to delete 
                    <TruncateText text={' ' + name} maxLength={MAX_NAME_LENGTH}/>?
                </Typography>
            </DialogContent>
            <DialogActions >
                <Button  onClick={onClose}>Cancel</Button>
                <Button variant='contained' onClick={onDeleteConfirmation}>Delete</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteConfirmationDialog;