import React, { useState } from "react"
import Map from "./Map"

export function SetRemembrall() {

    const [text, setText] = useState('');
    const handleText = (event) => {
        if (event.key === 'Enter') {
            setText(event.target.value);
            console.log(text);
        }
    }

    const [slidervalue, setSlidervalue] = useState(500);
    const handleSliderValue = (event) => {
        setSlidervalue(event.target.value * 10);
        console.log(slidervalue);
    }

    const [time, setTime] = useState('00:00');
    const handleTime = (event) => {
        if (event.key === 'Enter') {
            setTime(event.target.value);
            console.log(time);
        }
    }

    const [date, setDate] = useState()
    const handleDate = (event) => {
        if (event.key === 'Enter') {
            setDate(event.target.value);
            console.log(date);
        }
    }

    const [checked, setChecked] = useState(false);
    const handleChecked = (event) => {
        setChecked(event.target.checked);
        console.log(checked);
    }

    // Add handleSetRememberall (which onClick will do a post req)


    return (
        <div>
            <h3>Remembr'all</h3>

            <div>My Remembr'all:</div>

            <textarea
                maxLength={'200'}
                minLength={'3'}
                placeholder='Example: Prepare for salary negotations with Academic Work'
                onKeyDown={handleText}
            />

            <div>Notify me at:</div>
            {/* Something is not working right. I have to click enter twice to get the correct value logged out */}
            <input
                type={'time'}
                min='00:00'
                max='23:59'
                step='60'
                onKeyDown={handleTime}
            />

            {/* Default value should be today's date. Might have to install moment */}
            {/* Something is not working right. I have to click enter twice to get the correct value logged out */}
            <input
                type={'date'}
                onKeyDown={handleDate}
            />

            <div>
                <em>*Optional</em>
                <div>Within</div>

                <input
                    type={'range'}
                    onChange={handleSliderValue}
                />

                {slidervalue ? (
                    `${slidervalue} meter radius of:`
                ) : (
                    'Exact position'
                )};

                <Map />
            </div>

            <b>Notification Settings:</b>
            <div>
                <input
                    type={'checkbox'}
                    name={'checked'}
                    onChange={handleChecked}
                />
                <label>Push Notification</label>

                <input
                    type={'checkbox'}
                    name={'checked'}
                    onChange={handleChecked}
                />
                <label>Sound</label>
            </div>

            <button>Set Remembr'all</button>

            <div>The values registered on click are:</div>

        </div >
    )
}