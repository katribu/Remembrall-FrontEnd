import React from "react";


// Logout
export function LogOut(props) {
    const { history } = props;

    // Delete webtoken from localstorage 
    localStorage.removeItem('TWITTER_TOKEN')
    history.replace('/login')

    return (
        <div>Logging out</div>
    )
}

