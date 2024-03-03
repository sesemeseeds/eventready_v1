import React, { useState, useEffect } from "react";
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

export default function EditTaskDialog({ open, onClose, task, refreshTasks }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(5); 
  const [completionDate, setCompletionDate] = useState(String);
  const [deadlineDate, setDeadlineDate] = useState(String);
  const [assignedTo, setAssignedTo] = useState("");

  useEffect(() => {
    if (open) {
      setTitle(task.title);
      setDescription(task.description);
      setPriority(task.priority);
      setCompletionDate(task.completion_date);
      setDeadlineDate(task.deadline_date);
      setAssignedTo(task.assigned_to);
    }
  }, [open, task]);

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim()) {
      return;
    }

    const updatedTask = {
      event_id: task.event_id,
      title,
      description,
      priority,
      status: task.status,
      completion_date: completionDate,
      deadline_date: deadlineDate,
      assigned_to: assignedTo
    };
    console.log(updatedTask)
    try {
      await AxiosInstance.put(`tasks/${task.id}/`, updatedTask);
      onClose();
      refreshTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Task</DialogTitle>
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
          type="Date"
          format="mm/dd/yyyy"
          fullWidth
          value={completionDate}
          InputLabelProps={{ shrink: true, required: false }}
          onChange={(e) => setCompletionDate(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Deadline Date"
          type="Date"
          format="mm/dd/yyyy"
          fullWidth
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
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
