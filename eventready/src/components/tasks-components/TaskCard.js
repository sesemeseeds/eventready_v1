import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Container } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import "../../styles/Tasks.css";


export default function TaskCard({ task, index }) {
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
            <div>{task.title}</div>
            
          </div>
          <div>{task.description}</div>
          <div>{task.status}</div>
          <div>{task.priority}</div>
          {/* <Card sx={{ boxShadow: 3, width: 300 }}>
            <CardContent>   
              <Typography gutterBottom variant="h5" component="div">
              {task.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
              #{task.id}
              </Typography>
            </CardContent>
          </Card> */}

          {provided.placeholder}
        </Container>
      )}
    </Draggable>
  );
}
