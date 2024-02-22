import React from "react";
import TaskCard from "./TaskCard";
import { Droppable } from "react-beautiful-dnd";
import { Container } from "@mui/material";
import { useParams } from "react-router-dom";
import AddTaskDialog from "./AddTaskDialog";

export default function TaskColumn({ title, tasks, columnId, addTask }) {
  const [addDialogOpen, setAddDialogOpen] = React.useState(false);

  const MyParam = useParams();
  const MyId = MyParam.id;

  return (
    <Container className="tasks-column">
      <div className="tasks-column-title">
        <div>{title}</div>
        <button variant="contained" onClick={() => setAddDialogOpen(true)}>
          Add Task
        </button>
      </div>
      <Droppable droppableId={columnId}>
        {(provided, snapshot) => (
          <div
            className="task-list"
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {tasks.map((task, index) => (
              <TaskCard key={index} index={index} task={task} />
            ))}
            {provided.placeholder}

            <AddTaskDialog
              open={addDialogOpen}
              onClose={() => setAddDialogOpen(false)}
              addTask={addTask}
              eventId={MyId}
              columnId={columnId}
            />
          </div>
        )}
      </Droppable>
    </Container>
  );
}
