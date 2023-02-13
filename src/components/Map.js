// For the Markers to show up in React version 18+ need to import as "MarkerF" due to the App running strict mode.
import { GoogleMap, MarkerF, StandaloneSearchBox, Circle, LoadScriptNext, DistanceMatrixService } from '@react-google-maps/api';
import React from 'react';

const MY_MAP_KEY = 'AIzaSyCO2T57yToSRLuaPbtEaQqNV26wpK4i0EY';

const containerStyle = {
  width: '100vw',
  height: '400px'
};

// Need to have places as a prop in the Loaded Script tag. StackOverflow said to put it outside the component to keep it from
// Infinitly rendering (or add as state inside the component)
const lib = ['places']

export default function Map(props) {

  const { location, onCoordinatesChanged, slidervalue } = props;
  const [currentLocation, setCurrentLocation] = React.useState({ lat: 0, lng: 0 })
  const [searchBox, setSearchBox] = React.useState(null);

  const onMapLoad = () => {
    navigator.geolocation.watchPosition(
      ({ coords: { latitude: lat, longitude: lng } }) => {
        setCurrentLocation({ lat, lng });
      }
    );
  }

  // Returns the lat/lng based on the position we search for in the searchfield
  const onPlacesChanged = () => {
    let result = searchBox.getPlaces()
    let coordinates = result.map(coords => {
      return {
        lat: coords.geometry.location.lat(),
        lng: coords.geometry.location.lng()
      }
    })

    onCoordinatesChanged(coordinates[0])
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
      <LoadScriptNext libraries={lib} googleMapsApiKey={MY_MAP_KEY}>

        <GoogleMap
          mapContainerStyle={containerStyle}
          center={currentLocation}
          zoom={12}
          onLoad={onMapLoad}
        >

          <Circle
            position={location}
            center={location}
            radius={Number(slidervalue)}
            options={{
              fillColor: 'red',
              fillOpacity: 0.20,
              strokeColor: 'red',
              strokeOpacity: 1,
              strokeWeight: 1,
            }}
          />

          <MarkerF
            position={currentLocation}
            onClick={() => alert(`Your current position is: Latitude: ${defaultProps.center.lat} Longtitude: ${defaultProps.center.lng}`)}
          />

          {/* <DistanceMatrixService
          options={{
                    destinations: [location],
                    origins: [currentLocation],
                    travelMode: "WALKING",
                  }}
          callback = {(response) => {
            console.log(response)
            const distanceValue = response.rows[0].elements[0].distance.value

            if(distanceValue <= Number(slidervalue)){
              console.log('You have reached your destination radius. Remember to do task.')
              alert(`this is an alert`)
            }
          }}
          /> */}

          {/* Marker that comes from the search field.
          <MarkerF
            position={location}
          /> */}

          <StandaloneSearchBox
            onLoad={onSBLoad}
            onPlacesChanged={onPlacesChanged}
          >
            <input
              type="text"
              placeholder="Type in place or address"
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
      </LoadScriptNext>
    </div>
  );
}
