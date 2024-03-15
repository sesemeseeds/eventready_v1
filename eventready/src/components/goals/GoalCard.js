import { useState } from 'react';

import { Card, CardContent, Typography, Tooltip, IconButton, Dialog, DialogTitle, DialogContent, Button, DialogActions } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import ProgressDonut from './ProgressDonut';
import DescriptionDialog from '../dialog/DescriptionDialog';
import DeleteConfirmationDialog from '../dialog/DeleteConfirmationDialog';
import TruncateText from '../util/TruncateText';
import FormatDate from '../util/FormatDate';
import AddEditGoalDialog from './AddEditGoalDialog';


const GoalCard = ({ eventId, goal, handleDeleteGoal, setAllGoals }) => {
    const [openDescriptionDialog, setOpenDescriptionDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [goalToDelete, setGoalToDelete] = useState(null);
    
    const MAX_DESCRIPTION_LENGTH = 108;
    const MAX_NAME_LENGTH = 32;

    const handleDescriptionClick = () => {
        setOpenDescriptionDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDescriptionDialog(false);
    };

    const handleEditGoal = () => {
        setOpenEditDialog(true);
    };

    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
    };

    const handleOpenDeleteDialog = (goal) => {
        setGoalToDelete(goal.id);
        setOpenDeleteDialog(true);
    };

    const handleDeleteConfirmation = (goal) => {
        console.log(goal);
        handleDeleteGoal(goal.id);
        setOpenDeleteDialog(false);
        window.location.reload();
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
        setGoalToDelete(null);
    };

    return (
        <Card sx={{ width: "250px", height: "250px" }}>
            <CardContent sx={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: "100%" }}>
                <Tooltip title="Edit Properties" placement='top'>
                    <IconButton
                        sx={{ position: 'absolute', top: '8px', right: '8px', cursor: 'pointer' }}
                        onClick={() => handleEditGoal(goal)}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete Goal">
                    <IconButton
                        sx={{ position: 'absolute', top: '48px', right: '8px', cursor: 'pointer' }}
                        onClick={() => handleOpenDeleteDialog(goal)}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
                <ProgressDonut value={goal.progress} eventId={eventId} goal={goal} />
                <Tooltip title="Expand Properties" onClick={() => handleDescriptionClick(goal.id)}>
                    <div>
                        <Typography variant="h7" component="div" sx={{ fontWeight: 'bold', textAlign: 'center', paddingTop: '10px', cursor: 'pointer' }}>
                            <TruncateText text={goal.name} maxLength={MAX_NAME_LENGTH}/>
                        </Typography>
                        <Typography variant="caption" component="div" sx={{ textAlign: 'center', paddingTop: '5px', cursor: 'pointer' }}>
                            <TruncateText text={goal.description} maxLength={MAX_DESCRIPTION_LENGTH}/>
                        </Typography>
                    </div>
                </Tooltip>
                <Typography variant="caption" sx={{ position: 'absolute', bottom: '8px', right: '8px'}}>
                    due: {FormatDate(goal.due_date, 'MM/DD/YYYY')}
                </Typography>
            </CardContent>
            <DescriptionDialog
                    isOpen={openDescriptionDialog && goal != null}
                    onClose={handleCloseDialog}
                    description={goal && goal.description}
                    title={goal && goal.name}
            />
            <AddEditGoalDialog
                isOpen={openEditDialog}
                onClose={handleCloseEditDialog}
                eventId={eventId}
                setAllGoals={setAllGoals}
                goal={goal}
            />
            <DeleteConfirmationDialog
                isOpen={openDeleteDialog && goalToDelete === goal.id}
                onClose={handleCloseDeleteDialog}
                onDeleteConfirmation={() => handleDeleteConfirmation(goal)}
                name={goal && goal.name}
                objectName={"goal"}
            />
        </Card>
    );
};

export default GoalCard;
