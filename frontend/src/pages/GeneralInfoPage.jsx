import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { Box, Container } from "@mui/material";
import { useForm } from "react-hook-form";
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
import { useAuth, useUser } from "@clerk/clerk-react";

export default function GeneralInfoComponent() {
  const [open, setOpen] = React.useState(false);
  const [EventTitle, setEventTitle] = React.useState(String);
  const [EventDate, setEventDate] = React.useState(String);
  const [EventStartTime, setEventStartTime] = React.useState(String);
  const [EventEndTime, setEventEndTime] = React.useState(String);
  const [EventLocation, setEventLocation] = React.useState(String);
  const [EventDescription, setEventDescription] = React.useState(String);
  const [EventCreationDate, setEventCreationDate] = React.useState(String);
  const [EventActive, setEventActive] = React.useState(String);
  const [EventAddress, setEventAddress] = React.useState(String);
  const [loading, setLoading] = React.useState(true);

  const [goals, setGoals] = React.useState();
  const [tasks, setTasks] = React.useState();
  const [marketingPoster, setMarketingPoster] = React.useState();
  const [marketingReminder, setMarketingReminder] = React.useState();

  const MyParam = useParams();
  const MyId = MyParam.id;
  const userId = useAuth().userId;
  console.log("User ID:",userId);

  const StartTime = new Date(
    "1970-01-01T" + EventStartTime + "Z"
  ).toLocaleTimeString("en-US", {
    timeZone: "UTC",
    hour12: true,
    hour: "numeric",
    minute: "numeric",
  });

  const EndTime = new Date(
    "1970-01-01T" + EventEndTime + "Z"
  ).toLocaleTimeString("en-US", {
    timeZone: "UTC",
    hour12: true,
    hour: "numeric",
    minute: "numeric",
  });

  const ConvertedDate = new Date(EventDate).toLocaleDateString("en-US", {
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
      // console.log(res.data);
      setEventTitle(res.data.name);
      setEventDate(res.data.doe);
      setEventStartTime(res.data.start_time);
      setEventEndTime(res.data.end_time);
      setEventLocation(res.data.location);
      setEventDescription(res.data.description);
      setEventCreationDate(res.data.created);
      setEventActive(res.data.active);
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
  }, []);

  const { register, handleSubmit, setValue, control } = useForm({});
  const daysRemaining = getDaysDifference(EventDate);

  const onSubmit = async (data) => {
    try {
      if (!userId) {
        throw new Error("User ID not found");
      }
      console.log("User  - on submit:",userId);
      const eventData = {
        name: data.EventTitle,
        doe: data.EventDate,
        start_time: data.EventStartTime,
        end_time: data.EventEndTime,
        description: data.EventDescription,
        location: data.EventLocation,
        // user_id: userId, // Include user ID fetched from Clerk
      };
  
      await AxiosInstance.put(`event/${MyId}/`, eventData);
      GetData();
      handleClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Box className="geninfo-container">
        <div className="section-container">
          {" "}
          <Box className="main-section">
            <h1>{EventTitle} </h1>
            <hr></hr>
            <p dangerouslySetInnerHTML={{ __html: EventDescription}}></p>
            <hr></hr>
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
            <hr></hr>
            <div>{EventLocation}</div>
            <div>{EventAddress}</div>
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
          <DialogContent>
            <>
              {loading ? (
                <p>Loading data...</p>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <TextField
                    margin="dense"
                    name="EventTitle"
                    label="Event Title"
                    type="text"
                    fullWidth
                    variant="outlined"
                    InputLabelProps={{ required: "true" }}
                    defaultValue={EventTitle}
                    {...register("EventTitle")}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    name="EventDate"
                    label="Event Date"
                    InputLabelProps={{ shrink: true, required: false }}
                    type="Date"
                    fullWidth
                    format="mm/dd/yyyy"
                    variant="outlined"
                    defaultValue={EventDate}
                    {...register("EventDate")}
                  />
                  <div>
                    {" "}
                    <TextField
                      autoFocus
                      margin="dense"
                      name="EventStartTime"
                      label="Event Start Time"
                      type="time"
                      variant="outlined"
                      InputLabelProps={{ shrink: true, required: false }}
                      defaultValue={EventStartTime}
                      {...register("EventStartTime")}
                    />
                    <TextField
                      sx={{ marginLeft: 5 }}
                      autoFocus
                      margin="dense"
                      name="EventEndTime"
                      label="Event End Time"
                      type="time"
                      variant="outlined"
                      InputLabelProps={{ shrink: true, required: false }}
                      defaultValue={EventEndTime}
                      {...register("EventEndTime")}
                    />
                  </div>
                  <TextField
                    autoFocus
                    margin="dense"
                    name="EventLocation"
                    label="Event Location"
                    type="text"
                    fullWidth
                    variant="outlined"
                    defaultValue={EventLocation}
                    {...register("EventLocation")}
                  />

                  <ReactQuill
                    theme="snow"
                    value={EventDescription}
                    onChange={setEventDescription}
                    placeholder="Enter your description here!"
                    style={{ marginTop: 8, marginBottom: 16, height: 250 }}
                  />

                  <DialogActions sx={{marginTop: 5}}>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Submit</Button>
                  </DialogActions>
                </form>
              )}
            </>
          </DialogContent>
        </Dialog>
      </Box>
    </div>
  );
}
