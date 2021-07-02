// iss.js

const request = require('request');

//------------------------------------------------------------------------------
// Fetch IP

const fetchMyIP = (callback) => {
  const url = 'https://api.ipify.org?format=json';

  request(url, (error, response, body) => {
    // On error
    if (error) return callback(error, null);

    // Check response
    if (response.statusCode !== 200) {
      const msg =
        `Status Code ${response.statusCode} when fetching ` + `IP: ${body}`;
      return callback(Error(msg), null);
    }

    // All good
    const ip = JSON.parse(body).ip;
    return callback(null, ip);
  });
};

//------------------------------------------------------------------------------
// Fetch coordinates

const fetchCoordsByIP = (ip, callback) => {
  const url = `https://freegeoip.app/json/${ip}`;

  request(url, (error, response, body) => {
    // On error
    if (error) return callback(error, null);

    // Check response
    if (response.statusCode !== 200) {
      const msg =
        `Status Code ${response.statusCode} when fetching` +
        ` coordinates: ${body}`;
      return callback(Error(msg), null);
    }

    // All good
    const { latitude, longitude } = JSON.parse(body);
    return callback(null, { latitude, longitude });
  });
};

//------------------------------------------------------------------------------
// Fetch fly over pass times

const fetchISSFlyOverTimes = (coord, callback) => {
  const url =
    `http://api.open-notify.org/iss/v1/` +
    `?lat=${coord.latitude}&lon=${coord.longitude}&n=5`;

  request(url, (error, response, body) => {
    // On error
    if (error) return callback(error, null);

    // Check response
    if (response.statusCode !== 200) {
      const msg =
        `Status Code ${response.statusCode} when fetching` +
        ` ISS pass times: ${body}`;
      return callback(Error(msg), null);
    }

    // All good
    const times = JSON.parse(body).response;
    return callback(null, times);
  });
};

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results.
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */

const nextISSTimesForMyLocation = function (callback) {
  fetchMyIP((error, ip) => {
    if (error) return callback(error, null);

    fetchCoordsByIP(ip, (error, coord) => {
      if (error) return callback(error, null);

      fetchISSFlyOverTimes(coord, (error, times) => {
        if (error) return callback(error, null);

        callback(null, times);
      });
    });
  });
};

module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation,
};
