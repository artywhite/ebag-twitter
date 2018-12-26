const dateFns = require('date-fns');

const getCurrentDateTime = () =>
  dateFns.format(new Date(), 'DD.MM.YYYY HH:mm:ss');

const getCurrentTimestamp = () => Math.round(Date.now() / 1000);

const asyncSleep = seconds => {
  return new Promise((res, rej) => setTimeout(res, seconds * 1000));
};

const callFuncEveryGivenSec = async (seconds, func) => {
  while (true) {
    await func();
    await asyncSleep(seconds);
  }
};

const consoleLogWithDate = str => {
  console.log(`[${getCurrentDateTime()}] ${str}`);
};

const consoleErrorWithDate = input => {
  let s = input;

  if (input instanceof Error) {
    s = `${input.name}: ${input.message}\n${input.stack}`;
  } else if (typeof input === 'object') {
    s = JSON.stringify(input);
  }

  console.error(`[${getCurrentDateTime()}] ${s}`);
};

module.exports = {
  asyncSleep,
  getCurrentDateTime,
  getCurrentTimestamp,
  consoleErrorWithDate,
  consoleLogWithDate,
  callFuncEveryGivenSec,
};
