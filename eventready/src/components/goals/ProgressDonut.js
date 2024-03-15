import { useState, useEffect } from 'react';

import { CircularProgressbar } from 'react-circular-progressbar';
import { Tooltip } from '@mui/material';
import 'react-circular-progressbar/dist/styles.css';

import TaskAssociationDialog from './TaskAssociationDialog';

const ProgressDonut = ({ eventId, goal }) => {  
  const [openDialog, setOpenDialog] = useState(false);
  const [value, setValue] = useState(0);
  
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div style={{ width: 100, height: 100, cursor: 'pointer' }}>
      <Tooltip title="Manage Associated Tasks" placement='top'>
        <div onClick={handleOpenDialog}>
          <CircularProgressbar
            value={value}
            text={`${value}%`}
            strokeWidth={10}
            styles={{
              path: {
                stroke: `rgb(${255 - (value * 2.55)}, ${value * 2.55}, 0)`,
                strokeLinecap: 'butt',
                transition: 'stroke-dashoffset 0.5s ease 0s',
              },
              text: {
                fill: '#000', 
                fontSize: '24px',
                fontWeight: 'bold',
              },
              trail: {
                stroke: '#d6d6d6',
              },
            }}
          />
        </div>
      </Tooltip>
      <TaskAssociationDialog
        eventId={eventId}
        open={openDialog}
        onClose={handleCloseDialog}
        goal={goal}
        setProgress={setValue}
      />
    </div>
  );
};

export default ProgressDonut;
