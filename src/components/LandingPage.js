import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import jwtDecode from 'jwt-decode';


const headerStyle = {
    color: 'red',
};

export function LandingPage(props) {
    const { history } = props;

    // Check if we have a token in local storage
    const token = localStorage.getItem('TWITTER_TOKEN');

    // If not - redirect to /login
    if (!token) {
        history.replace('/login');
        return;
    };

    // Else - get info from token and show in UI
    /*    const payload = jwtDecode(token); 
       this.setState({
           user: payload,
       });  */

    // Fetch tweets from server
    history.replace('/profile');

    return;
};


export function SignUp() {
    return (
        <div className="mainDiv">
            <div>
                <h1 style={{ headerStyle }}>Remembr'All</h1>
            </div>
            <div>
                <label>Name:</label>
                <input type={"text"}></input>
            </div>
            <div>
                <label>Email:</label>
                <input type={"email"}></input>
            </div>
            <div>
                <label>Password:</label>
                <input type={"password"}></input>
            </div>
            <div>
                <Link to="/signup" className='linkButton'>Sign Up</Link>
            </div>
            <div>
                <Link to="/" className='linkButton'>Back</Link>
            </div>
        </div>
    )
};