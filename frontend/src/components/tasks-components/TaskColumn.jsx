import React from "react";
import TaskCard from "./TaskCard";
import { Droppable } from "react-beautiful-dnd";
import { Container } from "@mui/material";
import { useParams } from "react-router-dom";
import AddTaskDialog from "./AddTaskDialog";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import "../../styles/Tasks.css";

export default function TaskColumn({ title, tasks, columnId, refreshTasks }) {
  const [addDialogOpen, setAddDialogOpen] = React.useState(false);

  const MyParam = useParams();
  const MyId = MyParam.id;

  return (
    <Container className="tasks-column">
      <div className="tasks-column-title">
        <div>{title}</div>

        <Tooltip title="Add Task">
          <IconButton className="add-task-button" color="inherit">
            <AddIcon onClick={() => setAddDialogOpen(true)} />
          </IconButton>
        </Tooltip>
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
              <TaskCard
                key={index}
                index={index}
                task={task}
                refreshTasks={refreshTasks}
              />
            ))}
            {provided.placeholder}

            <AddTaskDialog
              open={addDialogOpen}
              onClose={() => setAddDialogOpen(false)}
              refreshTasks={refreshTasks}
              eventId={MyId}
              columnId={columnId}
            />
          </div>
        )}
      </Droppable>
    </Container>
  );
}
