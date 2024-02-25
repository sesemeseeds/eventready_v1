import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Container } from "@mui/material";
import "../../styles/Tasks.css";
import EditTaskDialog from "./EditTaskDialog";
import AxiosInstance from "../Axios";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

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
          <div
            style={{ display: "flex", justifyContent: "center", padding: 2 }}
          >
            <div style={{ fontWeight: "bold" }}>{task.title}</div>
          </div>
          <div>{task.description}</div>
          <div>{task.status}</div>
          <div>{task.priority}</div>
          <button onClick={openEditDialog}>edit</button>
          <button onClick={openDeleteDialog}>delete</button>
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
