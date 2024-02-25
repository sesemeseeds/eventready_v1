import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import AxiosInstance from "../Axios";

export default function AddTaskDialog({
  open,
  onClose,
  refreshTasks,
  eventId,
  columnId,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim() || !priority.trim()) {
      return;
    }

    const newTask = {
      event_id: eventId,
      title,
      description,
      status: "",
      priority,
    };

    switch (columnId) {
      case "1":
        newTask.status = "to_do";
        break;
      case "2":
        newTask.status = "done";
        break;
      case "3":
        newTask.status = "in_progress";
        break;
      default:
        break;
    }

    try {
      await AxiosInstance.post("tasks/", newTask);
      refreshTasks();
      setTitle("");
      setDescription("");
      setPriority("");
      onClose();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleClose = () => {
    setTitle("");
    setDescription("");
    setPriority("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Task</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Title"
          type="text"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Description"
          type="text"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <FormControl fullWidth>
          <InputLabel>Priority</InputLabel>
          <Select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <MenuItem value={"low"}>Low</MenuItem>
            <MenuItem value={"medium"}>Medium</MenuItem>
            <MenuItem value={"high"}>High</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Add Task
        </Button>
      </DialogActions>
    </Dialog>
  );
}
