import { useState, useEffect } from 'react';
import { Button, TextField, Typography, Box, Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import AxiosInstance from "../Axios";
import CloseIcon from '@mui/icons-material/Close';

const ReminderBox = ({ eventId }) => {
  const [reminders, setReminders] = useState([]);
  const [reminderName, setReminderName] = useState('');
  const [reminderDateTime, setReminderDateTime] = useState('');
  const [isAddButtonDisabled, setIsAddButtonDisabled] = useState(true);

  useEffect(() => {
    getReminders();
  }, []);

  useEffect(() => {
    setIsAddButtonDisabled(!reminderName || !reminderDateTime);
  }, [reminderName, reminderDateTime]);

  const addReminder = async () => {
    try {
      if (reminderName && reminderDateTime && eventId) {
        const dateTime = splitDateTime(reminderDateTime);
        const data = {
          name: reminderName,
          date: dateTime.date,
          time: dateTime.time,
          event_id: eventId
        };
        const response = await AxiosInstance.post('marketingReminders/', data, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const createdReminder = {
          id: response.data.id,
          name: reminderName,
          dateTime: reminderDateTime
        };
        setReminders([...reminders, createdReminder]);
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
      const remindersData = response.data;
      if (!remindersData || !Array.isArray(remindersData)) {
        setReminders([]);
      } else {
        const formattedReminders = remindersData.map(reminder => ({
          id: reminder.id,
          name: reminder.name,
          dateTime: combineDateTime({
            date: reminder.date,
            time: reminder.time
          })
        }));
        setReminders(formattedReminders);
      }
    } catch (error) {
      console.error("Error fetching reminders:", error);
    }
  };

  const splitDateTime = (dateTimeString) => {
    const dateTimeArray = dateTimeString.split('T');
    const dateComponent = dateTimeArray[0];
    const timeComponent = dateTimeArray[1];
    const dateParts = dateComponent.split('-');
    const timeParts = timeComponent.split(':');

    return {
      date: dateComponent,
      time: timeComponent,
    };
  };

  const combineDateTime = ({ date, time }) => {
    return `${date}T${time}`;
  };

  const deleteReminder = async (id) => {
    try {
      await AxiosInstance.delete(`marketingReminders/${id}/`);
      const updatedReminders = reminders.filter(reminder => reminder.id !== id);
      setReminders(updatedReminders);
    } catch (error) {
      console.error("Error deleting reminder:", error);
    }
  };

  return (
    <Card>
      <Typography
        variant="h6"
        style={{
          color: 'white',
          fontWeight: 'bold',
          marginBottom: '10px',
          backgroundImage: 'linear-gradient(15deg, #80d0c7 0%,  #13547a 0%)',
          padding: '10px',
          borderRadius: '5px',
          paddingLeft: '20px',
        }}
      >
        Reminders
      </Typography>
      <Box style={{ display: 'flex' }}>
        {/* Left side with input fields */}
        <Box style={{ flex: 1, backgroundColor: 'white', paddingLeft: '20px', overflowY: 'auto' }}>
          <TableContainer style={{ maxHeight: '220px' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ padding: 0, midWidth: '30px' }}>Name</TableCell>
                  <TableCell style={{ padding: 0 }}>Date</TableCell>
                  <TableCell style={{ padding: 0 }}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reminders.map((reminder, index) => (
                  <TableRow key={index}>
                    <TableCell style={{ padding: 0, midWidth: '30px' }}>{reminder.name}</TableCell>
                    <TableCell style={{ padding: 0 }}>{new Date(reminder.dateTime).toLocaleString()}</TableCell>
                    <TableCell style={{ padding: 0 }}>
                      <CloseIcon onClick={() => deleteReminder(reminder.id)} style={{ verticalAlign: 'middle', cursor: 'pointer' }} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box style={{ flex: 1, padding: '0px 20px 20px 20px' }}>
          <TextField
            type="text"
            placeholder="Name"
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
            onClick={addReminder}
            variant="contained"
            color="primary"
            disabled={isAddButtonDisabled}
            style={{ marginTop: '40px', float: 'right' }}
            >
            Add Reminder
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

export default ReminderBox;
