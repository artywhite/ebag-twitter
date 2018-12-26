const path = require('path');
const fs = require('fs');

const request = require('request');

const { DOWNLOAD_TEMP_DIR_PATH } = require('src/config');

const checkForTempDir = async path => {
  try {
    fs.mkdirSync(path);
  } catch (err) {
    if (err.code !== 'EEXIST') {
      throw err;
    }
  }
};

const downloadImage = async photoModel => {
  await checkForTempDir(DOWNLOAD_TEMP_DIR_PATH);

  const file_name = `${photoModel.post_id}_${photoModel.photo_url
    .split('/')
    .pop()}`;

  const file_path = path.resolve(DOWNLOAD_TEMP_DIR_PATH, file_name);

  const { body } = await new Promise((resolve, reject) =>
    request(
      photoModel.photo_url,
      { encoding: 'binary' },
      (err, response, body) => {
        if (err) {
          reject(err);
          return;
        }

        resolve({ body });
      }
    )
  );

  fs.writeFileSync(file_path, body, { encoding: 'binary', mode: 0o777 });

  return { file_path, file_name };
};

const removeImage = file_path => {
  fs.unlinkSync(file_path);
};

module.exports = {
  downloadImage,
  removeImage,
};
