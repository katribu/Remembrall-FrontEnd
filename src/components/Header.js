import React, {useState, useRef, useEffect} from "react"
import { GiHamburgerMenu } from "react-icons/gi";
import { SlLogout } from "react-icons/sl";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";


// Header
export function Header(){
    const [open, setOpen] = useState(false)
    let menuRef = useRef()

    useEffect(()=>{
        let handler = (e)=>{
            if(!menuRef.current.contains(e.target)){
              setOpen(false);
              console.log(menuRef.current);
            }      
          };
      
          document.addEventListener("mousedown", handler);
          
      
          return() =>{
            document.removeEventListener("mousedown", handler);
          }
    })

    return(
        <header className="header">
            <h4 className="headerTitle">Remembr'All</h4>
            <div 
            className="hamburgerIcon"
            onClick={()=>setOpen(!open)}
            >
                <GiHamburgerMenu/>
            </div>

            { open && 
            <div className={`dropdownMenu ${open ? "active" : "inactive"}`} ref={menuRef}>
                <Dropdown icon={<SlLogout/>} text={"Log out"} to={"/logout"} />
                <Dropdown icon={<CgProfile/>} text={"Profile"} to={"/profile"} />
            </div>}
        </header>
    )
}

function Dropdown(props){
    return(
        <div className="dropdownItem">
            <div className="dropdownIcon">{props.icon}</div>
            <div> <Link to={props.to} className="dropdownLink">{props.text}</Link></div>
        </div>
    )
}