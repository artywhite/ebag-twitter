const fs = require('fs');
const Twit = require('twit');

const { TWITTER_CREDENTIALS } = require('src/config');
const { consoleErrorWithDate, consoleLogWithDate } = require('src/helpers/utils');

const T = new Twit({
  consumer_key: TWITTER_CREDENTIALS.API_KEY,
  consumer_secret: TWITTER_CREDENTIALS.API_KEY_SECRET,
  access_token: TWITTER_CREDENTIALS.ACCESS_TOKEN,
  access_token_secret: TWITTER_CREDENTIALS.ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
  strictSSL: true, // optional - requires SSL certificates to be valid.
});

exports.tweetPhoto = async function({ imgPath, statusText, altText = '' }) {
  const b64content = fs.readFileSync(imgPath, { encoding: 'base64' });

  try {
    // first we must post the media to Twitter
    const { data: uploadData } = await T.post('media/upload', {
      media_data: b64content,
    });
    // now we can assign alt text to the media, for use by screen readers and
    // other text-based presentations and interpreters
    let mediaIdStr = uploadData.media_id_string;
    let meta_params = { media_id: mediaIdStr };

    await T.post('media/metadata/create', meta_params);
    // now we can reference the media and post a tweet (media will attach to the tweet)
    let params = {
      status: statusText,
      media_ids: [mediaIdStr],
    };

    const { data: statusUpdateData } = await T.post('statuses/update', params);
    consoleLogWithDate(`TweetPhoto success: ${statusUpdateData.id}`);
  } catch (err) {
    consoleErrorWithDate('ERROR in tweetPhoto:')
    consoleErrorWithDate(err);
  }
};
