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
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Box } from "@mui/material";

export default function EditTaskDialog({
  open,
  onClose,
  task,
  refreshTasks,
  goals,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(5);
  const [completionDate, setCompletionDate] = useState(String);
  const [deadlineDate, setDeadlineDate] = useState(String);
  const [assignedTo, setAssignedTo] = useState("");
  const [goal, setGoal] = useState(null);

  useEffect(() => {
    if (open) {
      setTitle(task.title);
      setDescription(task.description);
      setPriority(task.priority);
      setCompletionDate(task.completion_date);
      setDeadlineDate(task.deadline_date);
      setAssignedTo(task.assigned_to);
      setGoal(task.goal);
    }
  }, [open, task]);

  const handleSubmit = async () => {
    if (!title.trim()) {
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
      assigned_to: assignedTo,
      goal: goal,
    };
    console.log(updatedTask);
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
    <Dialog maxWidth="md" backgr open={open} onClose={handleClose}>
      <DialogTitle style={{backgroundColor: "#13547a", color: "white" }}>
        {" "}

      </DialogTitle>
      <DialogContent>
      <TextField
          size="medium"
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
        <Box sx={{ display: "flex", height: 325, width: 700 }}>
          {" "}
          <Box sx={{ width: "70%", marginRight: "25px" }}>
            <ReactQuill
              theme="snow"
              value={description}
              onChange={setDescription}
              placeholder="Enter your description here!"
              style={{ marginTop: 8, marginBottom: 16, height: 258 }}
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
                label="Priority"
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
              style={{ paddingBottom: 10 }}
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
            <FormControl fullWidth variant="outlined">
              <InputLabel shrink={true}>Associated Goal</InputLabel>
              <Select
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                label="Associated Goal"
                notched={true}
              >
                {goals.map((goal) => (
                  <MenuItem key={goal.id} value={goal.id}>
                    {goal.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions >
        <Button  onClick={handleClose} >
          Cancel
        </Button>
        <Button variant="contained"  style={{backgroundColor: "#13547a", color: "white" }} onClick={handleSubmit} >
          Edit Task
        </Button>
      </DialogActions>
    </Dialog>
  );
}
