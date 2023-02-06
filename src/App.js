import './App.css';
// Import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Users } from './components/Users';
import React from "react"
import firstNotification from './functions/notifications';
import { GeoLocation } from './components/GeoLocation';



function App() {

  //why does the alert need to be "ok'ed" twice before the message goes away?

  firstNotification('09:36')
  return (
    <div className="App">
      
      <div>
        <h2>Hello, it works</h2>
      </div>

      <div style={{width: '100px', height: '100px'}}>
        <GeoLocation/>
      </div>

      <div>
      {/* <Users/> */}
      </div>
      
    </div>
  );
}

export default App;
