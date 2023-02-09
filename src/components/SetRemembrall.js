import React, { useState } from "react"
import Map from "./Map"

export function SetRemembrall() {

    const [checked, setChecked] = useState(false);

    const handleChecked = (event) => {
        setChecked(event.target.checked)
    }

    //Info that will be sent to the database: 
    const [type, setType] = React.useState('');
    const [time, setTime] = React.useState('');
    const [markedLocation, setMarkedLocation] = React.useState(null);
    const [message, setMessage] = React.useState('');
    const [location, setLocation] = React.useState({ lat: 0, lng: 0 });

    const handleLocationChange = (coordinates) => {
        setLocation(coordinates);
    }

    return (
        <div>
            <h3>Remembr'all</h3>

            <div>My Remembr'all:</div>
            <textarea maxLength={'200'} placeholder='Example: Prepare for salary negotations with Academic Work'></textarea>

            <div>Notify me at:</div>
            <input type={'time'}></input>

            <div><em>*Optional</em>
                <div>When I am in a <input type={'number'}></input> meter radius of:</div>
                <Map
                    location={location}
                    onCoordinatesChanged={handleLocationChange}
                />
            </div>

            <b>Notification Settings:</b>
            <div>
                <input type={'checkbox'} name={'checked'} onChange={handleChecked} />
                    <label>Push Notification</label>
                <input type={'checkbox'} name={'checked'} onChange={handleChecked}/>
                    <label>Sound</label>
            </div>

            <button>Set Remembr'all</button>

        </div >
    )
}