import '../App.css';
/* import audioSong from './landingPageIntro.mp3' */
import video from '../smokevideo.mp4'


export function LandingPage(props) {
    const { history } = props;

    // Check if we have a token in local storage
    const token = localStorage.getItem('TWITTER_TOKEN');


    setTimeout(() => {
        // If not - redirect to /login
        if (!token) {
            history.replace('/login');
            return;
        };

        history.replace('/profile');
        return;
    }, 7000)

    return (
        <div>
            <div id="smoke">
                <video style={{ maxWidth: '100vw' }} src={video} muted autoPlay loop />
                <div id="text">Remembr'All</div>
            </div>
        </div>

    );
};



// Else - get info from token and show in UI
/*    const payload = jwtDecode(token);
   this.setState({
       user: payload,
   });  */

// Fetch tweets from server