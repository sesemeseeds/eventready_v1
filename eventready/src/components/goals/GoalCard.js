import { useState } from 'react';

import { Card, CardContent, Typography, Tooltip, IconButton, Dialog, DialogTitle, DialogContent, Button, DialogActions } from '@mui/material';

import AxiosInstance from "../Axios";

import DeleteIcon from '@mui/icons-material/Delete';
import ProgressDonut from './ProgressDonut';
import DescriptionDialog from '../dialog/DescriptionDialog';
import DeleteConfirmationDialog from '../dialog/DeleteConfirmationDialog';
import EditDueDateDialog from '../dialog/EditDueDateDialog';
import TruncateText from '../util/TruncateText';
import FormatDate from '../util/FormatDate';


const GoalCard = ({ eventId, goal, handleDeleteGoal }) => {
    const [goalName, setGoalName] = useState('');
    const [goalDueDate, setGoalDueDate] = useState('');
    const [goalDescription, setGoalDescription] = useState('');
    const [openDescriptionDialog, setOpenDescriptionDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [goalToDelete, setGoalToDelete] = useState(null);
    const [openEditDueDateDialog, setOpenEditDueDateDialog] = useState(false);
    const [newDueDate, setNewDueDate] = useState('');
    
    const MAX_DESCRIPTION_LENGTH = 100;

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

    const handleOpenDeleteDialog = (goal) => {
        setGoalToDelete(goal.id);
        setOpenDeleteDialog(true);
    };

    const handleDeleteConfirmation = (goal) => {
        handleDeleteGoal(goal.id);
        setOpenDeleteDialog(false);
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
        setGoalToDelete(null);
    };

    const handleOpenEditDueDateDialog = () => {
        setOpenEditDueDateDialog(true);
    };

    const handleCloseEditDueDateDialog = () => {
        setOpenEditDueDateDialog(false);
    };

    const handleSaveDueDate = (newDueDate) => {
        AxiosInstance.patch(`/goals/${goal.id}/`, { due_date: newDueDate })
            .then(response => {
                console.log("Due date updated successfully:", response.data);
                // You might want to update the state or reload data here
                handleCloseEditDueDateDialog();
            })
            .catch(error => {
                console.error("Error updating due date:", error);
                // Handle error
            });
    };
    return (
        <Card sx={{ width: "250px", height: "250px" }}>
            <CardContent sx={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: "100%" }}>
                <Tooltip title="Delete Goal">
                    <IconButton
                        sx={{ position: 'absolute', top: '8px', right: '8px', cursor: 'pointer' }}
                        onClick={() => handleOpenDeleteDialog(goal)}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
                <ProgressDonut value={goal.progress} eventId={eventId} goalId={goal.id} />
                <Typography variant="h7" component="div" sx={{ fontWeight: 'bold', textAlign: 'center', paddingTop: '10px' }}>
                {goal.name}
                </Typography>
                <Tooltip title="View/Edit Description">
                    <Typography variant="caption" component="div" sx={{ textAlign: 'center', paddingTop: '5px', cursor: 'pointer' }} onClick={() => handleDescriptionClick(goal.id)}>
                        <TruncateText text={goal.description} maxLength={MAX_DESCRIPTION_LENGTH}/>
                    </Typography>
                </Tooltip>
                <Tooltip title="Edit Due Date">
                    <Typography variant="caption" sx={{ position: 'absolute', bottom: '8px', right: '8px', cursor: 'pointer' }} onClick={handleOpenEditDueDateDialog}>
                        due: {FormatDate(goal.due_date, 'MM/DD/YY')}
                    </Typography>
                </Tooltip>
            </CardContent>
            <DescriptionDialog
                    isOpen={openDescriptionDialog && goal != null}
                    onClose={handleCloseDialog}
                    description={goal && goal.description}
                    onEditClick={handleEditClick}
            />
            <DeleteConfirmationDialog
                isOpen={openDeleteDialog && goalToDelete === goal.id}
                onClose={handleCloseDeleteDialog}
                onDeleteConfirmation={() => handleDeleteConfirmation(goal)}
                name={goal && goal.name}
                objectName={"goal"}
            />
            <EditDueDateDialog
                isOpen={openEditDueDateDialog}
                onClose={handleCloseEditDueDateDialog}
                onSave={handleSaveDueDate}
                currentDueDate={goal.due_date}
            />
        </Card>
    );
};

export default GoalCard;
