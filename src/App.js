import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import React from "react"


function App() {
  return (
    <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Main} />
      <Route path="/signup" component={SignUp} />
      <Route path="/login" component={LogIn} />
      <Route path="/profile/:username" component={Profile} />
      <Route path="/profile/:username/setreminder" component={SetReminder} />
      <Route path="/logout" component={LogOut} />
      </Switch>
      </BrowserRouter>
  )
}























// - How it looked before Shahin started making changes 7/2/23 at 10am


// import './App.css';
// import { BrowserRouter, Switch, Route } from 'react-router-dom'
// import { Users } from './components/Users';
// import React from "react"
// import firstNotification from './functions/notifications';
// import { Map } from './components/Map';

// function App() {

//   //why does the alert need to be "ok'ed" twice before the message goes away?

//   firstNotification('09:36')
//   return (
//     <div className="App">
      
//       <div>
//         <h2>Hello, it works</h2>
//       </div>

//       <div style={{ height: '100vh', width: '100%' }}>
//         <Map/>
//       </div>

//       <div>
//       {/* <Users/> */}
//       </div>
      
//     </div>
//   );
// }

// export default App;
