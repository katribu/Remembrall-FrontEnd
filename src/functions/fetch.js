
const API_URL = 'http://localhost:3333';

// Get all objects from API/Database
export async function getUsersFromServer() {
    const response = await fetch(`${API_URL}/users`);
    const data = response.json();
    return data;
}

// Get login token to sign in
export async function getLoginToken(email, password) {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    });
    const data = await response.json();
    return data;
}

// Get signup info to create user in users table
export async function createNewUser(name, email, password, username) {
    const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            email,
            password,
            username
        })
    });
    const data = await response.json();
    return data;
}


// Get notification information from database according to user.
export async function getUserNotifications() {
    const response = await fetch(`${API_URL}/notifications`, {
        headers: {
            "content-type": "application/json",
            "x-token": localStorage.getItem('TWITTER_TOKEN')
        }
    })
    const data = await response.json()
    return data;
}

export async function createNewRemembrall(type, time, date, lng, lat, slidervalue, message, chosenFriend, subject, notificationText) {
    const response = await fetch(`${API_URL}/setremembrall`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            "x-token": localStorage.getItem('TWITTER_TOKEN')
        },
        body: JSON.stringify({
            type,
            data: {
                time,
                date,
                lng, lat,
                slidervalue,
                message,
                chosenFriend,
                subject,
                notificationText
            }
        })
    });
    const data = await response.json();
    return data;
}


//Function that sends an email and takes in email-adress, subject and message for the email. 
export async function createMail(email, subject, message) {
    const response = await fetch(`${API_URL}/createmail`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            "x-token": localStorage.getItem('TWITTER_TOKEN')
        },
        body: JSON.stringify({
               email, 
               subject, 
               message
        })
    });
};

//Function to delete notifications
export async function deleteNotification(id) {
    const response = await fetch(`${API_URL}/notifications`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id,
        })
    });

    const data = await response.json();
    console.log(data); 
    return data;
}
