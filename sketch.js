var idFence, citFence;
var distance;
var currentLat;
var currentLong;
// ID Building Latitude and Longitude
var idb = [41.8231969, -71.4064552];
// CIT Building Latitude and Longitude
var cit = [41.8224994, -71.4118984];

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

// Which geo locations are being checked
var checkID = false;
var checkCIT = false;

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

  // // Enable higher accuracy of location readings.
  // fenceOptions = {
  //   enableHighAccuracy: true
  // };
  //
  // for (let site in geoLocations) {
  //   // add to global scope
  //   // window[`fence${site.locID}`] = new geoFenceCircle(site.lat, site.long, site.fenceRadius, insideFence, outsideFence, 'mi', fenceOptions);
  //   let siteObj = geoLocations[site];
  //   let currentSite = window[`fence${site.locID}`];
  //   currentSite = new geoFenceCircle(site.lat, site.long, site.fenceRadius);
  //   if (currentSite.insideFence) {
  //     console.log("inside of fence!");
  //   } else {
  //     console.log(locationData.latitude);
  //   }
  //
  // }


}

function draw() {
  // background(220);
}

function insideGeoLocation(position, site) {
  console.log(`Current User Position: ${locationData.latitude}, ${locationData.longitude}`);
  console.log(`User is inside of geo location: ${site.loc}, ${site.lat}, ${site.long}`);
}

function outsideGeoLocation(position, obj) {
  console.log(position);
  console.log(obj);
  // console.log(`Current User Position: ${locationData.latitude}, ${locationData.longitude}`);
  // console.log(`User is outside of geo location: ${site.loc}, ${site.lat}, ${site.long}`);
  // distance = calcGeoDistance(locationData.latitude, locationData.longitude, site.lat, site.long, 'mi');
  // print("Distance: " + distance + "mi");
}

function positionChanged(position) {
  print("POSITION CHANGED DATA");
  // Update Latitude and Longitude
  currentLat = position.latitude;
  currentLong = position.longitude;
  print("lat: " + position.latitude);
  print("long: " + position.longitude);
}

function initLoc(position) {
  locationData = position;
  // Enable higher accuracy of location readings.
  fenceOptions = {
    enableHighAccuracy: true
  };

  // Initialize Geo Locations
  for (let site in geoLocations) {
    // add to global scope
    // window[`fence${site.locID}`] = new geoFenceCircle(site.lat, site.long, site.fenceRadius, insideFence, outsideFence, 'mi', fenceOptions);
    let siteObj = geoLocations[site];
    // let currentSite = window[`fence${site.locID}`];
    // console.log(currentSite);
    // let currentSite = new geoFenceCircle(site.lat, site.long, site.fenceRadius);
    let currentSite = new geoFenceCircle(siteObj.lat, siteObj.long, siteObj.fenceRadius, insideGeoLocation, outsideGeoLocation,'mi', siteObj, fenceOptions);
    console.log(currentSite);
    // if (currentSite.insideFence) {
    //   insideGeoLocation(siteObj);
    // } else {
    //   outsideGeoLocation(siteObj);
    // }

  }


  // print("CURRENT POSITION DATA");
  // Update Latitude and Longitude
  // currentLat = position.latitude;
  // currentLong = position.longitude;
  // print("lat: " + position.latitude);
  // print("long: " + position.longitude);
  // print("acc: " + position.accuracy);
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
