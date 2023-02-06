

export default function geoTest() {
    navigator.geolocation.getCurrentPosition(function (position) {
        const latitude = 59.9195648;
        const longitude = 10.780672;
        if (latitude === position.coords.latitude && longitude === position.coords.longitude) {
            alert(`You are currently at latitude ${latitude} and longitude ${longitude}`)
        }
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
    });
}

geoTest();






// Updates location once location is changed
/* navigator.geolocation.watchPosition(function (position) {
    console.log("Latitude is :", position.coords.latitude);
    console.log("Longitude is :", position.coords.longitude);
}); */