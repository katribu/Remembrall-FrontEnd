import React, { useState } from "react"
import { createNewRemembrall } from "../functions/fetch";
import Map from "./Map"
import { Link } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";


export function SetRemembrall(props) {

    const [text, setText] = useState('');
    const handleText = (event) => {
        setText(event.target.value);
    }

    const [slidervalue, setSlidervalue] = useState(100);
    const handleSliderValue = (event) => {
        setSlidervalue(event.target.value);
    }

    const [time, setTime] = useState(new Date().toLocaleTimeString('nor', { hour: '2-digit', minute: '2-digit' }).slice(0, 5));
    const handleTime = (event) => {
        setTime(event.target.value);
    }

    const [date, setDate] = useState(new Date().toJSON().slice(0, 10))
    const handleDate = (event) => {
        setDate(event.target.value);
    }


    /*    const [checkedPush, setCheckedPush] = useState(false);
       const handleCheckedPush = (event) => {
           setCheckedPush(event.target.checked);
           console.log(checkedPush);
       }
    */
    /*    const [checkedSound, setCheckedSound] = useState(false);
       const handleCheckedSound = (event) => {
           setCheckedSound(event.target.checked);
           console.log(checkedSound);
       }
    */
    // Coordinates of Oslo S is set as default state for now

    const [location, setLocation] = useState({ lat: 59.91151554598712, lng: 10.752414484654482 });
    const handleLocationChange = (coordinates) => {
        setLocation(coordinates)
    }

    const [type, setType] = useState('alarm')
    const [checkedChooseLocation, setChooseLocation] = useState(false);
    const handleCheckedLocation = (event) => {
        setChooseLocation(event.target.checked);
        setType('location')
    }

    const [checkedFriend, setCheckedFriend] = useState(false);
    const handleCheckedFriend = (event) => {
        setCheckedFriend(event.target.checked);
    }

    const [chosenFriend, setChosenFriend] = useState('');
    const handleChosenFriend = (event) => {
        setChosenFriend(event.target.value);
    }

    const [subject, setSubject] = useState('');
    const handleSubject = (event) => {
        setSubject(event.target.value);
    }

    const [notificationText, setNotificationText] = useState('');
    const handleNotificationText = (event) => {
        setNotificationText(event.target.value);
    }



    // Add handleSubmit(must do a post request, to our database)
    const handleSubmit = async () => {
        
        const submitResponse = await createNewRemembrall(type, time, date, location.lat, location.lng, slidervalue, text, chosenFriend, subject, notificationText);

        const { history } = props;
        history.replace('/profile');
        return submitResponse;
    }


    return (
        <div className="outerContainer">
            <Header/>
        <div className="mainDiv setRemembrallStyles">

            <div className="textAlignLeft">My Remembr'All:</div>


            <textarea
                maxLength={'200'}
                minLength={'3'}
                placeholder='Example: Prepare for interview with Google'
                onChange={handleText}
                value={text}
                cols='25'
                rows='3'
                className="inputChild"
            />

            <div className="textAlignLeft">Notify me at:</div>

            <div className="timeDateDiv">

                <input
                    type={'time'}
                    min='00:00'
                    max='23:59'
                    step='60'
                    onChange={handleTime}
                    value={time}
                    className="inputChild timeDateChild"
                />

                <input
                    type={'date'}
                    onChange={handleDate}
                    value={date}
                    className="inputChild timeDateChild"
                />
            </div>

            <div>
                <div className="textAlignLeft">
                <b >Choose a Location: </b>
                <input
                    type={'checkbox'}
                    name={'checked'}
                    onChange={handleCheckedLocation}
                    value={checkedChooseLocation}
                    checked={checkedChooseLocation}
                    className="extraMargin"
                />
                </div>


                {checkedChooseLocation &&

                    <div>

                        <div style={{ display: 'inline',fontFamily:"inherit" }}>Choose radius: {slidervalue}m</div><br />
                        <input
                            type={'range'}
                            onChange={handleSliderValue}
                            value={slidervalue}
                            min="50"
                            max="1000"
                            step='50'
                            
                        />
                        <Map location={location} onCoordinatesChanged={handleLocationChange} slidervalue={slidervalue} />
                    </div>}
            </div>

            <div>
                
                <div className="textAlignLeft">
                    <b style={{fontFamily:"inherit"}}> Notify a friend: </b>
                    <input
                        type={'checkbox'}
                        name={'checked'}
                        onChange={handleCheckedFriend}
                        value={checkedFriend}
                        checked={checkedFriend}
                    />
                </div>


                {checkedFriend &&
                    <div>
                        <div>
                            
                            {/* PROBABLY HAVE TO MAP OVER THE PAYLOAD AND INPUT VALUE AND OPTION TEXT FROM THAT */}
                            <select id="email-friends" onChange={handleChosenFriend} defaultValue={'Select a friend'} className="inputChild">
                                <option value="Select a friend" disabled>Select a friend</option>
                                <option value='irgen_w.s@hotmail.com'>Irgen</option>
                                <option value='katrinaburwash_17@hotmail.com'>Katrina</option>
                                <option value='shahinhemat@gmail.com'>Shahin</option>
                            </select>
                        </div>


                        <div>
                            <div className="textAlignLeft">Subject:</div>
                            <input
                                type={text}
                                maxLength={'100'}
                                placeholder='On my way home!'
                                onChange={handleSubject}
                                value={subject}
                                className="inputChild"
                            />
                        </div>

                        <div>

                            <div className="textAlignLeft">Notification:</div>

                            <textarea
                                maxLength={'200'}
                                minLength={'3'}
                                placeholder="Example: I'm on my way home!"
                                onChange={handleNotificationText}
                                value={notificationText}
                                cols='25'
                                rows='4'
                                className="inputChild"
                            />
                        </div>
                    </div>}
            </div>

            <div className="buttonDiv">
                <button className="linkButton logInBtn" onClick={handleSubmit}>Save Remembr'All</button>
                <div>
                <Link to="/profile" className='linkButton'>Back</Link>
                </div>
            </div>
        </div >
        <Footer/>
        </div>
    )
}




{/* Choosing Notifications will be part of V2. */ }
{/* <b>Notification Settings:</b>
<div>
    <input
        type={'checkbox'}
        name={'checked'}
        onChange={handleCheckedPush}
        value={checkedPush}
        checked={checkedPush}
    />
    <label>Push Notification</label>

    <input
        type={'checkbox'}
        name={'checked'}
        onChange={handleCheckedSound}
        value={checkedSound}
        checked={checkedSound}
    />
    <label>Sound</label>
</div> */}