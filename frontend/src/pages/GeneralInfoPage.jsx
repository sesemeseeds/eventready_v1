import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { Box, Container } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import "../styles/GeneralInfo.css";
import AttendanceCard from "../components/general-info-cards/AttendanceCard";
import GoalsCard from "../components/general-info-cards/GoalsCard";
import TaskCard from "../components/general-info-cards/TaskCard";
import BudgetCard from "../components/general-info-cards/BudgetCard";
import MarketingCard from "../components/general-info-cards/MarketingCard";
import AxiosInstance from "../components/Axios";
import { useParams } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import ReactQuill from "react-quill";

export default function GeneralInfoComponent() {
  const [open, setOpen] = React.useState(false);
  const [eventData, setEventData] = React.useState({
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    description: "",
  });
  const [loading, setLoading] = React.useState(true);

  const [goals, setGoals] = React.useState();
  const [tasks, setTasks] = React.useState();
  const [marketingPoster, setMarketingPoster] = React.useState();
  const [marketingReminder, setMarketingReminder] = React.useState();

  const MyParam = useParams();
  const MyId = MyParam.id;

  const StartTime = new Date(
    "1970-01-01T" + eventData.startTime + "Z"
  ).toLocaleTimeString("en-US", {
    timeZone: "UTC",
    hour12: true,
    hour: "numeric",
    minute: "numeric",
  });

  const EndTime = new Date(
    "1970-01-01T" + eventData.endTime + "Z"
  ).toLocaleTimeString("en-US", {
    timeZone: "UTC",
    hour12: true,
    hour: "numeric",
    minute: "numeric",
  });

  const ConvertedDate = new Date(eventData.date).toLocaleDateString("en-US", {
    timeZone: "UTC",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const getDaysDifference = (eventDate) => {
    const today = new Date();
    const eventdate = new Date(eventDate);

    today.setUTCHours(0, 0, 0, 0);
    eventdate.setUTCHours(0, 0, 0, 0);

    const timeDifference = eventdate.getTime() - today.getTime();

    const daysDifference = Math.round(timeDifference / (1000 * 60 * 60 * 24));

    return daysDifference;
  };

  const GetData = () => {
    AxiosInstance.get(`event/${MyId}/`).then((res) => {
      setEventData({
        title: res.data.name,
        date: res.data.doe,
        startTime: res.data.start_time,
        endTime: res.data.end_time,
        location: res.data.location,
        description: res.data.description,
      });
      setLoading(false);
    });
  };

  const getAllGoals = async () => {
    try {
      const response = await AxiosInstance.get(`goals/?event_id=${MyId}`);
      const goalData = response.data;
      if (!goalData) {
        setGoals([]);
      } else {
        setGoals(goalData);
      }
    } catch (error) {
      console.error("Error fetching event goals:", error);
    }
  };
  const getAllTasks = async () => {
    try {
      const response = await AxiosInstance.get(`tasks/?event_id=${MyId}`);
      const tasksData = response.data;
      if (!tasksData) {
        setTasks([]);
      } else {
        setTasks(tasksData);
      }
    } catch (error) {
      console.error("Error fetching event goals:", error);
    }
  };

  const getAllMarketing = async () => {
    try {
      const response = await AxiosInstance.get(
        `marketingPoster/?event_id=${MyId}`
      );
      const marketingPosterData = response.data;

      if (!marketingPosterData) {
        setMarketingPoster([]);
      } else {
        setMarketingPoster(marketingPosterData[0]);
      }
    } catch (error) {
      console.error("Error fetching event goals:", error);
    }

    try {
      const response = await AxiosInstance.get(
        `marketingReminders/?event_id=${MyId}`
      );
      const marketingReminderData = response.data;

      if (!marketingReminderData) {
        setMarketingReminder([]);
      } else {
        setMarketingReminder(marketingReminderData);
      }
    } catch (error) {
      console.error("Error fetching event goals:", error);
    }
  };

  React.useEffect(() => {
    getAllGoals();
    getAllTasks();
    getAllMarketing();
    GetData();
  }, [open]);

  const daysRemaining = getDaysDifference(eventData.date);

  const handleSubmit = async () => {
    try {
      await AxiosInstance.put(`event/${MyId}/`, {
        name: eventData.title,
        doe: eventData.date,
        start_time: eventData.startTime,
        end_time: eventData.endTime,
        description: eventData.description,
        location: eventData.location,
      });
      GetData();
      handleClose();
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
    GetData();
  };

  const handleClose = () => {
    setOpen(false);
    GetData();
  };
  

  return (
    <div>
      <Box className="geninfo-container">
        <div className="section-container">
          <Box className="main-section">
            <h1>{eventData.title}</h1>
            <hr />
            <p dangerouslySetInnerHTML={{ __html: eventData.description }}></p>
            <hr />
          </Box>
          <Box className="side-section">
            <Tooltip title="Edit Information">
              <EditOutlinedIcon
                style={{ float: "right" }}
                variant="contained"
                onClick={handleClickOpen}
                fontSize="large"
                cursor="pointer"
              >
                Edit
              </EditOutlinedIcon>
            </Tooltip>

            <h1> Event Information </h1>
            {}
            <div>
              {ConvertedDate ==
              new Date("1970-01-01").toLocaleDateString("en-US", {
                timeZone: "UTC",
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })
                ? " "
                : ConvertedDate}
            </div>
            <div>
              {" "}
              {StartTime == "Invalid Date" ? " " : StartTime} -{" "}
              {EndTime == "Invalid Date" ? " " : EndTime}{" "}
            </div>
            <div>
              {" "}
              {daysRemaining < 0 ? "" : daysRemaining} Days Until the Event!{" "}
            </div>
            <hr />
            <div>{eventData.location}</div>
          </Box>
        </div>
        <Box style={{ float: "left", width: "100%" }}>
          <h1>Dashboard</h1>
          <Box className="dashboard">
            <GoalsCard goals={goals}></GoalsCard>
            <TaskCard tasks={tasks}></TaskCard>
            <BudgetCard></BudgetCard>
            <MarketingCard
              marketingPoster={marketingPoster}
              marketingReminders={marketingReminder}
            ></MarketingCard>
            <AttendanceCard></AttendanceCard>
          </Box>
        </Box>

        <Dialog open={open}>
          <DialogTitle>Edit Event Properties</DialogTitle>
          <DialogContent sx={{height: 500, width: 500}}>
            <>
              {loading ? (
                <p>Loading data...</p>
              ) : (
                <>
                  <TextField
                    margin="dense"
                    name="title"
                    label="Event Title"
                    type="text"
                    fullWidth
                    variant="outlined"
                    InputLabelProps={{ required: "true" }}
                    value={eventData.title}
                    onChange={(e) =>
                      setEventData({ ...eventData, title: e.target.value })
                    }
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    name="date"
                    label="Event Date"
                    InputLabelProps={{ shrink: true, required: false }}
                    type="Date"
                    fullWidth
                    format="mm/dd/yyyy"
                    variant="outlined"
                    value={eventData.date}
                    onChange={(e) =>
                      setEventData({ ...eventData, date: e.target.value })
                    }
                  />
                  <div>
                    {" "}
                    <TextField
                      autoFocus
                      margin="dense"
                      name="startTime"
                      label="Event Start Time"
                      type="time"
                      variant="outlined"
                      InputLabelProps={{ shrink: true, required: false }}
                      value={eventData.startTime}
                      onChange={(e) =>
                        setEventData({ ...eventData, startTime: e.target.value })
                      }
                    />
                    <TextField
                      sx={{ marginLeft: 5 }}
                      autoFocus
                      margin="dense"
                      name="endTime"
                      label="Event End Time"
                      type="time"
                      variant="outlined"
                      InputLabelProps={{ shrink: true, required: false }}
                      value={eventData.endTime}
                      onChange={(e) =>
                        setEventData({ ...eventData, endTime: e.target.value })
                      }
                    />
                  </div>
                  <TextField
                    autoFocus
                    margin="dense"
                    name="location"
                    label="Event Location"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={eventData.location}
                    onChange={(e) =>
                      setEventData({ ...eventData, location: e.target.value })
                    }
                  />

                  <ReactQuill
                    theme="snow"
                    value={eventData.description}
                    onChange={(value) =>
                      setEventData({ ...eventData, description: value })
                    }
                    placeholder="Enter your description here!"
                    style={{ marginTop: 8, marginBottom: 16, height: 175 }}
                  />

             
                </>
              )}
            </>
          </DialogContent>
          <DialogActions style={{ marginTop: 10, backgroundColor: "#009CDF" }}>
                    <Button variant="contained" color="secondary" onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
                  </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
}
