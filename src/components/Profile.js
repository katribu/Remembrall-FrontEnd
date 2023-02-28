import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { createMail, deleteNotification, getUserNotifications, updateLastNotifiedNotification,updateNotification } from "../functions/fetch";
import '../App.css';
import { getDistance } from 'geolib';
import { Header } from "./Header";
import { alarmNotification } from "../functions/notifications";
import { Footer } from "./Footer";
import NotificationStyle from "./NotificationStyle";
import Modal from './Modal';


export function Profile(props) {

    // States
    const [userNotifications, setUserNotifications] = useState([]);
    const [isHidden, setIsHidden] = useState(false)
    const [buttonText, setButtonText] = useState('Show Upcoming');
    const [hoverIndexToday, setHoverIndexToday] = useState(-1);
    const [hoverIndexFuture, setHoverIndexFuture] = useState(-1)
    const [currentLocation, setCurrentLocation] = useState({})
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('nor', { hour: '2-digit', minute: '2-digit' }).slice(0, 5));
    const [getRealTime, setGetRealTime] = useState(new Date().getTime());

    // States shared with MODAL component.
    const [show, setShow] = useState(false)
    const [message, setMessage] = useState('')
    const [time, setTime] = useState('')
    const [date, setDate] = useState('')


    // Check if a token is in localstorage (lines 27 - 38)
    const { history } = props;

    // useEffect will run after the first render, it will check if the token is valid.
    // If no token in local storage - redirect to /login
    useEffect(() => {
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
    const handleDelete = useCallback(async (id) => {
        console.log("handleDelete function")
        const { error } = await deleteNotification(id);

        if (error) {
            console.log('Was not able to delete notification')
            console.log({ error });
        }

        await populateNotifications();
    },[])

    // Update Notification matched by id
    const handleUpdate = useCallback((id) => {
        console.log("handle Update function")
        userNotifications?.map(async notification => {
            if(notification.id === id){
                setShow(false)
                await updateNotification(notification.id, message,time,date )
            }
            await populateNotifications()
        })
    },[date,time,message,userNotifications])

    

    //Compare today's date with the notification date.
    const todaysDate = new Date().toJSON().slice(0,10)

    // Renders Today's Notifications
    const myNotificationsToday = userNotifications
    ?.filter(notification => todaysDate === notification.data.date)
    ?.map((notification, index) => {

        // Return the mapping of the array
        return (
            <div key={notification.id}>
            <NotificationStyle
            setHoverIndexToday={()=>setHoverIndexToday(index)}
            setHover={()=>setHoverIndexToday(-1)}
            message={notification.data.message}
            handleDelete={()=>handleDelete(notification.id)}
            openModal={()=>setShow(true)}
            hoverIndex={hoverIndexToday}
            index={index}
            lat={notification.data.lat}
            lng={notification.data.lng}
            chosenFriend={notification.data.chosenFriend}
            />

            <Modal 
            show={show} 
            onClose={()=>handleUpdate(notification.id)}
            cancel={()=>setShow(false)}
            setMessage={setMessage}
            setTime={setTime}
            setDate={setDate}
            />
            </div>
        )
    });

    // Render Future Notifications
    const futureNotifications = userNotifications
    ?.filter(notification => notification.data.date > todaysDate)
    ?.map((notification, index) => {
        // Return the mapping of the array
        return (
            <div key={notification.id}>
            <NotificationStyle
            setHoverIndexToday={()=>setHoverIndexFuture(index)}
            setHover={()=>setHoverIndexFuture(-1)}
            message={notification.data.message}
            handleDelete={()=>handleDelete(notification.id)}
            openModal={()=>setShow(true)}
            hoverIndex={hoverIndexFuture}
            index={index}
            lat={notification.data.lat}
            lng={notification.data.lng}
            chosenFriend={notification.data.chosenFriend}
            />

            <Modal 
            show={show} 
            onClose={()=>handleUpdate(notification.id)}
            cancel={()=>setShow(false)}
            setMessage={setMessage}
            setTime={setTime}
            setDate={setDate}
            />
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

    
    //A useeffect to check the current location towards the saved locations in the database. 
    useEffect(() => {

        // console.log('useeffect location')         
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
                    return;
                    // console.log('Did not work')
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
                // console.log(chosenTime)
                alarmNotification(
                    chosenTime, currentTime, 
                    notification.data.message,todaysDate, 
                    notification.data.date,
                    notification.id, 
                    handleDelete
                    )
                
            })

    }, [currentTime,userNotifications,todaysDate,handleDelete])


    // Rendering the component
    return (
        <div className="outerContainer">
            <Header />
            <div className="mainDiv">

                <div id="upcoming-remebralls">
                    <h1>Today's Remembr'Alls</h1>
                    {myNotificationsToday.length > 0 ? myNotificationsToday : (<p>You currently have no notifications for today!</p>)}
                   
                    {isHidden &&
                        <>
                            <h2>Upcoming</h2>
                            {futureNotifications.length > 0 ? futureNotifications : (<p>You have no upcoming notifications!</p>) }
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

                </div>

            </div>
            <Footer />
        </div>
    )
}

