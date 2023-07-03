import React, { useEffect, useState } from 'react';
import './App.css';
import { SERVER_URL } from './constants';
import DashboardComponent from './component/DashboardComponent';
import LoginComponent from './component/LoginComponent';

function App() {
  const [displayName, setDisplayName] = useState('');
  const [isAuthenticated, setAuthenticated] = useState(false);

  async function verifyAuth() {
    const token = sessionStorage.getItem('token');
    if (token) {
      try {
        const response = await fetch(SERVER_URL + '/auth/verify', {
            method : 'POST',
            headers: {
              'Authorization': 'Bearer ' + token,
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

  const handleLogOut = (e) => {
    e.preventDefault();
    sessionStorage.removeItem("token");
    setAuthenticated(false);
    setDisplayName('');
  }

  useEffect(() => {
    verifyAuth();
  });

  if (isAuthenticated) {
    return <DashboardComponent displayName={displayName} handleLogOut={handleLogOut} />;
  } else {
    return <LoginComponent setAuthenticated={setAuthenticated} />;
  }
}

export default App;
