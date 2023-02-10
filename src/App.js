import { BrowserRouter, Switch, Route } from 'react-router-dom'
import React from "react";
import './App.css';
import { LandingPage } from './components/LandingPage';
import { Profile } from './components/Profile';
import { SetRemembrall } from './components/SetRemembrall';
import { LogIn } from './components/LogIn';
import { SignUp } from './components/SignUp';
import { LogOut } from './components/LogOut';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={LogIn} />
        <Route path="/profile" component={Profile} />
        <Route path="/setremembrall" component={SetRemembrall} />
        <Route path="/logout" component={LogOut} />
      </Switch>
    </BrowserRouter>
  )
}

export default App;



// Comments for function that creates user: email already exists. If all fields where filled in, add user to database, and link to profile 


















