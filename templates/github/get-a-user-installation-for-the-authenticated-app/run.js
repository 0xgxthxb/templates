/**
 * ----------------------------------------------------------------------------------------------------
 * Get a User Installation for the Authenticated App [Run]
 *
 * @description - Get a User Installation for the Authenticated App using the GitHub API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/apps#get-a-user-installation-for-the-authenticated-app
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
  const { GITHUB_API_USERNAME, GITHUB_API_TOKEN, username } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "get",
      url: `https://api.github.com/users/${username}/installation`,
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
const verifyInput = ({ username }) => {
  const ERRORS = {
    INVALID_USERNAME: "A valid username field (string) was not provided in the input.",
  };

  if (typeof username !== "string") throw new Error(ERRORS.INVALID_USERNAME);
};