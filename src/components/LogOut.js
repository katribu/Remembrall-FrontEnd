import React from "react"

export function LogOut(props) {

    const { history } = props;

    localStorage.removeItem('TWITTER_TOKEN')
    history.replace('/login')

    return (
        <div>Logging out</div>
    )
}

