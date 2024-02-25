import React, { useState } from 'react';
import { Draggable } from "react-beautiful-dnd";
import { Container } from "@mui/material";
import "../../styles/Tasks.css";
import EditTaskDialog from "./EditTaskDialog";


export default function TaskCard({ task, index, refreshTasks }) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const openEditDialog = () => {
    setEditDialogOpen(true);
  };

  const closeEditDialog = () => {
    setEditDialogOpen(false);
  };

  return (
    <Draggable draggableId={`${task.id}`} key={task.id} index={index}>
      {(provided, snapshot) => (
        <Container className="tasks-card-container"
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
            <div style={{fontWeight: "bold"}}>{task.title}</div>
            
          </div>
          <div>{task.description}</div>
          <div>{task.status}</div>
          <div>{task.priority}</div>
          <button onClick={openEditDialog}>edit</button>
          <button>delete</button>
          <EditTaskDialog
            open={editDialogOpen}
            onClose={closeEditDialog}
            task={task}
            refreshTasks={refreshTasks}
          />
          {provided.placeholder}
        </Container>
      )}
    </Draggable>
  );
}
