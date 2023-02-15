import React from "react"
import { getLoginToken } from "../functions/fetch"
import { Link } from 'react-router-dom';
import '../App.css';
import { Header } from "./Header";
import { Footer } from "./Footer";

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
        <div className="outerContainer">
        <Header/>
        <div className="flexDiv mainDiv">
            <div>
                <h1 className="logInTitle">Log In to <br/><span className="logoFont">Remembr'All</span></h1>
            </div>

            <div className="loginInputs">
                <div className="emailDiv">
                    <input
                        type={"email"}
                        onChange={handleEmailInputChange}
                        value={email}
                        className="inputChild"
                        placeholder={"Email"}
                    ></input>
                </div><br/>
                <div>
                    <input
                        type={"password"}
                        onChange={handlePasswordInputChange}
                        value={password}
                        placeholder={"Password"}
                        className="inputChild"
                        onKeyDown={(e) => {if (e.key === 'Enter'){handleLoginAttempt()}}}
                    ></input>
                </div>
            </div>

            <div className="buttonDiv">
                <button className='linkButton logInBtn' onClick={handleLoginAttempt}>Log in</button>
                <div>
                    <Link to="/signup" className='linkButton'>Create account</Link>
                </div>
            </div>
            {/* If error is truthy, show error message under the button */}
            {error && <div>{error.message}</div>}

        </div>
        <Footer/>
        </div>
    )
}
