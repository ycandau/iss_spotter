// iss_promised.js

const request = require('request-promise-native');

const fetchMyIP = () => request('https://api.ipify.org?format=json');

const fetchCoordsByIP = (body) => {
  const ip = JSON.parse(body).ip;
  return request(`https://freegeoip.app/json/${ip}`);
};

const fetchISSFlyOverTimes = (body) => {
  const { latitude, longitude } = JSON.parse(body);
  return request(
    `http://api.open-notify.org/iss/v1/` +
      `?lat=${latitude}&lon=${longitude}&n=5`
  );
};

const logPassTimes = (body) => {
  JSON.parse(body).response.forEach((time) => {
    const date = new Date(time.risetime * 1000);
    console.log(`Next pass at ${date} for ${time.duration} seconds!`);
  });
};

nextISSTimesForMyLocation = () =>
  fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then(logPassTimes)
    .catch((error) => console.log('It didn`t work:\n', error));

module.exports = {
  nextISSTimesForMyLocation,
};
