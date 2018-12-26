const { consoleErrorWithDate, asyncSleep } = require('src/helpers/utils');
const { PhotoModel } = require('src/db/models');
const { tweetPhoto } = require('src/lib/twitter');
const CheckPhotoModel = require('src/lib/PhotoModelChecker');
const { downloadImage, removeImage } = require('src/helpers/fs-methods');
const { getRandomTagsString } = require('src/lib/TagsGenerator');

const retrySeconds = 10;

async function postPhotoFlow() {
  try {
    const photoModel = await PhotoModel.getNextPost();

    await CheckPhotoModel(photoModel);

    const { file_path } = await downloadImage(photoModel);

    await tweetPhoto({
      imgPath: file_path,
      statusText: getRandomTagsString(),
    });

    await PhotoModel.markPostAsUploaded(photoModel);
    removeImage(file_path);
  } catch (err) {
    consoleErrorWithDate(err);
    consoleErrorWithDate('Error in postPhoto algorithm');

    if (err instanceof ExpectedError) {
      consoleErrorWithDate(`Retrying postPhoto in ${retrySeconds} seconds`);
      await asyncSleep(retrySeconds);
      postPhotoFlow();
    }
  }
}

module.exports = postPhotoFlow;
