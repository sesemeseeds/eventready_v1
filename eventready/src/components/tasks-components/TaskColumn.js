import React, { useState, useEffect } from "react";
import TaskCard from "./TaskCard";
import { Droppable } from "react-beautiful-dnd";
import { Container } from "@mui/material";
import { useParams } from "react-router-dom";
import AddTaskDialog from "./AddTaskDialog";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import AxiosInstance from "../Axios";
import "../../styles/Tasks.css";

export default function TaskColumn({ title, tasks, columnId, refreshTasks }) {
  const [addDialogOpen, setAddDialogOpen] = React.useState(false);
  const [allGoals, setAllGoals] = useState([]);
  const MyParam = useParams();
  const eventId = MyParam.id;

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
                goals={allGoals}
              />
            ))}
            {provided.placeholder}

            <AddTaskDialog
              open={addDialogOpen}
              onClose={() => setAddDialogOpen(false)}
              refreshTasks={refreshTasks}
              eventId={eventId}
              columnId={columnId}
              goals={allGoals}
            />
          </div>
        )}
      </Droppable>
    </Container>
  );
}
