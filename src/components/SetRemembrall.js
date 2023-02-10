import React, { useState } from "react"
import { createNewRemembrall } from "../functions/fetch";
import Map from "./Map"


export function SetRemembrall(props) {

    const [text, setText] = useState('');
    const handleText = (event) => {
        setText(event.target.value);
        console.log(text);
    }

    const [slidervalue, setSlidervalue] = useState(100);
    const handleSliderValue = (event) => {
        setSlidervalue(event.target.value);
        console.log(slidervalue);
    }

    const [time, setTime] = useState(new Date().toLocaleTimeString('nor', { hour: '2-digit', minute: '2-digit' }).slice(0, 5));
    const handleTime = (event) => {
        setTime(event.target.value);
        console.log(time);
    }

    const [date, setDate] = useState(new Date().toJSON().slice(0, 10))
    const handleDate = (event) => {
        setDate(event.target.value);
        console.log(date);
    }


    const [checkedPush, setCheckedPush] = useState(false);
    const handleCheckedPush = (event) => {
        setCheckedPush(event.target.checked);
        console.log(checkedPush);
    }

    const [checkedSound, setCheckedSound] = useState(false);
    const handleCheckedSound = (event) => {
        setCheckedSound(event.target.checked);
        console.log(checkedSound);
    }

    const [location, setLocation] = useState({ lat: 0, lng: 0 });
    const handleLocationChange = (coordinates) => {
        setLocation(coordinates)
    }

    // Add handleSubmit (must do a post request, to our database)
    const handleSubmit = async () => {
    console.log({
            time,
            text,
            slidervalue,
            date,
            checkedPush,
            checkedSound,
            location

        })

        const type = 'location';

        const submitResponse = await createNewRemembrall(type, time, location.lat, location.lng, text); 
        
        const { history } = props;
        history.replace('/profile');
        
        return submitResponse; 
    
    }

    return (
        <div>
            <h3>Remembr'all</h3>

            <div>My Remembr'all:</div>

            
            <textarea
                maxLength={'200'}
                minLength={'3'}
                placeholder='Example: Prepare for salary negotations with Academic Work'
                onChange={handleText}
                value={text}
                cols='25'
                rows='3'
            />

            <div>Notify me at:</div>
            <input
                type={'time'}
                min='00:00'
                max='23:59'
                step='60'
                onChange={handleTime}
                value={time}
            />

            <input
                type={'date'}
                onChange={handleDate}
                value={date}
            />

            <div>
                <em>*Optional</em>
                <div>Within</div>

                <input
                    type={'range'}
                    onChange={handleSliderValue}
                    value={slidervalue}
                    min="0"
                    max="1000"
                    step='50'
                />

                <div style={{ display: 'inline' }}>{slidervalue} meter radius of:</div>

                <Map location={location} onCoordinatesChanged={handleLocationChange} />
            </div>

            <b>Notification Settings:</b>
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
            </div>

            <button onClick={handleSubmit}>Set Remembr'all</button>

        </div >
    )
}