import React from 'react';

import CustomizationContainer from '../container/CustomizationContainer'
import VideoPlayerContainer from '../container/VideoPlayerContainer';


function Dashboard() {
  return (
    <div>
        <div className='container'>
            <div className='columns'>
                <div className='column col-8'>
                    <VideoPlayerContainer />
                </div>
                <div className='column col-4'>
                    <CustomizationContainer />
                </div>
                
            </div>
        </div>
    </div>
    
    
  );
}

export default Dashboard;