import React from "react"

export default function Modal(props){
    if(!props.show){
        return null
    }

    return (
        <div className="modal" onClick={props.cancel}>
            <div className="modalContent" onClick={(e)=>e.stopPropagation()}>
                <div className="modalHeader">
                    <h4 className="modalTitle">
                        Edit Notification
                    </h4>
                </div>

                <div className="modalBody">
                    <input 
                    type="text" 
                    placeholder="New Message"
                    className="inputChild"
                    onChange={event => props.setMessage(event.target.value)} 
                    />

                    <div className="timeDateDiv">
                        <input 
                        type="date"
                        className="inputChild"
                        onChange={event => props.setDate(event.target.value)} 
                        />

                        <input
                        type="time"
                        className="inputChild" 
                        onChange={event => props.setTime(event.target.value)} 
                        />
                    </div>
                </div>

                <div className="modalFooter">
                    <button className="modalBtn" onClick={props.onClose}>Update</button>
                </div>

            </div>

        </div>
    )
}