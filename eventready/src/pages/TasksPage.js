import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import TaskColumn from "../components/tasks-components/TaskColumn";


export default function TasksPage() {
   const cards = [{
    "id": 1,
    "title": "Campaigns",
    "order": 0,
    "description": "Create a new landing page for campaign",
    "status": "todo",
    "priority": {
      "color": "orange",
      "priority": "Urgent"
    },

  }, {
    "id": 2,
    "title": "Newsletters",
    "order": 2,
    "description": "Send newsletter",
    "status": "todo",
    "priority": {
      "color": "orange",
      "priority": "Urgent"
    },

  }, {
    "id": 3,
    "title": "Ads Analytics",
    "order": 1,
    "description": "Review ads performance",
    "status": "todo",
    "priority": {
      "color": "orange",
      "priority": "Urgent"
    },
  }, 
];
  const [completed, setCompleted] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => {
        setCompleted(json.filter((task) => task.completed));
        setIncomplete(json.filter((task) => !task.completed));
      });
  }, []);

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (source.droppableId == destination.droppableId) return;

    //REMOVE FROM SOURCE ARRAY

    if (source.droppableId == 2) {
      setCompleted(removeItemById(draggableId, completed));
    } else {
      setIncomplete(removeItemById(draggableId, incomplete));
    }

    // GET ITEM

    const task = findItemById(draggableId, [...incomplete, ...completed]);

    //ADD ITEM
    if (destination.droppableId == 2) {
      setCompleted([{ ...task, completed: !task.completed }, ...completed]);
    } else {
      setIncomplete([{ ...task, completed: !task.completed }, ...incomplete]);
    }
  };

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
        <TaskColumn title={"TO DO"} tasks={incomplete} id={"1"} />
        <TaskColumn title={"DONE"} tasks={completed} id={"2"} />
        <TaskColumn title={"BACKLOG"} tasks={[]} id={"3"} />
      </div>
    </DragDropContext>
  );
}