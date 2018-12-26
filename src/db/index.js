const mongoose = require('mongoose');

const { DB_CONNECT_PATH } = require('src/config');
const { consoleErrorWithDate, consoleLogWithDate } = require('src/helpers/utils');

const mongooseInit = async () => {
  const db = mongoose.connection;

  db.on('error', err => {
    consoleErrorWithDate('db connection error');
    consoleLogWithDate(JSON.stringify(err));
  });

  db.on('open', () => {
    consoleLogWithDate('db connected');
  });

  await mongoose.connect(DB_CONNECT_PATH, { useNewUrlParser: true });
};

module.exports = {
  mongooseInit,
}