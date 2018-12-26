const path = require('path');

const dotenv = require('dotenv');

dotenv.config();

const isDev = process.env.NODE_ENV === 'development';

exports.TWITTER_CREDENTIALS = {
  ACCESS_TOKEN: process.env.TWITTER_ACCESS_TOKEN,
  ACCESS_TOKEN_SECRET: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  API_KEY: process.env.TWITTER_API_KEY,
  API_KEY_SECRET: process.env.TWITTER_API_KEY_SECRET,
};

exports.TAGS_STRING = process.env.TAGS_STRING;
exports.postIntervalInSeconds = 240 * 60;

// TODO: find out why second '../' is needed
exports.DOWNLOAD_TEMP_DIR_PATH = path.resolve(
  __dirname,
  '../../',
  'download_temp'
);

exports.DB_CONNECT_PATH = isDev
  ? 'mongodb://localhost/twitter_ebag'
  : 'mongodb://ebag-twitter-db/twitter_ebag';
