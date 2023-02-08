// For the Markers to show up in React version 18+ need to import as "MarkerF" due to the App running strict mode.
import { GoogleMap, MarkerF, StandaloneSearchBox, LoadScript } from '@react-google-maps/api';
import React from 'react';

const MY_MAP_KEY = 'AIzaSyCO2T57yToSRLuaPbtEaQqNV26wpK4i0EY';

const containerStyle = {
  width: '100vw',
  height: '400px'
};


// Need to have places as a prop in the Loaded Script tag. StackOverflow said to put it outside the component to keep it from
// Infinitly rendering. (or add as state inside the componenet)
const lib = ['places']

// Map positioned at Oslo long and lat.
const center = {
  lat: 59.911491,
  lng: 10.757933,
}

export default function Map(props) {
  const [currentLocation, setCurrentLocation] = React.useState({ lat: 0, lng: 0 })
  const [searchBox, setSearchBox] = React.useState(null);
  // const [markers, setMarkers] = React.useState([])


  const onMapLoad = () => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude: lat, longitude: lng } }) => {
        setCurrentLocation({ lat, lng });
      }
    );
  }


  const onPlacesChanged = () => console.log(searchBox.getPlaces());
  const onSBLoad = ref => {
    setSearchBox(ref);
  }

/*   const onPlacesChanged = () => {
    let markerArray = [];
    let results = searchBox.getPlaces();
    for (let i = 0; i < results.length; i++) {
      let place = results[i].geometry.location;
      markerArray.push(place);
    }
    setMarkers(markerArray);
    console.log(markers);
  }; */

  const defaultProps = {
    center: currentLocation,
    zoom: 11
  }

  return (
    // Important! Always set the container height explicitly

    <div style={{ height: '100vh', width: '100%' }}>
      <LoadScript libraries={lib} googleMapsApiKey={MY_MAP_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onLoad={onMapLoad}
        >
          <MarkerF
            position={currentLocation}
            onClick={() => alert(`Your current position is: Latitude: ${defaultProps.center.lat} Longtitude: ${defaultProps.center.lng}`)}
          />

          <StandaloneSearchBox
            onLoad={onSBLoad}
            onPlacesChanged={onPlacesChanged}
          >
            <input
              type="text"
              placeholder="Customized your placeholder"
              style={{
                boxSizing: `border-box`,
                border: `1px solid transparent`,
                width: `240px`,
                height: `32px`,
                padding: `0 12px`,
                borderRadius: `3px`,
                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                fontSize: `14px`,
                outline: `none`,
                textOverflow: `ellipses`,
                position: "absolute",
                left: "50%",
                marginLeft: "-120px"
              }}
            />

          </StandaloneSearchBox>

        </GoogleMap>
      </LoadScript>
    </div>
  );
}
