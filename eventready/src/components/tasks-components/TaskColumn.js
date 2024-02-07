import React from "react";
// import styled from "styled-components";
import TaskCard from "./TaskCard";
// import "./scroll.css";
import { Droppable } from "react-beautiful-dnd";
import { Container } from "@mui/material";



export default function TaskColumn({ title, tasks, id }) {
  return (
    <Container className="tasks-column">
      <div className="tasks-column-title"

      >
        {title}
      </div>
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {tasks.map((task, index) => (
              <TaskCard key={index} index={index} task={task} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Container>
  );
}