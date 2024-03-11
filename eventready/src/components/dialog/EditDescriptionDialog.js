import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Button, DialogActions, TextField, Paper } from '@mui/material';

const EditDescriptionDialog = ({ isOpen, onClose, onSave, initialDescription }) => {
  const [editedDescription, setEditedDescription] = useState(initialDescription || '');

  const handleSave = () => {
    onSave(editedDescription);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
        <Paper sx={{ width: 500, height: 500 }}>
            <DialogTitle>Edit Description</DialogTitle>
            <DialogContent style={{paddingTop: '10px'}}>
                <TextField
                multiline
                rows={15}
                fullWidth
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                label="Description"
                />
            </DialogContent>
            <DialogActions style={{ position: 'absolute', bottom: 0, right: 0 }}>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
            </DialogActions>
        </Paper>
    </Dialog>
  );
};

export default EditDescriptionDialog;
