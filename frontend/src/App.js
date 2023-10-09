import React, { useState, useEffect } from 'react';
import './App.css'
import MainPage from './MainPage.js'
import { ReactSession } from 'react-client-session';

function App() {
  ReactSession.setStoreType("localStorage");

  const [date, setDate] = useState()

  function updateData() {
    // Update datetime
    setDate(new Date().toLocaleString()+"")
  }

  useEffect(() => {
    // Update first time
    updateData();

    // Setup interval to update constantly
    const interval = setInterval(updateData, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <div className="app-header">
        <div className="app-pagesize">
          <div className="app-name">Sexta da Música</div>
          <div className="app-datetime">{date}</div>
        </div>
      </div>
      <div className="app-body">
        <MainPage />
      </div>
    </div>
  );
}

export default App;
