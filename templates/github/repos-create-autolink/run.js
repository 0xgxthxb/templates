/**
 * ----------------------------------------------------------------------------------------------------
 * Create an Autolink Reference for a Repository [Run]
 *
 * @description - Create an autolink reference for a repository using the Github API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/v3/repos#create-an-autolink
 *
 * ----------------------------------------------------------------------------------------------------
 */

const axios = require("axios");

/**
 * The Node’s executable function
 *
 * @param {Run} input - Data passed to your Node from the input function
 */
const run = async (input) => {
  const {
    GITHUB_API_TOKEN,
    GITHUB_API_USERNAME,
    owner,
    repo,
    key_prefix,
    url_template,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: `https://api.github.com/repos/${owner}/${repo}/autolinks`,
      auth: { password: GITHUB_API_TOKEN, username: GITHUB_API_USERNAME },
      data: { key_prefix, url_template },
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
const verifyInput = ({
  GITHUB_API_TOKEN,
  GITHUB_API_USERNAME,
  owner,
  repo,
  key_prefix,
  url_template,
}) => {
  const ERRORS = {
    INVALID_GITHUB_API_TOKEN:
      "A valid GITHUB_API_TOKEN field (string) was not provided in the input.",
    INVALID_GITHUB_API_USERNAME:
      "A valid GITHUB_API_USERNAME field (string) was not provided in the input.",
    INVALID_OWNER:
      "A valid owner field (string) was not provided in the input.",
    INVALID_REPO: "A valid repo field (string) was not provided in the input.",
    INVALID_KEY_PREFIX:
      "A valid key_prefix field (string) was not provided in the input.",
    INVALID_URL_TEMPLATE:
      "A valid url_template field (string) was not provided in the input.",
  };

  if (typeof GITHUB_API_TOKEN !== "string")
    throw new Error(ERRORS.INVALID_GITHUB_API_TOKEN);
  if (typeof GITHUB_API_USERNAME !== "string")
    throw new Error(ERRORS.INVALID_GITHUB_API_USERNAME);
  if (typeof owner !== "string") throw new Error(ERRORS.INVALID_OWNER);
  if (typeof repo !== "string") throw new Error(ERRORS.INVALID_REPO);
  if (typeof key_prefix !== "string")
    throw new Error(ERRORS.INVALID_KEY_PREFIX);
  if (typeof url_template !== "string")
    throw new Error(ERRORS.INVALID_URL_TEMPLATE);
};
