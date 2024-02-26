import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import AxiosInstance from "../components/Axios";

import { Card, CardContent, CardMedia, Typography, Dialog, DialogTitle, DialogContent, Button, Grid, DialogActions, Tooltip, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import ProgressDonut from '../components/goals/ProgressDonut'

const GoalsPage = () => {
  const [allGoals, setAllGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [goalName, setGoalName] = useState(String);
  const [goalDueDate, setGoalDueDate] = useState(String);
  const [goalDescription, setGoalDescription] = useState(String);
  const [openDescriptionDialog, setOpenDescriptionDialog] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedGoalToDelete, setSelectedGoalToDelete] = useState(null);
  
  const MyParam = useParams();
  const eventId = MyParam.id;
  const MAX_DESCRIPTION_LENGTH = 100;

  useEffect(() => {
    const getAllGoals = async () => {
      try {
        const response = await AxiosInstance.get(`goals/?event_id=${eventId}`);
        const goalData = response.data;
        if (!goalData) {
            setAllGoals([]);
        } else {
            setAllGoals(goalData);
        }
      } catch (error) {
        console.error("Error fetching event goals:", error);
      }
    };

    getAllGoals();
  }, [eventId]);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear() % 100;

    const formattedDate = `${month}/${day}/${year}`;
  
    return formattedDate;
  }

  const TruncateDescription = ({ description }) => {
    if (description.length > MAX_DESCRIPTION_LENGTH) {
      return `${description.substring(0, MAX_DESCRIPTION_LENGTH)}...`;
    }
    return description;
  };

  const handleDescriptionClick = (goalId) => {
    setOpenDescriptionDialog(true);
    const selectedGoal = allGoals.find(goal => goal.id === goalId);
    setSelectedGoal(selectedGoal);
  };

  const handleCloseDialog = () => {
    setOpenDescriptionDialog(false);
  };

  const handleEditClick = () => {
    // TODO: edit functionality of description
    console.log("Editing goal:", selectedGoal);
  };

  const handleEditDueDateClick = () => {
    // TODO: edit functionality of due date
    console.log("Editing due date for goal:", selectedGoal);
  };

  const handleOpenDeleteDialog = (goalId) => {
    setSelectedGoalToDelete(goalId);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirmation = () => {
    // TODO: delete dialog confirmation
    setOpenDeleteDialog(false);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleDeleteGoal = (goalId) => {
    console.log("Deleting goal:", goalId);
  };

  return (
    <div>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="stretch"
        rowSpacing={4}
        columnSpacing={3}
        sx={{ width: '100%', margin: 0 }}
      >
        {allGoals &&
          allGoals.map((goal) => (
            <Grid item key={goal.id}>
              <Card sx={{ width: "300px", height: "300px" }}>
                <CardContent sx={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: "100%" }}>
                  <Tooltip title="Delete Goal">
                      <IconButton
                        sx={{ position: 'absolute', top: '8px', right: '8px', cursor: 'pointer' }}
                        onClick={() => handleDeleteGoal(goal.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                  </Tooltip>
                  <ProgressDonut value={goal.progress}/>
                  <Typography variant="h7" component="div" sx={{ fontWeight: 'bold', textAlign: 'center', paddingTop: '10px' }}>
                    {goal.name}
                  </Typography>
                  <Tooltip title="View/Edit Description">
                    <Typography variant="caption" component="div" sx={{ textAlign: 'center', paddingTop: '5px', cursor: 'pointer' }} onClick={() => handleDescriptionClick(goal.id)}>
                      <TruncateDescription description={goal.description}/>
                    </Typography>
                  </Tooltip>
                  <Tooltip title="Edit Due Date">
                    <Typography variant="caption" sx={{ position: 'absolute', bottom: '8px', right: '8px', cursor: 'pointer' }} onClick={() => handleEditDueDateClick(goal.id)}>
                      due: {formatDate(goal.due_date)}
                    </Typography>
                  </Tooltip>
                </CardContent>
              </Card>
              <Dialog open={openDescriptionDialog && selectedGoal && selectedGoal.id === goal.id} onClose={handleCloseDialog}>
                <DialogTitle>Description</DialogTitle>
                <DialogContent>
                  <Typography>{selectedGoal && selectedGoal.description}</Typography>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'flex-end', paddingRight: '24px', paddingBottom: '24px' }}>
                  <Button onClick={handleEditClick}>Edit</Button>
                </DialogActions>
              </Dialog>
              <Dialog open={openDeleteDialog && selectedGoal && selectedGoal.id === goal.id} onClose={handleCloseDeleteDialog}>
                <DialogTitle>Delete Goal</DialogTitle>
                <DialogContent>
                  <Typography>{`Are you sure you want to delete "${selectedGoal && selectedGoal.name}" goal?`}</Typography>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'flex-end', paddingRight: '24px', paddingBottom: '24px' }}>
                  <Button onClick={handleDeleteConfirmation}>Delete</Button>
                  <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
                </DialogActions>
              </Dialog>
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

export default GoalsPage;