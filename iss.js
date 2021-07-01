// iss.js

const request = require('request');

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

const fetchCoordsByIP = (ip, callback) => {
  const url = `https://freegeoip.app/json/${ip}`;
  request(url, (error, response, body) => {
    // On error
    if (error) return callback(error, null);

    // Check response
    if (response.statusCode !== 200) {
      const msg =
        `Status Code ${response.statusCode} when fetching` +
        ` coordinates for IP: ${body}`;
      return callback(Error(msg), null);
    }

    // All good
    const { latitude, longitude } = JSON.parse(body);
    return callback(null, { latitude, longitude });
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP };
