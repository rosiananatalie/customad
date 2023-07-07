import React, { useEffect, useState } from 'react';
import './App.css';
import { SERVER_URL } from './Constants';
import DashboardComponent from './component/DashboardComponent';
import LoginComponent from './component/LoginComponent';

function App() {
  const [displayName, setDisplayName] = useState('');
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [videos, setVideos] = useState([]);

  const handleLogOut = (e) => {
    e.preventDefault();
    sessionStorage.removeItem('token');
    setAuthenticated(false);
    setDisplayName('');
  }

  useEffect(() => {
    async function verifyAuth() {
      const token = sessionStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch(SERVER_URL + '/auth/verify', {
              method : 'POST',
              headers: {
                Authorization: 'Bearer ' + token,
                'Content-type' : 'application/json',
              }
          });
          const parseRes = await response.json();
          setAuthenticated(parseRes.verified);
          setDisplayName(parseRes.displayName);
        } catch (error) {
          console.error('Verify auth failed:', error.message);        
        }
      } else {
        setAuthenticated(false);
      }
    }
    verifyAuth();
  }, []);

  useEffect(() => {
    async function getVideos() {
      try {
          const url = SERVER_URL + '/videos';
          const token = sessionStorage.getItem('token');
          const response = await fetch(url, {
              method : 'GET',
              headers: {
                  Authorization: 'Bearer ' + token,
              }
          });
          const parseRes = await response.json();
          setVideos(parseRes);
      } catch (error) {
          console.error('Get video failed:', error.message);        
      }
    }
    if (isAuthenticated) {
      getVideos();
    }
  }, [isAuthenticated]);

  if (isAuthenticated) {
    if (videos.length === 0) {
      return (
        <div className="container">
          <div className="loading loading-lg"></div>
        </div>
      );
    }
    return <DashboardComponent displayName={displayName} videos={videos} handleLogOut={handleLogOut} />;
  }
  return <LoginComponent setAuthenticated={setAuthenticated} />;
}

export default App;
