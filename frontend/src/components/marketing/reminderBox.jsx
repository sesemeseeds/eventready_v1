import { useState, useEffect } from 'react';
import { Button, TextField, Typography, Box, Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import AxiosInstance from "../Axios";
import CloseIcon from '@mui/icons-material/Close';


const ReminderBox = ({ eventId }) => {
  const [reminders, setReminders] = useState([]);
  const [reminderName, setReminderName] = useState(String);
  const [reminderDateTime, setReminderDateTime] = useState(String);

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

  const deleteReminder = async (id) => {
    try {
      await AxiosInstance.delete(`marketingReminders/${id}`);
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
          style={{ background: 'linear-gradient(15deg, #80d0c7 0%,  #13547a 0%)', color: '#FFFFFF', marginTop: '40px' }}
          variant="contained"
          onClick={addReminder}
        >
          Add Reminder
        </Button>
      </Box>

      {/* Right side with reminders table */}
      <Box style={{ flex: 1, backgroundColor: 'white', paddingRight: '20px'}}>
        <TableContainer>
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
                      <CloseIcon  onClick={() => deleteReminder(reminder.id)} style={{ verticalAlign: 'middle', cursor: 'pointer'}} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  </Card>
);
};

export default ReminderBox;