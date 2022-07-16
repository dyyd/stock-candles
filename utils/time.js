const { intervalMilliseconds } = require('../config');

// Find UNIX timestamp of the current interval (in milliseconds)
// from the given timestamp
function currentIntervalStart(timestamp) {
  const intervalHours = Math.floor(intervalMilliseconds / 3600000);
  const intervalMinutes = Math.floor(intervalMilliseconds / 60000);
  const intervalSeconds = Math.floor(intervalMilliseconds / 1000);

  const date = new Date(timestamp);
  if (intervalHours > 1) {
    date.setHours(0);
  }
  if (intervalMinutes > 1) {
    date.setMinutes(0);
  }
  if (intervalSeconds > 1) {
    date.setSeconds(0);
  }
  date.setMilliseconds(0);
  return date.getTime();
};

// Find UNIX timestamp of the next minute (in milliseconds)
// from the given timestamp
function nextIntervalStart(timestamp) {
  const date = currentIntervalStart(timestamp) + intervalMilliseconds;
  return date;
}

module.exports = {
  currentIntervalStart,
  nextIntervalStart
};
