// For the Markers to show up in React version 18+ need to import as "MarkerF" due to the App running strict mode.
import { GoogleMap, MarkerF, StandaloneSearchBox, LoadScript, Marker } from '@react-google-maps/api';
import React from 'react';

const MY_MAP_KEY = 'AIzaSyCO2T57yToSRLuaPbtEaQqNV26wpK4i0EY';

const containerStyle = {
  width: '100vw',
  height: '400px'
};

// Need to have places as a prop in the Loaded Script tag. StackOverflow said to put it outside the component to keep it from
// Infinitly rendering. (or add as state inside the componenet)
const lib = ['places']

// Map positioned at Oslo lng and lat.
const center = {
  lat: 59.911491,
  lng: 10.757933,
}

export default function Map(props) {
  const [currentLocation, setCurrentLocation] = React.useState({ lat: 0, lng: 0 })
  const [searchBox, setSearchBox] = React.useState(null);
  const [markers, setMarkers] = React.useState({ lat: 0, lng: 0 })


  const onMapLoad = () => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude: lat, longitude: lng } }) => {
        setCurrentLocation({ lat, lng });
      }
    );
  }

  //Katrina updated this function.... 
  const onPlacesChanged = () => {
    let result = searchBox.getPlaces()
    let coordinates = result.map(coords => {
      return {
        lat:coords.geometry.location.lat(),
        lng:coords.geometry.location.lng()
      }
    })
    console.log(coordinates)

 /*    setMarkers(markers => [...markers, coordinates]); */
    setMarkers(coordinates[0]);

    // get an empty array logged out.....
    let lat = result[0].geometry.location.lat()
    let lng = result[0].geometry.location.lng()


    // console.log(result)
    console.log(`lat:${lat},lng:${lng}`)
  };
  const onSBLoad = ref => {
    setSearchBox(ref);
  };

  const defaultProps = {
    center: currentLocation,
    zoom: 11
  };

  

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

          {/* Marker that comes from the search field. */}
          <MarkerF 
            position={markers}
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
