import { AiTwotoneDelete, AiFillEdit } from "react-icons/ai";
import { IoEllipsisHorizontal, IoAlarmOutline } from "react-icons/io5";
import { FaRegEnvelope } from "react-icons/fa"
import { HiOutlineLocationMarker } from "react-icons/hi"
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createMail, deleteNotification, getUserNotifications, updateLastNotifiedNotification } from "../functions/fetch";
import '../App.css';
import { getDistance } from 'geolib';
import { Header } from "./Header";
import { alarmNotification } from "../functions/notifications";
import { Footer } from "./Footer";


export function Profile(props) {

    // States
    const [userNotifications, setUserNotifications] = useState([]);
    const [isHidden, setIsHidden] = useState(false)
    const [buttonText, setButtonText] = useState('Show Upcoming');
    const [hoverIndexLocation, setHoverIndexLocation] = useState(-1);
    const [hoverIndexAlarm, setHoverIndexAlarm] = useState(-1)
    const [currentLocation, setCurrentLocation] = useState({})
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('nor', { hour: '2-digit', minute: '2-digit' }).slice(0, 5));
    const [getRealTime, setGetRealTime] = useState(new Date().getTime());


    // Check if a token is in localstorage (lines 27 - 38)
    const { history } = props;

    // useEffect will run after the first render, it will check if the token is valid.
    // If no token in local storage - redirect to /login
    useEffect(() => {
        console.log('useeffect twitterToken')
        const token = localStorage.getItem('TWITTER_TOKEN');
        if (!token) {
            history.replace('/login');
            return;
        }
    }, [history])

    // Toggle between hiding and showing upcoming Remembr'alls
    const toggleRemembralls = () => {
        setIsHidden(prevState => !prevState);
        setButtonText(buttonText === 'Hide' ? 'Show Upcoming' : 'Hide');
    };

    // Render user's notifications to the DOM
    async function populateNotifications() {
        const notifications = await getUserNotifications()
        setUserNotifications(notifications)
    }

    useEffect(() => {
        populateNotifications()
    }, [])


    // Delete notification matched by id
    const handleDelete = async (id) => {
        const { error } = await deleteNotification(id);

        if (error) {
            console.log('Was not able to delete notification')
            console.log({ error });
        }

        await populateNotifications();
    }

    // Renders all the location-based notifications
    const myLocationNotifications = userNotifications?.filter(notification => notification.type === "location")?.map((notification, index) => {

        getDistance(currentLocation, {
            latitude: notification.data.lat,
            longitude: notification.data.lng,
        })

        // Conditional setting of Icon colors
        let noLocationChosen = notification.data.lat === 0 && notification.data.lng === 0
        let noChosenFriend = notification.data.chosenFriend === ""

        // Return the mapping of the array
        return (
            <div
                key={index}
                onMouseEnter={() => setHoverIndexLocation(index)}
                onMouseLeave={() => setHoverIndexLocation(-1)}
                className="notificationContainer"
            >
                <div className="ellipsesAlign"><IoEllipsisHorizontal /></div>
                <h4 className="notificationDataMessage">{notification.data.message}</h4>
                <div className="iconAlertDiv">
                    <div><IoAlarmOutline /></div>
                    <div className={noLocationChosen ? "inactiveIcon" : ""}> <HiOutlineLocationMarker /> </div>
                    <div className={noChosenFriend ? "inactiveIcon" : ""}> <FaRegEnvelope /> </div>
                </div>
                {hoverIndexLocation === index && (
                    <div className="notificationBtns">
                        <button onClick={() => handleDelete(notification.id)}> <AiTwotoneDelete /> </button>
                        <button> <AiFillEdit /> </button>
                    </div>
                )}
            </div>
        )
    });

    // Renders all the alarm-based notifications, sorted by time and then date 
    const myAlarmNotifications = userNotifications
        ?.filter(notification => notification.type === "alarm")
        ?.sort((a, b) => {
            const [aHours, aMinutes] = a.data.time.split(":").map(s => parseInt(s));
            const [bHours, bMinutes] = b.data.time.split(":").map(s => parseInt(s));
            if (aHours !== bHours) {
                return aHours - bHours;
            } else {
                return aMinutes - bMinutes;
            }
        })
        ?.sort((a, b) => new Date(a.data.date) - new Date(b.data.date))
        ?.map((notification, index) => {
            let noLocationChosen = notification.data.lat === 0 && notification.data.lng === 0
            let noChosenFriend = notification.data.chosenFriend === ""
            return (
                <div
                    key={index}
                    onMouseEnter={() => setHoverIndexAlarm(index)}
                    onMouseLeave={() => setHoverIndexAlarm(-1)}
                    className="notificationContainer"
                >
                    <div className="ellipsesAlign"><IoEllipsisHorizontal /></div>
                    <h4 className="notificationDataMessage">{notification.data.message}</h4>
                    <div className="iconAlertDiv">
                        <div> <IoAlarmOutline /></div>
                        <div className={noLocationChosen ? "inactiveIcon" : ""}> <HiOutlineLocationMarker /> </div>
                        <div className={noChosenFriend ? "inactiveIcon" : ""}> <FaRegEnvelope /> </div>
                    </div>
                    {hoverIndexAlarm === index && (
                        <div className="notificationBtns">
                            <button onClick={() => handleDelete(notification.id)}> <AiTwotoneDelete /> </button>
                            <button> <AiFillEdit /> </button>
                        </div>
                    )}
                </div>
            )
        });


    // Checking the notifications and when to alert
    // Get our current position (add use state to hold current location and run in a useEffect())
    useEffect(() => {
        navigator.geolocation.watchPosition(
            (position) => {
                setCurrentLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude })
            })

    }, [])

    //An useeffect to check the current location towards the saved locations in the database. 
    useEffect(() => {

        console.log('useeffect location')
       

         
            userNotifications?.forEach(async (notificationInfo) => {
                const { lat, lng, slidervalue, message, chosenFriend, lastNotified } = notificationInfo.data;
                const { id } = notificationInfo;

                const currentDistance = getDistance(currentLocation,
                    {
                        latitude: lat,
                        longitude: lng,
                    }); 
        
                if (currentDistance > 0 && currentDistance < slidervalue) {
                  
                    if(!lastNotified || getRealTime > (lastNotified + (3600 * 1000))) { 
                       
                        await updateLastNotifiedNotification(id)
                        await populateNotifications();
                        alert(message);
                        if (chosenFriend) {

                            createMail(id); 
                            
                            console.log('did we send an email')
                        }
                      }
                    
                    return;

                    // Add functionality to delete the alert or renew. 

                }
                else {
                    return console.log('Did not work')
                } 
        })

    }, [currentLocation, userNotifications, getRealTime]);

    // Check time in frontend every 5th second
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString('nor', { hour: '2-digit', minute: '2-digit' }).slice(0, 5));
        }, 2000)
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setGetRealTime(new Date().getTime())
        }, 2000)
        return () => clearInterval(interval);
    }, []);


    // Check current time in frontend against time saved in database for all notifications
    useEffect(() => {
        userNotifications
            ?.forEach(notification => {
                const chosenTime = notification?.data.time
                console.log(chosenTime)
                alarmNotification(chosenTime, currentTime, notification.data.message)
            })

    }, [currentTime, userNotifications])


    // Rendering the component
    return (
        <div className="outerContainer">
            <Header />
            <div className="mainDiv">

                <div id="upcoming-remebralls">
                    <h1>Today's Remembr'Alls</h1>
                    {myAlarmNotifications.length > 0 ? myAlarmNotifications : (<p>You currently have no alarm-based notifications!</p>)}
                    {myLocationNotifications.length > 0 ? myLocationNotifications : (<p>You currently have no location-based notifications!</p>)}
                    {isHidden &&
                        <>
                            <h2>Upcoming</h2>
                            <div className="notificationContainer">
                                <h4>Visit Grandmother</h4>
                                <div><IoAlarmOutline /> Saturday 15/3/23 at 11:30</div>
                            </div>
                            <div className="notificationContainer">
                                <h4>Submit your tax-statements</h4>
                                <div><IoAlarmOutline /> Sunday 16/3/23 at 10:30</div>
                            </div>
                        </>
                    }
                </div>

                <div>
                    <button onClick={toggleRemembralls} className="upcomingNotificationsLink">{buttonText}</button>
                </div>

                <div className="buttonDiv">
                    <div>
                        <Link to="/setremembrall" className="linkButton"> Create Remembr'All</Link>
                    </div>

                    <div>
                        <Link to="/logout" className="linkButton">Log out</Link>
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    )
}

