var distance;

// ID Building Latitude and Longitude
var idb = [41.8231969, -71.4064552];
// CIT Building Latitude and Longitude
var cit = [41.8224994, -71.4118984];

let checkID = false, checkCIT = false;

var geoLocations = [
  {
    loc: 'RISD ID Building',
    locID: 'A',
    lat: 41.8231969,
    long: -71.4064552,
    fenceRadius: .05,
    checkingGeoFence: false
  },
  {
    loc: 'RISD CIT Building',
    locID: 'B',
    lat: 41.8224994,
    long: -71.4118984,
    fenceRadius: .05,
    checkingGeoFence: false
  },
  {
    loc: 'Pawtucket Lofts',
    locID: 'C',
    lat: 41.8791167,
    long: -71.3899453,
    fenceRadius: .05,
    checkingGeoFence: false
  }
];

// Location data of the user
var locationData;


function setup() {
  createCanvas(400, 400);

  // Check for Geo Location Library
  checkForGeoLocLib();

  // Get location data of current position (once)
  getCurrentPosition(initLoc);

  // Get location data everytime user makes a significant change of position
  // watchOptions = {
  //   enableHighAccuracy: true
  // };
  // watchPosition(positionChanged, watchOptions);

}

function draw() {
  // background(220);
}

function insideGeoLocation(position, site) {
  console.log(`Current User Position: ${locationData.latitude}, ${locationData.longitude}`);
  console.log(`User is inside of geo location: ${site.loc}, ${site.lat}, ${site.long}`);
}

function outsideGeoLocation(position, site) {
  console.log(`Current User Position: ${locationData.latitude}, ${locationData.longitude}`);
  console.log(`User is outside of geo location: ${site.loc}, ${site.lat}, ${site.long}`);
  distance = calcGeoDistance(locationData.latitude, locationData.longitude, site.lat, site.long, 'mi');
  print("Distance: " + distance + "mi");
}

function positionChanged(position) {
  updateLocationData(position);
  print("POSITION CHANGED DATA");
  print("lat: " + position.latitude);
  print("long: " + position.longitude);
}

function initLoc(position) {
  updateLocationData(position);
  // Enable higher accuracy of location readings.
  fenceOptions = {
    enableHighAccuracy: true
  };

  // Initialize Geo Locations
  for (let site in geoLocations) {
    // add to global scope;
    let siteObj = geoLocations[site];
    let currentSite = new geoFenceCircle(siteObj.lat, siteObj.long, siteObj.fenceRadius, insideGeoLocation, outsideGeoLocation,'mi', siteObj, fenceOptions);

  }
}


function updateLocationData(position) {
  locationData = position;
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
