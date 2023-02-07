
export default function geoTest(latitude,longitude) {
    navigator.geolocation.getCurrentPosition(function (position) {
        if (latitude === position.coords.latitude && longitude === position.coords.longitude) {
            alert(`You are currently at latitude ${latitude} and longitude ${longitude}`)
        }
    });
}

function getCurrentLatitude() {
    navigator.geolocation.getCurrentPosition(function(position){
        return position.coords.latitude;
    })
}

export {getCurrentLatitude}


//Shahin's coordinates
// const latitude = 59.9195648;
// const longitude = 10.780672;


// Updates location once location is changed
/* navigator.geolocation.watchPosition(function (position) {
    console.log("Latitude is :", position.coords.latitude);
    console.log("Longitude is :", position.coords.longitude);
}); */