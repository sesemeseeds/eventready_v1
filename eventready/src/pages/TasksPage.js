import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import TaskColumn from "../components/tasks-components/TaskColumn";
import AddTaskDialog from "../components/tasks-components/AddTaskDialog";
import "../styles/Tasks.css";
import { Box } from "@mui/material";
import AxiosInstance from "../components/Axios";
import { useParams } from "react-router-dom";
export default function TasksPage() {

  const [completed, setCompleted] = useState([]);
  const [inprogress, setInProgress] = useState([]);
  const [todo, setToDo] = useState([]);

  const MyParam = useParams();
  const MyId = MyParam.id;


const fetchTasksData = async () => {
  try {
    const response = await AxiosInstance.get(`tasks/?event=${MyId}`); 
    setToDo(response.data.filter((p) => p.status === "to_do"));
    setCompleted(response.data.filter((p) => p.status === "done"));
    setInProgress(response.data.filter((p) => p.status === "in_progress"));
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};

  useEffect(() => {
    fetchTasksData();
  }, []);

  const handleAddTask = async () => {
    fetchTasksData();
  };

  const handleDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      const columnTasks =
        source.droppableId === "1"
          ? todo
          : source.droppableId === "2"
          ? completed
          : inprogress;
      const reorderedTasks = Array.from(columnTasks);
      const [reorderedItem] = reorderedTasks.splice(source.index, 1);
      reorderedTasks.splice(destination.index, 0, reorderedItem);

      switch (source.droppableId) {
        case "1": // TO DO
          setToDo(reorderedTasks);
          break;
        case "2": // DONE
          setCompleted(reorderedTasks);
          break;
        case "3": // IN PROGRESS
          setInProgress(reorderedTasks);
          break;
        default:
          break;
      }
      return;
    }

    deletePreviousState(source.droppableId, draggableId);

    const task = findItemById(draggableId, [
      ...todo,
      ...completed,
      ...inprogress,
    ]);

    switch (destination.droppableId) {
      case "1": 
        task.status = "to_do";
        setToDo((prevToDo) => {
          const newToDo = Array.from(prevToDo);
          newToDo.splice(destination.index, 0, task);
          return newToDo;
        });
        await AxiosInstance.patch(`tasks/${draggableId}/`, { status: "to_do" });
        break;
      case "2": 
        task.status = "done";
        setCompleted((prevCompleted) => {
          const newCompleted = Array.from(prevCompleted);
          newCompleted.splice(destination.index, 0, task);
          return newCompleted;
        });
        await AxiosInstance.patch(`tasks/${draggableId}/`, { status: "done" });
        break;
      case "3": 
        task.status = "in_progress";
        setInProgress((prevBacklog) => {
          const newBacklog = Array.from(prevBacklog);
          newBacklog.splice(destination.index, 0, task);
          return newBacklog;
        });
        await AxiosInstance.patch(`tasks/${draggableId}/`, {
          status: "in_progress",
        });
        break;
      default:
        break;
    }
  };

  function deletePreviousState(sourceDroppableId, taskId) {
    switch (sourceDroppableId) {
      case "1":
        setToDo(removeItemById(taskId, todo));
        break;
      case "2":
        setCompleted(removeItemById(taskId, completed));
        break;
      case "3":
        setInProgress(removeItemById(taskId, inprogress));
        break;
    }
  }

  function findItemById(id, array) {
    return array.find((item) => item.id == id);
  }

  function removeItemById(id, array) {
    return array.filter((item) => item.id != id);
  }

  return (
    <Box className="task-board-container">
      <DragDropContext onDragEnd={handleDragEnd}>
        <h2 style={{ textAlign: "center" }}>TASK BOARD</h2>

        <div className="task-board">
          <TaskColumn title={"TO DO"} tasks={todo} columnId={"1"} addTask={handleAddTask} />
          <TaskColumn title={"IN PROGRESS"} tasks={inprogress} columnId={"3"} addTask={handleAddTask} />
          <TaskColumn title={"DONE"} tasks={completed} columnId={"2"} addTask={handleAddTask} />
        </div>
      </DragDropContext>
    </Box>
  );
}
