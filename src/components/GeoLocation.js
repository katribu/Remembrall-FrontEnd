import GoogleMapReact from 'google-map-react';
import React from 'react';

const GOOGLE_MAP_API_KEY = 'AIzaSyBeb5Xps4ARfD70ETVn372OWj2KLzwPNzs'


const AnyReactComponent = ({ text }) => <div>{text}</div>;

export function GeoLocation(){
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627
    },
    zoom: 11
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: GOOGLE_MAP_API_KEY }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={59.955413}
          lng={30.337844}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
  );
}


/* 
const AnyReactComponent = ({ text }) => (
    <div style={{
      color: 'white', 
      background: 'grey',
      padding: '15px 10px',
      display: 'inline-flex',
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '100%',
      transform: 'translate(-50%, -50%)'
    }}>
      {text}
    </div>
  );

  const handleApiLoaded = (map, maps) => {
    // use map and maps objects
    yesIWantToUseGoogleMapApiInternals = true; 
  };

  export class GeoLocation extends Component {

    
    
    static defaultProps = {
      center: {lat: 59.95, lng: 30.33},
      zoom: 11
    };

   
  
    render() {
      return (
         <GoogleMapReact
         bootstrapURLKeys={{ key: {GOOGLE_MAP_API_KEY} }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        >
          <AnyReactComponent 
            lat={59.955413} 
            lng={30.337844} 
            text={'Kreyser Avrora'} 
          />
        </GoogleMapReact>
      );
    } }

 */