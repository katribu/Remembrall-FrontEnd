import { MdOutlineNotificationsNone } from "react-icons/md";
import React, { useState } from 'react';
import { Link } from 'react-router-dom';


// We want to order the "Today's Reminders" based on date and time
// We also want a button for toggling hide/show "Upcoming reminders" that are not set for "today" 
// Also for "today" we dont want to show the date, only the time, but for the upcoming events, we want to show "day" (mon, tuesd etc), and date 

export function Profile() {

    const [remembralls, setRemembralls] = useState(false);
    const [buttonText, setButtonText] = useState('Hide Upcoming Remembr\'alls');

    const toggleRemembralls = () => {
        setRemembralls(!remembralls);
        setButtonText(buttonText === 'Hide Upcoming Remembr\'alls' ? 'Show Upcoming Remembr\'alls' : 'Hide Upcoming Remembr\'alls');
    };

    return (
        <div style={{ maxWidth: '500px', margin: 'auto' }}>
            <h2>Remembr'alls of the Day:</h2>
            <ul>
                <li>Stretch for 5 minutes</li>
                <div><MdOutlineNotificationsNone /> 13:00</div>
                <li>Stop by Clas Ohlson</li>
                <div><MdOutlineNotificationsNone /> 16:30</div>
                <h2 className={`hideWhenClicked ${remembralls ? "hidden" : ""}`}>Upcoming Remembr'alls:</h2>
                <li className={`hideWhenClicked ${remembralls ? "hidden" : ""}`}>Visit Grandmother</li>
                <div className={`hideWhenClicked ${remembralls ? "hidden" : ""}`}><MdOutlineNotificationsNone /> Saturday 11/2/23 at 11:30</div>
                <li className={`hideWhenClicked ${remembralls ? "hidden" : ""}`}>Submit your tax-statements</li>
                <div className={`hideWhenClicked ${remembralls ? "hidden" : ""}`}><MdOutlineNotificationsNone /> Sunday 12/2/23 10:30</div>
            </ul>
                <div>
                    <button onClick={toggleRemembralls}>{buttonText}</button>
                </div>

                <div>
                    <Link to="/setremembrall">
                    <button>Set Remembr'all</button>
                    </Link>
                </div>


        </div>
    )
}