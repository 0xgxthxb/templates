/**
 * ----------------------------------------------------------------------------------------------------
 * Full Archive Search Counts [Run]
 *
 * @description - Full archive search counts using the Twitter API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://developer.twitter.com/en/docs/api-reference-index#twitter-api-v2
 *
 * ----------------------------------------------------------------------------------------------------
 */

const axios = require("axios");
const qs = require("qs");

/**
 * The Node’s executable function
 *
 * @param {Run} input - Data passed to your Node from the input function
 */
const run = async (input) => {
  const {
    TWITTER_BEARER_TOKEN,
    query,
    start_time,
    end_time,
    since_id,
    until_id,
    next_token,
    pagination_token,
    granularity,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "get",
      url: "https://api.twitter.com/2/tweets/counts/all",
      headers: { Authorization: `Bearer ${TWITTER_BEARER_TOKEN}` },
      params: {
        query,
        ...(start_time ? { start_time } : {}),
        ...(end_time ? { end_time } : {}),
        ...(since_id ? { since_id } : {}),
        ...(until_id ? { until_id } : {}),
        ...(next_token ? { next_token } : {}),
        ...(pagination_token ? { pagination_token } : {}),
        ...(granularity ? { granularity } : {}),
      },
      paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: "comma" });
      },
    });

    return data;
  } catch (error) {
    return {
      failed: true,
      message: error.message,
      data: error.response.data,
    };
  }
};

/**
 * Verifies the input parameters
 */
const verifyInput = ({ TWITTER_BEARER_TOKEN, query }) => {
  const ERRORS = {
    INVALID_TWITTER_BEARER_TOKEN:
      "A valid TWITTER_BEARER_TOKEN field (string) was not provided in the input.",
    INVALID_QUERY:
      "A valid query field (string) was not provided in the input.",
  };

  if (typeof TWITTER_BEARER_TOKEN !== "string")
    throw new Error(ERRORS.INVALID_TWITTER_BEARER_TOKEN);
  if (typeof query !== "string") throw new Error(ERRORS.INVALID_QUERY);
};
