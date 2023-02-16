const API_URL = 'http://localhost:3333';


// Creating a webtoken upon login
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


// Register new user's info in database
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


// Get notification information from database matched by webtoken
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


// Register new Remembr'alls info in database
export async function createNewRemembrall(type, time, date, lat, lng, slidervalue, message, chosenFriend, subject, notificationText) {
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
                lat,
                lng,
                slidervalue,
                message,
                chosenFriend,
                subject,
                notificationText, 
            }
        })
    });
    const data = await response.json();
    return data;
}


// Function for sending e-mail (Npm package)
export async function createMail(email, subject, message) {
    await fetch(`${API_URL}/createmail`, {
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

export async function updateLastNotifiedNotification(id) {
    await fetch(`${API_URL}/lastnotified`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            "x-token": localStorage.getItem('TWITTER_TOKEN')
        },
        body: JSON.stringify({
              id
        })
    });

}


// Function to delete notification matched by id
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
    return data;
}
