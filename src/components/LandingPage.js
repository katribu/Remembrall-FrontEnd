import '../App.css';


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


