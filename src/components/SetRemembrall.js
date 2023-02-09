import React, { useState } from "react"
import Map from "./Map"

export function SetRemembrall() {

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

    const [time, setTime] = useState('00:00');
    const handleTime = (event) => {
            setTime(event.target.value);
            console.log(time);
    }

    const [date, setDate] = useState(new Date().toJSON())
    const handleDate = (event) => {
            setDate(event.target.value);
            console.log(date);
    }

    const [checked, setChecked] = useState(false);
    const handleChecked = (event) => {
        setChecked(event.target.checked);
        console.log(checked);
    }

    const [location, setLocation] = useState({ lat: 0, lng: 0});
    const handleLocationChange = (coordinates) => {
        setLocation(coordinates)
    }

    // Add handleSetRememberall (which onClick will do a post req)
    const handleSubmit = () => {
        console.log({
            time,
            text,
            slidervalue,
            date,
            checked
        })
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
            />

            <div>Notify me at:</div>
            {/* Something is not working right. I have to click enter twice to get the correct value logged out */}
            <input
                type={'time'}
                min='00:00'
                max='23:59'
                step='60'
                onChange={handleTime}
                value={time}
            />

            {/* Default value should be today's date. Might have to install moment */}
            {/* Something is not working right. I have to click enter twice to get the correct value logged out */}
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
                />

                {slidervalue ? (
                    `${slidervalue} meter radius of:`
                ) : (
                    'Exact position'
                )}

                <Map location={location} onCoordinatesChanged={handleLocationChange} />
            </div>

            <b>Notification Settings:</b>
            <div>
                <input
                    type={'checkbox'}
                    name={'checked'}
                    onChange={handleChecked}
                    value={checked}
                    checked={checked}
                />
                <label>Push Notification</label>

                <input
                    type={'checkbox'}
                    name={'checked'}
                    onChange={handleChecked}
                    value={checked}
                    checked={checked}
                />
                <label>Sound</label>
            </div>

            <button onClick={handleSubmit}>Set Remembr'all</button>

            <div>The values registered on click are:</div>

        </div >
    )
}