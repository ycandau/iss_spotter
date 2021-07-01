// index.js

const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

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
