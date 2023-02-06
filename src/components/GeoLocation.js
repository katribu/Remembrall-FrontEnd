import { GoogleMap, Marker } from '@react-google-maps/api';
import React from 'react';

// Irgen's API key
// const GOOGLE_MAP_API_KEY = 'AIzaSyBeb5Xps4ARfD70ETVn372OWj2KLzwPNzs'

const containerStyle = {
  width: '100vw',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};


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
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={defaultProps.center}
          zoom={10}
        >
        
          <Marker position={defaultProps.center} onLoad={() => console.log('added marker')} />
          <Marker position={center} onLoad={() => console.log('added marker')} />
        </GoogleMap>
        </div>
  );
}
