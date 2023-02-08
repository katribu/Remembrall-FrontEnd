import { Link } from 'react-router-dom';
import '../App.css';
import { createNewUser } from '../functions/fetch';
import React from "react"

export function SignUp(props) {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState(null);

    const handleNameInputChange = (event) => {
        setName(event.target.value);
    }

    const handleEmailInputChange = (event) => {
        setEmail(event.target.value)
    }

    const handlePasswordInputChange = (event) => {
        setPassword(event.target.value);
    }

    
    const handleSignupAttempt = async () => {
        try {

            const { error, newUser } = await createNewUser(name, email, password);

            // Check if successful
            if (error) {
                throw new Error(error.message)
            }  

            console.log(newUser);

            alert(`${newUser} has been created`)
                
            // Redirect to /login
            props.history.replace('/login');

        } catch (error) {
            setError(error)
        }
    }



    return (
        <div className="mainDiv">
            <div>
                <h1>Remembr'All</h1>
            </div>
            <div>
                <label>Name:</label>
                <input type={"text"}
                 onChange={handleNameInputChange}
                 value={name}
                />
            </div>
            <div>
                <label>Email:</label>
                <input type={"email"}
                onChange={handleEmailInputChange}
                value={email}
                />
            </div>
            <div>
                <label>Password:</label>
                <input type={"password"}
                onChange={handlePasswordInputChange}
                value={password}
                />
            </div>
            <div>
                <button className='linkButton' onClick={handleSignupAttempt}>Create User</button>
            </div>
            <div>
                <Link to="/login" className='linkButton'>Back</Link>
            </div>
        </div>
    )
};