import React from 'react';
import { Dialog, DialogTitle, DialogContent, Button, DialogActions, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TruncateText from '../util/TruncateText';


const DeleteConfirmationDialog = ({ isOpen, onClose, onDeleteConfirmation, name, objectName }) => {
    const MAX_NAME_LENGTH = 32;

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>
                Delete {objectName.charAt(0).toUpperCase() + objectName.slice(1)}
                <IconButton sx={{ position: 'absolute', top: '8px', right: '8px' }} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Typography>Are you sure you want to delete 
                    <TruncateText text={' ' + name} maxLength={MAX_NAME_LENGTH}/>?
                </Typography>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'flex-end', paddingRight: '24px', paddingBottom: '24px' }}>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={onDeleteConfirmation}>Delete</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteConfirmationDialog;