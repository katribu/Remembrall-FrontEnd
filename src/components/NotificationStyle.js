import { AiTwotoneDelete, AiFillEdit } from "react-icons/ai";
import { IoEllipsisHorizontal, IoAlarmOutline } from "react-icons/io5";
import { FaRegEnvelope } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import React from "react"

export default function NotificationStyle(props){
     // Conditional setting of Icon colors
    let noLocationChosen = props.lat === 0 && props.lng === 0
    let noChosenFriend = props.chosenFriend === ""

    return(
        <div
            className="notificationContainer"
            onMouseLeave={props.setHover}
        >
        
            <div className="flexContainer">

                <div className="notificationInfo">
                    <div className="ellipsesAlign">
                        <IoEllipsisHorizontal
                        onMouseEnter={props.setHoverIndexToday}
                        />
                    </div>
                    <h4 className="notificationDataMessage">{props.message}</h4>
                    <div className="iconAlertDiv">
                        <div><IoAlarmOutline /></div>
                        <div className={noLocationChosen ? "inactiveIcon" : ""}> <HiOutlineLocationMarker /> </div>
                        <div className={noChosenFriend ? "inactiveIcon" : ""}> <FaRegEnvelope /> </div>
                    </div>
                </div>
                
                {props.hoverIndex === props.index && (
                    <div className="notificationBtns">
                        <button onClick={props.handleDelete}> <AiTwotoneDelete /> </button>
                        <button onClick={props.openModal}> <AiFillEdit /> </button>
                    </div>
                )}
                
            </div>
               
        </div>
    )
}