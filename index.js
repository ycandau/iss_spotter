// index.js

const {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation,
} = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) return console.log('Unable to fetch IP:\n', error);
//   console.log(ip);
// });

// fetchCoordsByIP('69.172.159.165', (error, coord) => {
//   if (error) return console.log('Unable to fetch coordinates:\n', error);
//   console.log(coord);
// });

// fetchISSFlyOverTimes(
//   { latitude: -49.2643, longitude: -123.0961 },
//   (error, times) => {
//     if (error) return console.log('Unable to fetch pass times:\n', error);
//     console.log(times);
//   }
// );

const logPassTimes = (error, passTimes) => {
  if (error) return console.log("It didn't work!", error);
  passTimes.forEach((time) => {
    const date = new Date(time.risetime * 1000);
    console.log(`Next pass at ${date} for ${time.duration} seconds!`);
  });
};

nextISSTimesForMyLocation(logPassTimes);
