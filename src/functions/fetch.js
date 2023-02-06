
const API_URL = 'http://localhost:3333';

// Get all objects from API/Database
export async function getUsersFromServer() {
    const response = await fetch(`${API_URL}/users`);
    const data = response.json();

    return data;
}