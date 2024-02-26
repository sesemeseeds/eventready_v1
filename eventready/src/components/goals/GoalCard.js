import { useState } from 'react';

import { Card, CardContent, Typography, Tooltip, IconButton, Dialog, DialogTitle, DialogContent, Button, DialogActions } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import ProgressDonut from './ProgressDonut';

const GoalCard = ({ goal }) => {
    const [goalName, setGoalName] = useState('');
    const [goalDueDate, setGoalDueDate] = useState('');
    const [goalDescription, setGoalDescription] = useState('');
    const [openDescriptionDialog, setOpenDescriptionDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [goalToDelete, setGoalToDelete] = useState(null);
    
    const MAX_DESCRIPTION_LENGTH = 100;

    const TruncateDescription = ({ description }) => {
        if (description.length > MAX_DESCRIPTION_LENGTH) {
        return `${description.substring(0, MAX_DESCRIPTION_LENGTH)}...`;
        }
        return description;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const year = date.getFullYear() % 100;
        const formattedDate = `${month}/${day}/${year}`;
        return formattedDate;
    };

    const handleDescriptionClick = () => {
        setOpenDescriptionDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDescriptionDialog(false);
    };

    const handleEditClick = () => {
        // TODO: edit functionality of description
        console.log("Editing goal:", goal);
    };

    const handleEditDueDateClick = () => {
        // TODO: edit functionality of due date
        console.log("Editing due date for goal:", goal);
    };

    const handleOpenDeleteDialog = (goal) => {
        setGoalToDelete(goal.id);
        setOpenDeleteDialog(true);
    };

    const handleDeleteConfirmation = () => {
        console.log("Deleting goal:", goalToDelete);
        setOpenDeleteDialog(false);
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
        setGoalToDelete(null);
    };

    return (
        <Card sx={{ width: "300px", height: "300px" }}>
            <CardContent sx={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: "100%" }}>
                <Tooltip title="Delete Goal">
                    <IconButton
                        sx={{ position: 'absolute', top: '8px', right: '8px', cursor: 'pointer' }}
                        onClick={() => handleOpenDeleteDialog(goal)}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
                <ProgressDonut value={goal.progress} />
                <Typography variant="h7" component="div" sx={{ fontWeight: 'bold', textAlign: 'center', paddingTop: '10px' }}>
                {goal.name}
                </Typography>
                <Tooltip title="View/Edit Description">
                    <Typography variant="caption" component="div" sx={{ textAlign: 'center', paddingTop: '5px', cursor: 'pointer' }} onClick={() => handleDescriptionClick(goal.id)}>
                        <TruncateDescription description={goal.description} />
                    </Typography>
                </Tooltip>
                <Tooltip title="Edit Due Date">
                    <Typography variant="caption" sx={{ position: 'absolute', bottom: '8px', right: '8px', cursor: 'pointer' }} onClick={() => handleEditDueDateClick(goal.id)}>
                        due: {formatDate(goal.due_date)}
                    </Typography>
                </Tooltip>
            </CardContent>
            <Dialog open={openDescriptionDialog && goal != null} onClose={handleCloseDialog}>
                <DialogTitle>Description</DialogTitle>
                <DialogContent>
                    <Typography>{goal && goal.description}</Typography>
                </DialogContent>
                <Dialog open={openDescriptionDialog && goal != null} onClose={handleCloseDialog}>
                    <DialogTitle>Description</DialogTitle>
                    <DialogContent>
                        <Typography>{goal && goal.description}</Typography>
                    </DialogContent>
                    <DialogActions sx={{ justifyContent: 'flex-end', paddingRight: '24px', paddingBottom: '24px' }}>
                        <Button onClick={handleCloseDialog}>Cancel</Button>
                        <Button onClick={handleEditClick}>Edit</Button>
                    </DialogActions>
                </Dialog>
            </Dialog>
            <Dialog open={openDeleteDialog && goalToDelete === goal.id} onClose={handleCloseDeleteDialog}>
                <DialogTitle>Delete Goal</DialogTitle>
                <DialogContent>
                    <Typography>{`Are you sure you want to delete "${goal && goal.name}" goal?`}</Typography>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'flex-end', paddingRight: '24px', paddingBottom: '24px' }}>
                    <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
                    <Button onClick={handleDeleteConfirmation}>Delete</Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
};

export default GoalCard;
