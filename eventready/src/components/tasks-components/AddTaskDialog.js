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
import { Box } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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
  const [completionDate, setCompletionDate] = useState(null);
  const [deadlineDate, setDeadlineDate] = useState(null);
  const [assignedTo, setAssignedTo] = useState("");

  const handleSubmit = async () => {
    if (!title.trim()) {
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
      assigned_to: assignedTo,
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
      await AxiosInstance.post("tasks/", newTask);
      refreshTasks();
      setTitle("");
      setDescription("");
      setPriority(5);
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
    setPriority(5);
    setCompletionDate(null);
    setDeadlineDate(null);
    setAssignedTo("");
    onClose();
  };

  return (
    <Dialog maxWidth="md" open={open} onClose={handleClose}>
      <DialogTitle>
        {" "}
        <TextField
          autoFocus
          required="true"
          margin="dense"
          label="Task Name"
          type="text"
          variant="outlined"
          fullWidth
          value={title}
          InputLabelProps={{ shrink: true, style: { fontSize: 15 } }}
          inputProps={{ style: { fontSize: 18, fontWeight: 600 } }}
          onChange={(e) => setTitle(e.target.value)}
        />
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", height: 325, width: 700 }}>
          {" "}
          <Box sx={{ width: "70%", marginRight: "25px" }}>
            <ReactQuill
              theme="snow"
              value={description}
              onChange={setDescription}
              placeholder="Enter your description here!"
              style={{ marginTop: 8, marginBottom: 16, height: 250 }}
            />
          </Box>
          <Box sx={{ width: "30%" }}>
            <TextField
              margin="dense"
              label="Assigned To"
              type="text"
              variant="outlined"
              fullWidth
              value={assignedTo}
              InputLabelProps={{ shrink: true, required: false }}
              style={{ paddingBottom: 10 }}
              onChange={(e) => setAssignedTo(e.target.value)}
            />
            <FormControl
              style={{ paddingBottom: 10 }}
              fullWidth
              variant="outlined"
            >
              <InputLabel>Priority</InputLabel>
              <Select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                {[...Array(10).keys()].map((value) => (
                  <MenuItem key={value + 1} value={value + 1}>
                    {value + 1}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              label="Completion Date"
              type="date"
              format="mm/dd/yyyy"
              variant="outlined"
              fullWidth
              style={{ paddingBottom: 10 }}
              value={completionDate}
              InputLabelProps={{ shrink: true, required: false }}
              onChange={(e) => setCompletionDate(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Deadline Date"
              type="date"
              variant="outlined"
              format="mm/dd/yyyy"
              fullWidth
              value={deadlineDate}
              InputLabelProps={{ shrink: true, required: false }}
              onChange={(e) => setDeadlineDate(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Associated Goal"
              type="Text"
              variant="outlined"
              fullWidth
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions style={{ backgroundColor: "#009CDF" }}>
        <Button variant="contained" onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit} color="primary">
          Add Task
        </Button>
      </DialogActions>
    </Dialog>
  );
}
