const mongoose = require('mongoose');

const { getCurrentTimestamp } = require('src/helpers/utils');
const { PHOTO_MODEL_STATUSES } = require('src/constants');

const PhotoModelSchema = new mongoose.Schema({
  post_id: String,
  status: String,
  created_date: Number,
  modified_date: Number,
  photo_url: String,
});

PhotoModelSchema.statics.getNextPost = async function() {
  return await this.findOne({ status: 'new' });
};

PhotoModelSchema.statics.markPostAsPhotoNotAvailable = async function(
  photoModel
) {
  return await this.findOneAndUpdate(
    { _id: photoModel._id },
    {
      status: PHOTO_MODEL_STATUSES.PHOTO_NOT_AVAILABLE,
      modified_date: getCurrentTimestamp(),
    }
  );
};

PhotoModelSchema.statics.markPostAsUploaded = async function(photoModel) {
  return await this.findOneAndUpdate(
    { _id: photoModel._id },
    {
      status: PHOTO_MODEL_STATUSES.UPLOADED,
      modified_date: getCurrentTimestamp(),
    }
  );
};

exports.PhotoModel = mongoose.model('PhotoModel', PhotoModelSchema);
