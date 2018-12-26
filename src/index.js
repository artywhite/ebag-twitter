#!/usr/bin/env node

const { postIntervalInSeconds } = require('src/config');
const { mongooseInit } = require('src/db');
const postPhotoFlow = require('src/flows/post-photo');
const {
  callFuncEveryGivenSec,
  consoleErrorWithDate,
  consoleLogWithDate,
} = require('src/helpers/utils');

const init = async () => {
  try {
    await mongooseInit();

    consoleLogWithDate(
      `Starting background process: postPhotoFlow with ${postIntervalInSeconds} interval (in seconds)`
    );

    callFuncEveryGivenSec(postIntervalInSeconds, postPhotoFlow);
  } catch (err) {
    consoleErrorWithDate(err);
  }
};

init();
