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
  const [priority, setPriority] = useState(5); 
  const [completionDate, setCompletionDate] = useState(String);
  const [deadlineDate, setDeadlineDate] = useState(String);
  const [assignedTo, setAssignedTo] = useState("");

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim()) {
      return;
    }

    const newTask = {
      event_id: eventId,
      title,
      description,
      status: "",
      priority,
      completion_date: completionDate,
      deadline_date: deadlineDate,
      assigned_to: assignedTo
    };

    switch (columnId) {
      case "1":
        newTask.status = "To Do";
        break;
      case "2":
        newTask.status = "Done";
        break;
      case "3":
        newTask.status = "In Progress";
        break;
      default:
        break;
    }

    try {
      console.log(newTask)
      await AxiosInstance.post("tasks/", newTask);
      refreshTasks();
      setTitle("");
      setDescription("");
      setPriority(5); // Reset priority to default
      setCompletionDate(null);
      setDeadlineDate(null);
      setAssignedTo("");
      onClose();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleClose = () => {
    setTitle("");
    setDescription("");
    setPriority(5); // Reset priority to default
    setCompletionDate(null);
    setDeadlineDate(null);
    setAssignedTo("");
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
            {[...Array(10).keys()].map((value) => (
              <MenuItem key={value + 1} value={value + 1}>{value + 1}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          margin="dense"
          label="Completion Date"
          type="date"
          format="mm/dd/yyyy"
          fullWidth
          value={completionDate}
          InputLabelProps={{ shrink: true, required: false }}
          onChange={(e) => setCompletionDate(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Deadline Date"
          type="date"
          fullWidth
          format="mm/dd/yyyy"
          value={deadlineDate}
          InputLabelProps={{ shrink: true, required: false }}
          onChange={(e) => setDeadlineDate(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Assigned To"
          type="text"
          fullWidth
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
        />
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
