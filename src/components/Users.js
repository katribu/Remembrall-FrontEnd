import { getUsersFromServer } from "../functions/fetch";



export async function Users() {
// need to use Hooks if we are to use functional components with async JS!!!
    const users = await getUsersFromServer(); 

    const user =  await users.map(user => {
        return <h1>{user.name}</h1>
    })
    console.log(user)
    return user;
}