import { useState, useEffect } from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';
import AxiosInstance from "../Axios";

const ReminderBox = ({ eventId }) => {
  const [reminders, setReminders] = useState([]);
  const [reminderName, setReminderName] = useState(String);
  const [reminderDateTime, setReminderDateTime] = useState(String);
  const [showReminder, setShowReminder] = useState(true);

  useEffect(() => {
    getReminders();
  }, []);

  const addReminder = async () => {
    try {
      if (reminderName && reminderDateTime && eventId) {
        setReminders([...reminders, { name: reminderName, dateTime: reminderDateTime }]);
        const dateTime = splitDateTime(reminderDateTime);
        const data = {
          name: reminderName,
          date: dateTime.date,
          time: dateTime.time,
          event_id: eventId
        };
        await AxiosInstance.post('marketingReminders/', data, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
      } else {
        console.error('Invalid reminder data or event ID');
      }
      setReminderName('');
      setReminderDateTime('');
    } catch (error) {
      console.error("Error adding reminder:", error);
    }
  };

  const getReminders = async () => {
    try {
      const response = await AxiosInstance.get(`marketingReminders/?event_id=${eventId}`);
      const remindersData = response.data;                                              // redeclare reminder data
        if (!remindersData || !Array.isArray(remindersData)) {                          // if payload is nothing, set the reminderData to an empty array
          setReminders([]);
        } else {
          const formattedReminders = remindersData.map(reminder => ({       // format the reminders: id, name, datetime to present in client-side
            id: reminder.id,
            name: reminder.name,
            dateTime: combineDateTime({                         // combine the data into the readable client-side data
              date: reminder.date,
              time: reminder.time
            })
          }));
          setReminders(formattedReminders);                    // setReminders called using the formattedReminders
        }
    } catch (error) {
      console.error("Error fetching reminders:", error);
    }
  };

  const splitDateTime = (dateTimeString) => {
    var dateTimeArray = dateTimeString.split('T');

    var dateComponent = dateTimeArray[0];
    var timeComponent = dateTimeArray[1];

    var dateParts = dateComponent.split('-');
    var year = dateParts[0];
    var month = dateParts[1];
    var day = dateParts[2];

    var timeParts = timeComponent.split(':');
    var hour = timeParts[0];
    var minute = timeParts[1];

    return {
        date: year + '-' + month + '-' + day,
        time: hour + ':' + minute
    };
  }

  const combineDateTime = (dateTimeObject) => {
    const { date, time } = dateTimeObject;
    const [year, month, day] = date.split('-');
    const [hour, minute] = time.split(':');

    const combinedDateTimeString = `${year}-${month}-${day}T${hour}:${minute}`;

    return combinedDateTimeString;
  };

  const toggleReminder = () => {
    setShowReminder(!showReminder);
  };

  return (
    <div>
      {/* Dark green content */}
      <Box
        style={{
          borderRadius: '10px',
          position: 'relative',
        }}
      >
        <Typography
          variant="h6"
          style={{
            color: 'white',
            fontWeight: 'bold',
            marginBottom: '10px',
            backgroundColor: '#2c9100',
            padding: '10px',
            borderRadius: '5px',
            paddingLeft: '20px',
            cursor: 'pointer',
            userSelect: 'none',
          }}
          onClick={toggleReminder}
        >
        Reminders
        </Typography>
  
        {/* Light green content */}
        {showReminder && (
          <Box
            style={{
              flex: 1,
              padding: '20px',
              marginTop: '-10px',
              backgroundColor: '#e9ffda',
              borderRadius: '5px 5px 10px 10px',
              display: showReminder ? 'block' : 'none',
            }}
          >
            <TextField
              type="text"
              placeholder="Reminder Name"
              value={reminderName}
              onChange={(e) => setReminderName(e.target.value)}
              fullWidth
              style={{ marginTop: '10px' }}
            />
            <TextField
              type="datetime-local"
              value={reminderDateTime}
              onChange={(e) => setReminderDateTime(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
              style={{ marginTop: '10px' }}
            />
            <Button
              style={{ backgroundColor: '#45b316', color: '#FFFFFF', marginTop: '40px' }}
              variant="contained"
              onClick={addReminder}
            >
              Add Reminder
            </Button>
  
            {/* Display added reminders */}
            <ul style={{ marginTop: '10px' }}>
              {reminders.map((reminder, index) => (
                <li key={index}>
                  {reminder.name} at {new Date(reminder.dateTime).toLocaleString()}
                </li>
              ))}
            </ul>
          </Box>
        )}
      </Box>
    </div>
  );
};

export default ReminderBox;
