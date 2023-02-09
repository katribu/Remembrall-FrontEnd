import React from "react"
import { getLoginToken } from "../functions/fetch"
import { Link } from 'react-router-dom';
import '../App.css';
import { Profile } from "./Profile";
import { Smoke } from "./Smoke";

export function LogIn(props) {

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState(null);

    const handlePasswordInputChange = (event) => {
        setPassword(event.target.value);
    }

    const handleEmailInputChange = (event) => {
        setEmail(event.target.value)
    }

    // Check if you are logged in - lines 16 -24
    const { history } = props;

    // Check if we have a token in local storage
    const token = localStorage.getItem('TWITTER_TOKEN');

    // If no token in local storage - redirect to /login
    if (token) {
        history.replace('/profile');
        return;
    }

    const handleLoginAttempt = async () => {
        try {
            // Make a request to create a token
            const { error, token } = await getLoginToken(email, password);

            // Check if successful
            if (error) {
                throw new Error(error)
            }

            if (!token) {
                throw new Error('Something went wrong...')
            }

            // Add token to local storage
            localStorage.setItem('TWITTER_TOKEN', token)

            // Redirect to /profile
            props.history.replace('/profile')

        } catch (error) {
            setError(error)
        }
    }





    return (
        <div className="mainDiv">
             <Smoke/>
            <div>
                <h1>Remembr'All</h1>
            </div>
            <div>
                <label>Email:</label>
                <input
                    type={"email"}
                    onChange={handleEmailInputChange}
                    value={email}
                ></input>
            </div>
            <div>
                <label>Password:</label>
                <input
                    type={"password"}
                    onChange={handlePasswordInputChange}
                    value={password}
                ></input>
            </div>
            <div>
            </div>
            <button className='linkButton' onClick={handleLoginAttempt}>Log in</button>
            <div>
                <Link to="/signup" className='linkButton'>Create account</Link>
            </div>

            {/* If error is truthy, show error message under the button */}
            {error && <div>{error.message}</div>}

        </div>
    )
}
