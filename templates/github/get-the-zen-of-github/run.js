/**
 * ----------------------------------------------------------------------------------------------------
 * Get the Zen of GitHub [Run]
 *
 * @description - Get the Zen of GitHub using the GitHub API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/en/enterprise-server@3.3/rest/reference/meta#get-the-zen-of-github
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
  const { GITHUB_API_USERNAME, GITHUB_API_TOKEN } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "get",
      url: "https://api.github.com/zen",
      auth: { username: GITHUB_API_USERNAME, password: GITHUB_API_TOKEN },
      headers: { accept: "application/vnd.github.v3+json" },
      params: {},
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
const verifyInput = () => {
  const ERRORS = {};
};
