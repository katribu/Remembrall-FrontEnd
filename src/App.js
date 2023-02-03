import './App.css';
// import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Users } from './components/Users';
import React from "react"

// Hello 
function App() {
  return (
    <div className="App">
      <div>
      <h2>Hello, it works</h2>
      </div>

      <div>
      <Users/>
      </div>
    </div>
  );
}

export default App;
