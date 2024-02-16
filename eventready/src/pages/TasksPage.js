import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import TaskColumn from "../components/tasks-components/TaskColumn";

export default function TasksPage() {
  const cards = [
    {
      id: 1,
      title: "Campaigns",
      description: "Create a new landing page for campaign",
      status: "todo",
      priority: "Urgent",
    },
    {
      id: 2,
      title: "Newsletters",
      description: "Send newsletter",
      status: "done",
      priority: "Urgent",
    },
    {
      id: 3,
      title: "Ads Analytics",
      description: "Review ads performance",
      status: "in progress",
      priority: "Urgent",
    },
  ];
  const [completed, setCompleted] = useState([]);
  const [inprogress, setInProgress] = useState([]);
  const [todo, setToDo] = useState([]);

  useEffect(() => {
    // fetch("https://jsonplaceholder.typicode.com/todos")
    // .then((response) => response.json())
    // .then((json) => {
    //     setCompleted(json.filter((task) => task.completed));
    //     setIncomplete(json.filter((task) => !task.completed));
    // });
    fetch(cards).then(() => {
      setToDo(cards.filter((p) => p.status === "todo"));
      setCompleted(cards.filter((p) => p.status === "done"));
      setInProgress(cards.filter((p) => p.status === "in progress"));
    });
  }, []);

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination ) return;

    if (source.droppableId === destination.droppableId) {
      const columnTasks = source.droppableId === "1" ? todo : source.droppableId === "2" ? completed : inprogress;
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
        case "3": // BACKLOG
          setInProgress(reorderedTasks);
          break;
        default:
          break;
      }
      return;
    }


    deletePreviousState(source.droppableId, draggableId);

    const task = findItemById(draggableId, [...todo, ...completed, ...inprogress]);

    switch (destination.droppableId) {
      case "1": // TO DO
        task.status = "todo";
        setToDo((prevToDo) => {
          const newToDo = Array.from(prevToDo);
          newToDo.splice(destination.index, 0, task);
          return newToDo;
        });
        break;
      case "2": // DONE
        task.status = "done";
        setCompleted((prevCompleted) => {
          const newCompleted = Array.from(prevCompleted);
          newCompleted.splice(destination.index, 0, task);
          return newCompleted;
        });
        break;
      case "3": // BACKLOG
        task.status = "in progress";
        setInProgress((prevBacklog) => {
          const newBacklog = Array.from(prevBacklog);
          newBacklog.splice(destination.index, 0, task);
          return newBacklog;
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
    <DragDropContext onDragEnd={handleDragEnd}>
      <h2 style={{ textAlign: "center" }}>PROGRESS BOARD</h2>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
             
        <TaskColumn title={"TO DO"} tasks={todo} id={"1"} />
        <TaskColumn title={"IN PROGRESS"} tasks={inprogress} id={"3"} />
        <TaskColumn title={"DONE"} tasks={completed} id={"2"} />


      </div>
    </DragDropContext>
  );
}
