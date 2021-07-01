const request = require('request');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = (callback) => {
  const url = 'https://api.ipify.org?format=json';
  request(url, (error, response, body) => {
    // On error
    if (error) {
      callback(error, null);
      return;
    }

    // Check response
    if (response.statusCode !== 200) {
      const msg =
        `Status Code ${response.statusCode} when fetching IP.\n` +
        `Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    // All good
    const json = JSON.parse(body);
    return callback(null, json.ip);
  });
};

module.exports = { fetchMyIP };
