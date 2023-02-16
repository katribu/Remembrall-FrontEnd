import { Link } from 'react-router-dom';
import '../App.css';
import { createNewUser } from '../functions/fetch';
import React from "react"
import { Header } from './Header';
import { Footer } from './Footer';

export function SignUp(props) {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [username, setUsername] = React.useState("");
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

    const handleUsernameInputChange = (event) => {
        setUsername(event.target.value);
    }


    const handleSignupAttempt = async (e) => {
        e.preventDefault()
        try {
            // Sends the inputvalues to create a new user and receives back the '"username" have been created'
            const newUserResponse = await createNewUser(name, email, password, username);

            /*   // Check if successful
              if (error) {
                  throw new Error(error.message)
              }  */


            // Message the user that their account has been created
            alert(`${newUserResponse}`)

            // Redirect to /login
            props.history.replace('/login');

        } catch (error) {
            setError(error)
        }
    }



    return (
        <div className="outerContainer">
            <Header/>
        <div className="flexDiv mainDiv">
            <div>
                <h1>Sign Up</h1>
            </div>
            <form onSubmit={handleSignupAttempt}>
            <div>
               
                <input type={"text"}
                    onChange={handleNameInputChange}
                    value={name}
                    placeholder="Name"
                    className="inputChild"
                    required
                />
            </div>
            <div>
                
                <input type={"text"}
                    onChange={handleUsernameInputChange}
                    value={username}
                    placeholder="Username"
                    className='inputChild'
                    required
                />
            </div>
            <div>
              
                <input type={"email"}
                    onChange={handleEmailInputChange}
                    value={email}
                    placeholder='Email'
                    className='inputChild'
                    required
                />
            </div>
            <div>
                <input type={"password"}
                    onChange={handlePasswordInputChange}
                    value={password}
                    placeholder='Password'
                    className='inputChild'
                    required
                />
            </div>
        
            <div className="buttonDiv">
                <div>
                    <input type="submit" className='linkButton' value="Create User"/>
                </div>
                <div>
                    <Link to="/login" className='linkButton'>Back</Link>
                </div>
            </div>
            </form>
        </div>
        <Footer/>
        </div>
    )
};

// onClick={handleSignupAttempt}