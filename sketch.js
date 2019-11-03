var idFence, citFence;
var distance;
var currentLat;
var currentLong;
// ID Building Latitude and Longitude
var idb = [41.8231969, -71.4064552];
// CIT Building Latitude and Longitude
var cit = [41.8224994, -71.4118984];

// Which geo locations are being checked
var checkID = false;
var checkCIT = false;

function setup() {
  createCanvas(400, 400);

  // Check for Geo Location Library
  checkForGeoLocLib();

  // Get location data of current position (once)
  // getCurrentPosition(doThisOnLocation);

  // Get location data everytime user makes a significant change of position
  // watchOptions = {
  //   enableHighAccuracy: true
  // };
  // watchPosition(positionChanged, watchOptions);

  // Enable higher accuracy of location readings.
  fenceOptions = {
    enableHighAccuracy: true
  };
  
  // geoFenceCircle(latitude, longitude, fenceDistance, insideCallback, outsideCallback, units, options)
  // Create a geofence at the ID building and check if user is inside of it
  idFence = new geoFenceCircle(idb[0], idb[1], 0.003, insideID, outsideID, 'mi', fenceOptions);
  // Create a geofence at the CIT building and check if user is inside of it
  citFence = new geoFenceCircle(cit[0], cit[1], 0.003, insideCIT, outsideCIT, 'mi', fenceOptions);
}

function draw() {
  // background(220);
}



function positionChanged(position) {
  print("POSITION CHANGED DATA");
  // Update Latitude and Longitude
  currentLat = position.latitude;
  currentLong = position.longitude;
  print("lat: " + position.latitude);
  print("long: " + position.longitude);
}

function doThisOnLocation(position) {
  print("CURRENT POSITION DATA");
  // Update Latitude and Longitude
  currentLat = position.latitude;
  currentLong = position.longitude;

  print("lat: " + position.latitude);
  print("long: " + position.longitude);
  print("acc: " + position.accuracy);

  // print("alt: " + position.altitude);
  // print("acc-alt: " + position.altitudeAccuracy);
  // print("heading: " + position.heading);
  // print("speed: " + position.speed);
}

function insideID(position) {
  updateLocInfo(position.latitude, position.longitude);
  updateDistInfo(idb[0], idb[1]);
  print("FENCE POSITION DATA");
  print("INlat: " + position.latitude);
  print("INlong: " + position.longitude);
  print("user is inside of the fence");
  background("green");
  // text("WELCOME!", 50, 50);
  text("INlat: " + position.latitude, 50, 50);
  text("INlong: " + position.longitude, 50, 80);
}

function outsideID(position) {
  updateLocInfo(position.latitude, position.longitude);
  updateDistInfo(idb[0], idb[1]);
  print("FENCE POSITION DATA");
  print("OUTlat: " + position.latitude);
  print("OUTlong: " + position.longitude);
  print("user is outside of the fence");
  background("cyan");
  // text("OUT!", 50, 50);
  text("OUTlat: " + position.latitude, 50, 50);
  text("OUTlong: " + position.longitude, 50, 80);
}

function insideCIT(position) {
  updateLocInfo(position.latitude, position.longitude);
  updateDistInfo(cit[0],cit[1]);
  print("FENCE POSITION DATA");
  print("INlat: " + position.latitude);
  print("INlong: " + position.longitude);
  print("user is inside of the fence");
  background("green");
  // text("WELCOME!", 50, 50);
  text("INlat: " + position.latitude, 50, 50);
  text("INlong: " + position.longitude, 50, 80);
}

function outsideCIT(position) {
  updateLocInfo(position.latitude, position.longitude);
  updateDistInfo(cit[0],cit[1]);
  print("FENCE POSITION DATA");
  print("OUTlat: " + position.latitude);
  print("OUTlong: " + position.longitude);
  print("user is outside of the fence");
  background("cyan");
  // text("OUT!", 50, 50);
  text("OUTlat: " + position.latitude, 50, 50);
  text("OUTlong: " + position.longitude, 50, 80);
}

function updateLocInfo(lat, long) {
  currentLat = lat;
  currentLong = long;
}

function updateDistInfo(fenceLat, fenceLong) {
  distance = calcGeoDistance(currentLat, currentLong, fenceLat, fenceLong, 'mi');
  print("Distance: " + distance + "mi");
}

function mousePressed() {
  // Get location data of current position (once)
  getCurrentPosition(doThisOnLocation);

  distance = calcGeoDistance(currentLat, currentLong, idb[0], idb[1], 'mi');
  print("The distance is: " + distance);
}

function keyTyped() {
  if (key === 'a') {
    checkID = !checkID;
    // print to console ID geo fence is activation status
    print(checkID ? "ID Fence Activated" : "ID Fence Deactivated"); 
    print(`checking ID: ${checkID}`);
  } else if (key === "s") {
    checkCIT = !checkCIT;
    // print to console CIT geo fence activation status 
    print(checkCIT ? "CIT Fence Activated" : "CIT Fence Deactivated");
    print(`checking CIT: ${checkCIT}`);
  }
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