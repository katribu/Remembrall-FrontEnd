const headerStyle = {
    color: 'red', 
}

const buttonStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '6px 14px',
    fontFamily:'sansSerif',
    borderRadius: '6px',
    color: '#3D3D3D',
    background: '#fff',
    border: 'none',
    boxShadow: '0px 0.5px 1px rgba(0, 0, 0, 0.1)',
    userSelect: 'none',
    webkitUserSelect: 'none',
    touchAction: 'manipulation',
}


export function LandingPage() {


    return(
        <div>
            <h1 style={{headerStyle}}>Remberer'All</h1>
            <button style={{buttonStyle}}>Log in</button>
            <button style={{buttonStyle}}>Sign up</button>
        </div>
    )
}

export function LogIn() {
    return(
        <div>
            <h1 style={{headerStyle}}>Remberer'All</h1>
            <div>
                <label>Email:</label>
                <input></input>
            </div>
            <div>
                <label>Password:</label>
                <input></input>
            </div>
            <div>
                <button style={{buttonStyle}}>Log in</button>
            </div>
        </div>
    )
}

export function SignUp() {
    return(
        <div>
            <h1 style={{headerStyle}}>Remberer'All</h1>
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
                <button style={{buttonStyle}}>Sign up</button>
            </div>
        </div>
    )
}