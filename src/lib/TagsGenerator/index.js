const sampleSize = require('lodash/sampleSize');

const { TAGS_STRING } = require('src/config');

const TAGS_AMOUNT = 3;

const getRandomTagsString = () => {
  const selectedTags = sampleSize(TAGS_STRING.split(','), TAGS_AMOUNT);
  return selectedTags.map(item => `#${item}`).join(' ');
};

module.exports = { getRandomTagsString };
