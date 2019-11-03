// geo location data
var locationData;

function preload() {
  locationData = getCurrentPosition();
  console.log("preload complete");
}

function setup() {
  createCanvas(400, 400);
  // Check for Geo Location Library
  checkForGeoLocLib();
  // console.log(locationData.latitude);
  // print(locationData.longitude)
  // print(locationData.accuracy)
  // print(locationData.altitude)
  // print(locationData.altitudeAccuracy)
  // print(locationData.heading)
  // print(locationData.speed)
  console.log("Setup complete");
}

function draw() {
  background(220);
}

function checkForGeoLocLib() {
  if (geoCheck() == true) {
    //geolocation is available
    console.log("Geolocation is available");
  } else {
    //error getting geolocation
    console.log("Error getting geolocation");
  }
}

// lat: 41.8231969 
// long: -71.4064552
