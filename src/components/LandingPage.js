import '../App.css';
import video from '../smokevideo.mp4'


// LandingPage
export function LandingPage(props) {
    const { history } = props;

    // Check if a token is in local storage
    const token = localStorage.getItem('TWITTER_TOKEN');

    setTimeout(() => {
        // If no token - redirect to /login
        if (!token) {
            history.replace('/login');
            return;
        };

        // If token - redirect to /profile
        history.replace('/profile');
        return;
    }, 7000)

    // Rendering the component
    return (
        <div>
            <div id="smoke">
                <video style={{ width: '100%' }} src={video} muted autoPlay loop />
                <div id="text">Remembr'All</div>
            </div>
        </div>

    );
};

