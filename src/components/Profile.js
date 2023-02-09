import { MdOutlineNotificationsNone } from "react-icons/md";
import React, { useState,} from 'react';
import { Link} from 'react-router-dom';
import { getUserNotifications } from "../functions/fetch";
import jwtDecode from 'jwt-decode';

// We want to order the "Today's Reminders" based on date and time
// We also want a button for toggling hide/show "Upcoming reminders" that are not set for "today" 
// Also for "today" we dont want to show the date, only the time, but for the upcoming events, we want to show "day" (mon, tuesd etc), and date 

export function Profile(props) {
    
    const [remembralls, setRemembralls] = useState(false);
    const [userNotifications, setUserNotifications] = useState(undefined)
    const [buttonText, setButtonText] = useState('Hide Upcoming Remembr\'alls');
    const [user, setUser] = useState('');

    // Check if you are logged in - lines 16 -24
    const { history } = props;

    // Check if we have a token in local storage
    const token = localStorage.getItem('TWITTER_TOKEN');
   
    const payload = jwtDecode(token);
    console.log(payload)
    setUser(payload)
    // If no token in local storage - redirect to /login
    if (!token) {
        history.replace('/login');
        return;
    }

    const toggleRemembralls = () => {
        setRemembralls(prevState => !prevState);
        setButtonText(buttonText === 'Hide Upcoming Remembr\'alls' ? 'Show Upcoming Remembr\'alls' : 'Hide Upcoming Remembr\'alls');
    };

    const getNotifications = async() => {
        const notifications = await getUserNotifications(user)
        console.log(notifications)
        setUserNotifications(notifications)
        console.log(userNotifications)
    }

    // We want to add "Welcome NAME" (instead of logged in as fex)
    // We also want THE VERY FIRST TIME, someone enters the profile site, for it to say "Get started by creating a remembra'll. Examples: "Get up and stretch for 5 minutes".
    // We also want to add a conditional, that checks if there are any remembra'lls in the list. If no list, then show "No active remembr'alls for today".
    // As a V2 feature, we want to give you a walkthrough of the functionality (a tutorial), the first time you log in. 

    return (
        <div style={{ maxWidth: '500px', margin: 'auto' }}>
            <h2>Your Remembr'alls for Today:</h2>
            {/* Here, upcomingRemembralls is assumed to be an array of objects that represent the upcoming remembralls. Each object should have a title and a time property (in this example code).
                Once we have linked the front-end and back-end, we can use this code. 
            
            {upcomingRemembralls.length ? (
                <ul id="upcoming-remebralls">
                    {upcomingRemembralls.map((item, index) => (
                        <React.Fragment key={index}>
                            <li>{item.title}</li>
                            <div>
                                <MdOutlineNotificationsNone /> {item.time}
                            </div>
                        </React.Fragment>
                    ))}
                </ul>
            ) : (
                <div>Get started by setting a Remembr'all</div>
                <div>Examples:</div>
                <ul>
                <li>Stretch for 5 minutes</li>
                </ul>
                <button>Set your first remembr'all</button> 
            )} 
            */}
            <ul id="upcoming-remebralls">
                <li>Stretch for 5 minutes</li>
                <div><MdOutlineNotificationsNone /> 13:00</div>
                <li>Stop by Clas Ohlson</li>
                <div><MdOutlineNotificationsNone /> 16:30</div>
                <h2 className={`hideWhenClicked ${remembralls ? "hidden" : ""}`}>Your Upcoming Remembr'alls:</h2>
                <li className={`hideWhenClicked ${remembralls ? "hidden" : ""}`}>Visit Grandmother</li>
                <div className={`hideWhenClicked ${remembralls ? "hidden" : ""}`}><MdOutlineNotificationsNone /> Saturday 11/2/23 at 11:30</div>
                <li className={`hideWhenClicked ${remembralls ? "hidden" : ""}`}>Submit your tax-statements</li>
                <div className={`hideWhenClicked ${remembralls ? "hidden" : ""}`}><MdOutlineNotificationsNone /> Sunday 12/2/23 10:30</div>
            </ul>
            <div>
                <button onClick={toggleRemembralls}>{buttonText}</button>
                <button onClick={getNotifications}>Get my Remembr'alls</button>
            </div>

            <div>
                <Link to="/setremembrall">
                    {/* Goes to the set remembrall page. (to create new notification) */}
                    <button>Set Remembr'all</button>
                </Link>
            </div>
        </div>
    )
}