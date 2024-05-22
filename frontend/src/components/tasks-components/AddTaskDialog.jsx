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
import { Box } from "@mui/material";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function AddTaskDialog({
  open,
  onClose,
  refreshTasks,
  eventId,
  columnId,
  goals,
  defaultGoal
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(5);
  const [completionDate, setCompletionDate] = useState(null);
  const [deadlineDate, setDeadlineDate] = useState(null);
  const [assignedTo, setAssignedTo] = useState("");
  const [selectedGoal, setSelectedGoal] = useState(null);

  useEffect(() => {
    if (defaultGoal) {
      setSelectedGoal(defaultGoal.id);
    }
  }, [defaultGoal]);

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
      goal: selectedGoal,
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
      setSelectedGoal(null);
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
    setSelectedGoal(null);
    onClose();
  };

  return (
    <Dialog maxWidth="md" open={open} onClose={handleClose}>
      <DialogTitle style={{backgroundColor: "#13547a", color: "white" }}>
        Add Task
      </DialogTitle>
      <DialogContent>
      <TextField
          autoFocus
          margin="dense"
          label="Task Name"
          type="text"
          variant="outlined"
          fullWidth
          value={title}
          InputLabelProps={{ shrink: true, required: true, style: { fontSize: 15 } }}
          inputProps={{ style: { fontSize: 18, fontWeight: 600 } }}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Box sx={{ display: "flex", height: 325, width: 700 }}>
          {" "}
          <Box sx={{ width: "70%", marginRight: "25px" }}>
          <CKEditor
              editor={ClassicEditor}
              data={description}
              onChange={(event, editor) => {
                const data = editor.getData();
                setDescription(data);
              }}
            />
          </Box>
          <Box sx={{ width: "30%" }}>
            <TextField
              margin="dense"
              label="Assigned To"
              type="text"
              variant="outlined"
              fullWidth
              value={assignedTo !== null ? assignedTo : ''}
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
                value={priority !== null ? priority : ''}
                onChange={(e) => setPriority(e.target.value)}
                label="Priority"
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
              value={completionDate !== null ? completionDate : ''}
              InputLabelProps={{ shrink: true }}
              required={false}
              onChange={(e) => {
                setCompletionDate(e.target.value || null);
              }}
            />

            <TextField
              margin="dense"
              label="Deadline Date"
              style={{ paddingBottom: 10 }}
              type="date"
              variant="outlined"
              format="mm/dd/yyyy"
              fullWidth
              value={deadlineDate !== null ? deadlineDate : ''}
              InputLabelProps={{ shrink: true }}
              required={false}
              onChange={(e) => {
                setDeadlineDate(e.target.value || null);
              }}
            />
            <FormControl fullWidth variant="outlined">
              <InputLabel shrink={true}>
                Associated Goal
              </InputLabel>
              {defaultGoal ? (
                  <Select
                  value={defaultGoal.id}
                  onChange={(e) => {
                    setSelectedGoal(e.target.value || null);
                  }}
                  label="Associated Goal"
                  notched={true}
                  disabled={true}
                >
                  <MenuItem key={defaultGoal.id} value={defaultGoal.id} selected>
                    {defaultGoal.name}
                  </MenuItem>
                </Select>
                ) : (
                <Select
                  value={selectedGoal !== null ? selectedGoal : ''}
                  onChange={(e) => {
                    setSelectedGoal(e.target.value || null);
                  }}
                  label="Associated Goal"
                  notched={true}
                >
                  {goals.map((goal) => (
                    <MenuItem key={goal.id} value={goal.id}>
                      {goal.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            </FormControl>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions >
        <Button  onClick={handleClose} >
          Cancel
        </Button>
        <Button  variant="contained"  style={{backgroundColor: "#13547a", color: "white" }} onClick={handleSubmit} >
          Add Task
        </Button>
      </DialogActions>
    </Dialog>
  );
}
