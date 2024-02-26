import { useState } from 'react';

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';


const DonutProgressBar = ({ value }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div style={{ width: 100, height: 100, cursor: 'pointer' }}>
      <Tooltip title="View/Manage Associated Tasks">
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
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Associated Tasks</DialogTitle>
        <DialogContent>
          {/* Add your content for the dialog here */}
          This is the content of the dialog.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DonutProgressBar;
