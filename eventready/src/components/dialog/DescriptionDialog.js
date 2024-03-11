import React from 'react';
import { Dialog, DialogTitle, DialogContent, Button, DialogActions, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const DescriptionDialog = ({ isOpen, onClose, onEditClick, description}) => {
    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>
                Description
                <IconButton sx={{ position: 'absolute', top: '8px', right: '8px' }} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Typography>{description}</Typography>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'flex-end', paddingRight: '24px', paddingBottom: '24px' }}>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={onEditClick}>Edit</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DescriptionDialog;
