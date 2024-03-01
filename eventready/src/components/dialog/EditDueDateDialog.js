import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, DialogActions } from '@mui/material';
import FormatDate from '../util/FormatDate';

const EditDueDateDialog = ({ isOpen, onClose, currentDueDate, onSave }) => {
    const [newDueDate, setNewDueDate] = useState('');

    const handleSave = () => {
        onSave(newDueDate);
        setNewDueDate('');
    };

    const handleClose = () => {
        setNewDueDate('');
        onClose();
    };

    return (
        <Dialog open={isOpen} onClose={handleClose}>
            <DialogTitle>Edit Due Date</DialogTitle>
            <DialogContent style={{ width: "300px", paddingTop: "10px" }}>
                <TextField
                    label="New Due Date (MM/DD/YY)"
                    type="text"
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                    fullWidth
                />
                {currentDueDate && (
                    <p>Current Due Date: {FormatDate(currentDueDate, 'MM/DD/YY')}</p>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSave} disabled={!newDueDate}>Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditDueDateDialog;
