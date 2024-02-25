import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const DonutProgressBar = ({ value }) => {
  return (
    <div style={{ width: 100, height: 100 }}>
      <CircularProgressbar
        value={value}
        text={`${value}%`}
        strokeWidth={10}
        styles={{
          // Customize the root svg element
          root: {},
          // Customize the path, i.e. the "completed progress"
          path: {
            stroke: `rgba(62, 152, 199, ${value / 100})`,
            strokeLinecap: 'butt',
            transition: 'stroke-dashoffset 0.5s ease 0s',
          },
          // Customize the text
          text: {
            fill: '#f88',
            fontSize: '16px',
          },
          // Customize background - default styles in circular-progressbar.css
          trail: {
            stroke: '#d6d6d6',
          },
        }}
      />
    </div>
  );
};

export default DonutProgressBar;
