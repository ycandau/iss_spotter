const { fetchMyIP } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) return console.log('Unable to fetch IP:\n', error);
  console.log(ip);
});
