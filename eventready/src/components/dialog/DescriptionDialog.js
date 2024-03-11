import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Button, DialogActions, Typography, IconButton, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import EditDescriptionDialog from './EditDescriptionDialog';

const DescriptionDialog = ({ isOpen, onClose, onEditClick, description}) => {
    const [isEditDialogOpen, setEditDialogOpen] = useState(false);

    const handleEditClick = () => {
        onClose(); 
        setEditDialogOpen(true); 
    };

    const handleCloseEditDialog = () => {
        setEditDialogOpen(false); 
        onClose(); 
    };

    return (
        <>
        <Dialog open={isOpen} onClose={onClose}>
            <Paper sx={{ width: 500, height: 500 }}>
            <DialogTitle>
                View Description
                <IconButton sx={{ position: 'absolute', top: '8px', right: '8px' }} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Typography>{description}</Typography>
            </DialogContent>
            <DialogActions style={{ position: 'absolute', bottom: 0, right: 0 }}>
                <Button onClick={onClose}>Close</Button>
                <Button onClick={handleEditClick}>Edit</Button>
            </DialogActions>
            </Paper>
        </Dialog>
        <EditDescriptionDialog
            isOpen={isEditDialogOpen}
            onClose={handleCloseEditDialog}
            onSave={(editedDescription) => {
            onEditClick(editedDescription);
            handleCloseEditDialog();
            }}
            initialDescription={description}
        />
        </>
    );
};
export default DescriptionDialog;
