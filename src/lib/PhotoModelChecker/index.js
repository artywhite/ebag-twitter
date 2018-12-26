const includes = require('lodash/includes');
const request = require('request');

const { PhotoModel } = require('src/db/models');
const { ExpectedError } = require('src/helpers/errors');
const { consoleErrorWithDate } = require('src/helpers/utils');

const SUCCESS_STATUS_CODES = [200];
const SUPPORTED_IMAGES_CONTENT_TYPES = ['image/jpeg', 'image/png'];

const awaitRequest = url =>
  new Promise((res, rej) => {
    request(url, (err, response, body) => {
      if (err) {
        return rej(err);
      }

      res({ body, response });
    });
  });

const checkResponse = response => {
  const statusCode = response.statusCode;
  const contentType = response.headers['content-type'];
  const url = response.request.href;

  if (!includes(SUCCESS_STATUS_CODES, statusCode)) {
    throw new ExpectedError(
      `Unsuccessful status code given: '${statusCode}' while getting ${url}`
    );
  }

  if (!includes(SUPPORTED_IMAGES_CONTENT_TYPES, contentType)) {
    throw new ExpectedError(
      `Unsupported 'content-type' given: '${contentType}' while getting ${url}`
    );
  }

  // TODO: check 'content-length' ?
};

const requestFile = async url => {
  try {
    return await awaitRequest(url);
  } catch (err) {
    consoleErrorWithDate(err);
    throw new ExpectedError('Photo url is not available');
  }
};

async function checkPhotoModel(photoModel) {
  const { photo_url } = photoModel;

  try {
    const { response } = await requestFile(photo_url);
    checkResponse(response);
  } catch (e) {
    consoleErrorWithDate('ERROR in checkPhotoModel');
    PhotoModel.markPostAsPhotoNotAvailable(photoModel);

    throw e;
  }
}

module.exports = checkPhotoModel;
