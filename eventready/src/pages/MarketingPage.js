import { useState, useEffect } from 'react';

import { useParams } from "react-router-dom";
import { Box, Container } from '@mui/material';
import ReminderBox from '../components/marketing/reminderBox';
import PosterBox from '../components/marketing/posterBox';
import HelpfulLinksBox from '../components/marketing/helpfulLinks';
import RecapImagesBox from '../components/marketing/recapImages';
import "../styles/Marketing.css";


const MarketingPage = () => {
  const [isLoading, setLoading] = useState(true);

  const MyParam = useParams();
  const MyId = MyParam.id;

  return (
    <div>
      <div className='marketing-main'>
      <div className='marketing-sections-container'>
        <div className='marketing-section'>
          <ReminderBox eventId={MyId}/>
        </div>
        <div className='marketing-section'>
          <PosterBox eventId={MyId}/>
        </div>
        <div className='marketing-section'>
          <HelpfulLinksBox eventId={MyId}/>
        </div>
      </div>
        <RecapImagesBox eventId={MyId}/>

      </div>
    </div>
  );
};

export default MarketingPage;