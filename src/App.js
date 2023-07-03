import React, { useEffect, useState } from 'react';
import './App.css';
import { SERVER_URL } from './constants';
import DashboardComponent from './component/DashboardComponent';
import LoginComponent from './component/LoginComponent';

function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);

  const setAuth = (boolean) => setAuthenticated(boolean);

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
      } catch (error) {
        console.error('Verify auth failed:', error.message);        
      }
    } else {
      setAuthenticated(false);
    }
  }

  useEffect(() => {
    verifyAuth();
  });

  if (isAuthenticated) {
    return <DashboardComponent />;
  } else {
    return <LoginComponent setAuth={setAuth} />;
  }
}

export default App;
