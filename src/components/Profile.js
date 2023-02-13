import { MdOutlineNotificationsNone } from "react-icons/md";
import { AiTwotoneDelete, AiFillEdit } from "react-icons/ai";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { deleteNotification, getUserNotifications } from "../functions/fetch";
import '../App.css';

// We want to order the "Today's Reminders" based on date and time
// We also want a button for toggling hide/show "Upcoming reminders" that are not set for "today" 
// Also for "today" we dont want to show the date, only the time, but for the upcoming events, we want to show "day" (mon, tuesd etc), and date 

export function Profile(props) {

    const [remembralls, setRemembralls] = useState(false);
    const [userNotifications, setUserNotifications] = useState([]);
    const [buttonText, setButtonText] = useState('Hide Upcoming Remembr\'alls');
    const [hoverIndex, setHoverIndex] = useState(-1);

    // Check if you are logged in (lines 16 -28)
    const { history } = props;

    // Check if we have a token in local storage
    // useEffect will run after the first render, it will check if the token is valid.
    // If no token in local storage - redirect to /login
    useEffect(() => {
        const token = localStorage.getItem('TWITTER_TOKEN');
        if (!token) {
            history.replace('/login');
            return;
        }
    }, [history])

    const toggleRemembralls = () => {
        setRemembralls(prevState => !prevState);
        setButtonText(buttonText === 'Hide Upcoming Remembr\'alls' ? 'Show Upcoming Remembr\'alls' : 'Hide Upcoming Remembr\'alls');
    };


    async function populateNotifications() {
        const notifications = await getUserNotifications()
        setUserNotifications(notifications)
    }

    useEffect(() => {
        populateNotifications()
    }, [])

    const handleDelete = async (id) => {
        const {error} = await deleteNotification(id);

        if(error) {
            console.log('Was not able to delete notification')
            console.log({error});
        }

        await populateNotifications();
    }

    const myLocationNotifications = userNotifications?.filter(notification => notification.type === "location")?.map((notification, index) => {
        return (
            <div
                className="profile-notifications"
                key={index}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(-1)}
            >

                <p>What: {notification.data.message}</p>
                <p>{notification.id}</p>
                <p><MdOutlineNotificationsNone /> {notification.data.time}</p>
                {hoverIndex === index && (
                    <>
                        <button onClick={() => {handleDelete(notification.id)
                         console.log('clicked') 
                         console.log(notification.id)}} className="profile-delete"> <AiTwotoneDelete /> </button>
                        <button className="profile-edit"> <AiFillEdit /> </button>
                    </>
                )}
            </div>
        )
    });


    const myAlarmNotifications = userNotifications?.filter(notification => notification.type === "alarm")?.map((notification, index) => {
        return (
            <div key={index}>

                <p>What: {notification.data.message}</p>
                <p> <MdOutlineNotificationsNone /> {notification.data.time}</p>
                <button> <AiTwotoneDelete /> </button>
                <button> <AiFillEdit /> </button>
            </div>
        )
    });

    // We want to add "Welcome NAME" (instead of logged in as fex)
    // We also want THE VERY FIRST TIME, someone enters the profile site, for it to say "Get started by creating a remembra'll. Examples: "Get up and stretch for 5 minutes".
    // We also want to add a conditional, that checks if there are any remembra'lls in the list. If no list, then show "No active remembr'alls for today".
    // As a V2 feature, we want to give you a walkthrough of the functionality (a tutorial), the first time you log in. 

    return (
        <div style={{ maxWidth: '500px', margin: 'auto' }}>
            <h1>Welcome!</h1>

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

            <div id="upcoming-remebralls">
                <h3>Your Location-based Notifications</h3>
                {myLocationNotifications.length > 0 ? myLocationNotifications : (<p>You currently have no location-based notifications!</p>)}

                <h3>Your Alarm-based Notifications</h3>
                {myAlarmNotifications.length > 0 ? myAlarmNotifications : (<p>You currently have no alarm-based notifications!</p>)}
                <h2 className={`hideWhenClicked ${remembralls ? "hidden" : ""}`}>Your Upcoming Remembr'alls:</h2>
                <li className={`hideWhenClicked ${remembralls ? "hidden" : ""}`}>Visit Grandmother</li>
                <div className={`hideWhenClicked ${remembralls ? "hidden" : ""}`}><MdOutlineNotificationsNone /> Saturday 11/2/23 at 11:30</div>
                <li className={`hideWhenClicked ${remembralls ? "hidden" : ""}`}>Submit your tax-statements</li>
                <div className={`hideWhenClicked ${remembralls ? "hidden" : ""}`}><MdOutlineNotificationsNone /> Sunday 12/2/23 10:30</div>
            </div>
            <div>
                <button onClick={toggleRemembralls}>{buttonText}</button>
            </div>

            <div>
                <Link to="/setremembrall" className="linkButton">
                    Set Remembr'All
                </Link>
                <Link to="/logout" className="linkButton">Log out</Link>
            </div>
        </div>
    )
}