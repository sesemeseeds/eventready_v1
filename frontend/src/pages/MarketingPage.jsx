import { useState, useEffect } from 'react';

import { useParams } from "react-router-dom";
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
    <div className="container">
      <div className='marketing-page-container'>
        <div className='marketing-left-section'>
          <div className='marketing-section'>
            <ReminderBox eventId={MyId} />
          </div>
          <div className='marketing-section'>
            <HelpfulLinksBox eventId={MyId}/>
          </div>
        </div>
        <div className='marketing-right-section'>
          <div className='marketing-section'>
            <PosterBox eventId={MyId}/>
          </div>
        </div>
      </div>
    </div>
  );
  };

export default MarketingPage;