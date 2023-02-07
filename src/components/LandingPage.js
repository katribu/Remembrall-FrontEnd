import { Link } from 'react-router-dom';
import '../App.css';

const headerStyle = {
    color: 'red', 
}



export function LandingPage() {


    return(
        <div className="mainDiv">
            <div>
                <h1 style={{headerStyle}}>Remember'All</h1>
            </div>
            <div>
                <Link to="/login" className='linkButton'>Log in</Link>
            </div>
            <div>
                <Link to="/signup" className='linkButton'>Sign up</Link>
            </div>
        </div>
    )
}

export function LogIn() {
    return(
        <div className="mainDiv">
            <div>
                <h1 style={{headerStyle}}>Remember'All</h1>
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
            </div>
                <Link to="/login" className='linkButton'>Log in</Link>
            <div>
                <Link to="/" className='linkButton'>Back</Link>
            </div>
        </div>
    )
}

export function SignUp() {
    return(
        <div className="mainDiv">
            <div>
                <h1 style={{headerStyle}}>Remember'All</h1>
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
                <label>Password</label>
                <input type={"password"}></input>
            </div>
            <div>
                <Link to="/signup" className='linkButton'>Sign up</Link>
            </div>
            <div>
                <Link to="/" className='linkButton'>Back</Link>
            </div>
        </div>
    )
}