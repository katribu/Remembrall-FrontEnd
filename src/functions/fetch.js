

const API_URL = 'http://localhost:3333'

export async function getUsersFromServer() {
    const response = await fetch(`${API_URL}/users`); 
    const data = response.json(); 

    return data; 
}