import { AiTwotoneDelete, AiFillEdit } from "react-icons/ai";
import {IoEllipsisHorizontal,IoAlarmOutline} from "react-icons/io5";
import {FaRegEnvelope} from "react-icons/fa"
import {HiOutlineLocationMarker} from "react-icons/hi"
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createMail, deleteNotification, getUserNotifications } from "../functions/fetch";
import '../App.css';
import { getDistance } from 'geolib';
import { Header } from "./Header";
import { alarmNotification } from "../functions/notifications";
import { Footer } from "./Footer";


// We want to order the "Today's Reminders" based on date and time
// We also want a button for toggling hide/show "Upcoming reminders" that are not set for "today" 
// Also for "today" we dont want to show the date, only the time, but for the upcoming events, we want to show "day" (mon, tuesd etc), and date 

export function Profile(props) {

    const [userNotifications, setUserNotifications] = useState([]);
    const [isHidden, setIsHidden] = useState(false)
    const [buttonText, setButtonText] = useState('Show Upcoming');
    const [hoverIndexLocation, setHoverIndexLocation] = useState(-1);
    const [hoverIndexAlarm, setHoverIndexAlarm] = useState(-1)
    const [currentLocation, setCurrentLocation] = useState({})
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('nor', { hour: '2-digit', minute: '2-digit' }).slice(0, 5));

    // Check if you are logged in (lines 16 -28)
    const { history } = props;

    // Check if we have a token in local storage
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

    const toggleRemembralls = () => {
        setIsHidden(prevState => !prevState);
        setButtonText(buttonText === 'Hide' ? 'Show Upcoming' : 'Hide');
    };


    async function populateNotifications() {
        const notifications = await getUserNotifications()
        setUserNotifications(notifications)
    }

    useEffect(() => {
        console.log('useeffect populate')
        populateNotifications()
    }, [])

    const handleDelete = async (id) => {
        const { error } = await deleteNotification(id);

        if (error) {
            console.log('Was not able to delete notification')
            console.log({ error });
        }

        await populateNotifications();
    }




    //Renders all the location-based notifications
    const myLocationNotifications = userNotifications?.filter(notification => notification.type === "location")?.map((notification, index) => {
        
        getDistance(currentLocation, {
            latitude: notification.data.lat,
            longitude: notification.data.lng,
        })
        
    //   if(distance <= notification.data.slidervalue){
    //     alert(`Hi, the time is ${notification.data.time} `)
    //   }
        let noLocationChosen = notification.data.lat === 0 && notification.data.lng === 0
        let noChosenFriend = notification.data.chosenFriend === ""
       
        return (
            <div
                key={index}
                onMouseEnter={() => setHoverIndexLocation(index)}
                onMouseLeave={() => setHoverIndexLocation(-1)}
                className="notificationContainer"
            >
                <div className="ellipsesAlign"><IoEllipsisHorizontal/></div>
                <h4 className="notificationDataMessage">{notification.data.message}</h4>
                <div className="iconAlertDiv">
                    <div><IoAlarmOutline/></div>
                    <div className={noLocationChosen? "inactiveIcon":""}> <HiOutlineLocationMarker/> </div>
                    <div className={noChosenFriend? "inactiveIcon":""}> <FaRegEnvelope/> </div>
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

  
    //Renders all the alarm-based notifications, sorted by time and then date 
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
                    <div className="ellipsesAlign"><IoEllipsisHorizontal/></div>
                    <h4 className="notificationDataMessage">{notification.data.message}</h4>
                    <div className="iconAlertDiv">
                    <div> <IoAlarmOutline/></div>
                    <div className={noLocationChosen? "inactiveIcon":""}> <HiOutlineLocationMarker/> </div>
                    <div className={noChosenFriend? "inactiveIcon":""}> <FaRegEnvelope/> </div>
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


    // We want to add "Welcome NAME" (instead of logged in as fex)
    // We also want THE VERY FIRST TIME, someone enters the profile site, for it to say "Get started by creating a remembra'll. Examples: "Get up and stretch for 5 minutes".
    // We also want to add a conditional, that checks if there are any remembra'lls in the list. If no list, then show "No active remembr'alls for today".
    // As a V2 feature, we want to give you a walkthrough of the functionality (a tutorial), the first time you log in. 


//============================ CHECKING THE NOTIFICATIONS AND WHEN TO ALERT ===============================
    // Measuring set position with current position: 
   // add use state to hold current location and run in a useEffect()
   useEffect(() => {
    navigator.geolocation.watchPosition(
        (position) =>{
            setCurrentLocation({latitude: position.coords.latitude, longitude: position.coords.longitude})
    })
    
    }, [])


    //An useeffect to check the current location towards the saved locations in the database. 
    useEffect(() => {

        console.log('useeffect location')
        const checkLocation = setInterval(() => {

            userNotifications?.forEach(notificationInfo => {
                const currentDistance = getDistance(currentLocation, 
                    {
                        latitude: notificationInfo.data.lat,
                        longitude: notificationInfo.data.lng,
                    }); 
        
                if (currentDistance > 0 && currentDistance < notificationInfo.data.slidervalue) {
        
                    console.log('it fuckings works!!! ')
                    if (notificationInfo.data.chosenFriend) {
                      /*   createMail(notificationInfo.data.chosenFriend, notificationInfo.data.subject, notificationInfo.data.notificationText); 
                        console.log('did we send an email?') */
                        //JUST SEND NOTIFACTION ID TO BACKEND AND LET BACKEND GET the notification data and patch the data with LastNotified. 
                        //Then check if lastNotified < 1 hour and see whether to send again. 
                    }
                    return;
        
                    // Add functionality to delete the alert or renew. 
        
                }
                else{
                    return console.log('Did not work')
                } 
               
        })

        }, 60000);
        return () => clearInterval(checkLocation);
    }, [currentLocation]);


    useEffect(() => {
        console.log('Setcurrent time useeffect')
        const interval = setInterval(() => {
                console.log('setcurrentTime')
                setCurrentTime(new Date().toLocaleTimeString('nor', { hour: '2-digit', minute: '2-digit' }).slice(0, 5))
        }, 5000)
        return () => clearInterval(interval);
    }, [])

//Checking alarm notifications time. 
    useEffect(() => {
        console.log('useeffect alarm') 
        
            userNotifications
            ?.forEach(notification => {
                const chosenTime = notification?.data.time
                console.log(chosenTime)
                alarmNotification(chosenTime, currentTime)
            })

    }, [currentTime, userNotifications])


//===============================FINAL RETURN ================================
    return (
        <div className="outerContainer">
            <Header/>
        <div className="mainDiv">
            {/* <h1>Welcome!</h1> */}

            <div id="upcoming-remebralls">
                <h1>Today's Remembr'Alls</h1>


                {myAlarmNotifications.length > 0 ? myAlarmNotifications : (<p>You currently have no alarm-based notifications!</p>)}

                {myLocationNotifications.length > 0 ? myLocationNotifications : (<p>You currently have no location-based notifications!</p>)}
                {isHidden && 
                <>
                    <h2>Upcoming</h2>
                    <div className="notificationContainer">
                        <h4>Visit Grandmother</h4>
                        <div><IoAlarmOutline/> Saturday 15/3/23 at 11:30</div>
                    </div>
                    <div className="notificationContainer">
                        <h4>Submit your tax-statements</h4>
                        <div><IoAlarmOutline/> Sunday 16/3/23 at 10:30</div>
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
        <Footer/>
        </div>
    )
}

//Maybe redundant code: 

//    function getDistanceFunction(lat, lng) {
//         navigator.geolocation.watchPosition(
//         (position) => {
//             getDistance({latitude: position.coords.latitude, longitude: position.coords.longitude}, {
//                 latitude: lat,
//                 longitude: lng,
//             })
//             // console.log(
//             //     `You are ${getDistance({latitude: position.coords.latitude, longitude: position.coords.longitude}, {
//             //         latitude: lat,
//             //         longitude: lng,
//             //     })} meters away from ${lat} ${lng} `
//             // );
//         },
//         () => {
//             alert('Position could not be determined.');
//         }
//     );
//    }
 