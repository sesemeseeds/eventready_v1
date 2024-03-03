import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Box, Container } from "@mui/material";
import "../../styles/Tasks.css";
import EditTaskDialog from "./EditTaskDialog";
import AxiosInstance from "../Axios";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

export default function TaskCard({ task, index, refreshTasks }) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const openEditDialog = () => {
    setEditDialogOpen(true);
  };

  const closeEditDialog = () => {
    setEditDialogOpen(false);
  };

  const openDeleteDialog = () => {
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const handleDelete = async () => {
    try {
      await AxiosInstance.delete(`tasks/${task.id}/`);
      closeDeleteDialog();
      refreshTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "To Do":
        return "#FDD835"; // Yellow
      case "In Progress":
        return "#2196F3"; // Blue
      case "Done":
        return "#4CAF50"; // Green
      default:
        return "#FFFFFF"; 
    }
  };

  const getPriorityColor = (priority) => {
    switch (true) {
      case priority >= 1 && priority <= 3:
        return "#B2EBF2"; // Light Blue 
      case priority >= 4 && priority <= 7:
        return "#FFCC80"; // Light Orange 
      case priority >= 8 && priority <= 10:
        return "#EF9A9A"; // Light Red 
      default:
        return "#FFFFFF"; 
    }
  };

  const getPriorityLabel = (priority) => {
    switch (true) {
      case priority >= 1 && priority <= 3:
        return "Low";
      case priority >= 4 && priority <= 7:
        return "Medium";
      case priority >= 8 && priority <= 10:
        return "High";
      default:
        return "Unknown";
    }
  };

  return (
    <Draggable draggableId={`${task.id}`} key={task.id} index={index}>
      {(provided, snapshot) => (
        <Container
          className="tasks-card-container"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <div style={{ display: "flex", justifyContent: "start", padding: 2 }}>
            <span>
              <small>
                #{task.id}
                {"  "}
              </small>
            </span>
          </div>
          <div style={{ display: "flex", padding: 2 }}>
            <div style={{ fontWeight: "bold" }}>{task.title}</div>
            
          </div>
          <div>{task.description}</div>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <Box
              sx={{
                width: "50%",
                display: "flex",
              }}
            >
              <Box sx={{ backgroundColor: getStatusColor(task.status), marginRight: "20px", padding: "0 5px 0 5px", borderRadius: "5px"}}>
                {task.status}
              </Box>
              <Box sx={{ backgroundColor: getPriorityColor(task.priority), padding: "0 5px 0 5px", borderRadius: "5px" }}>
                {getPriorityLabel(task.priority)}
              </Box>
            </Box>

            <Box sx={{ display: "flex" }}>
              <Tooltip title="Edit Task">
                <IconButton size="small" className="" color="inherit">
                  <EditIcon onClick={openEditDialog} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete Task">
                <IconButton size="small" className="" color="inherit">
                  <DeleteIcon onClick={openDeleteDialog} />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          <EditTaskDialog
            open={editDialogOpen}
            onClose={closeEditDialog}
            task={task}
            refreshTasks={refreshTasks}
          />
          <Dialog open={deleteDialogOpen} onClose={closeDeleteDialog}>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
              Are you sure you want to delete this task?
            </DialogContent>
            <DialogActions>
              <Button onClick={closeDeleteDialog}>Cancel</Button>
              <Button onClick={handleDelete} variant="contained">
                Delete
              </Button>
            </DialogActions>
          </Dialog>
          {provided.placeholder}
        </Container>
      )}
    </Draggable>
  );
}
