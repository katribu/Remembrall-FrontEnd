import React from "react"
import { GiHamburgerMenu } from "react-icons/gi";

export function Header(){
    return(
        <header className="header">
            <h4 className="headerTitle">Remembr'All</h4>
            <div className="hamburgerIcon"><GiHamburgerMenu/></div>
        </header>
    )
}