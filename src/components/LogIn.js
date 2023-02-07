import React from "react"
import { getLoginToken } from "../functions/fetch"
import { Link } from 'react-router-dom';
import '../App.css';

export function LogIn(props) {
    
    const [email,setEmail] = React.useState("");
    const [password,setPassword] = React.useState("")
    const [error,setError] = React.useState(null);

    const handlePasswordInputChange = (event) => {
        setPassword(event.target.value);
    }

    const handleEmailInputChange = (event) => {
        setEmail(event.target.value)
    }

    const handleLoginAttempt = async () =>{
        try{
            //make a request to create a token
            const {error,token} = await getLoginToken(email,password)
            //check if successful
            if(error){
                throw new Error(error)
            }

            if(!token){
                throw new Error('Something went wrong....')
            }
            // add token to local storage
            localStorage.setItem('TWITTER_TOKEN',token)
            //redirect to Feed.js
            props.history.replace('/')
        }catch(error){
            setError(error)
        }


    }

    return(
        <div className="mainDiv">
            <div>
                <h1>Remember'All</h1>
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
                <Link to="/" className='linkButton' onClick={handleLoginAttempt}>Log in</Link>
            <div>
                <Link to="/" className='linkButton'>Back</Link>
            </div>
        </div>
    )
}
