/**
 * ----------------------------------------------------------------------------------------------------
 * Search Issues and Pull Requests [Run]
 *
 * @description - Search issues and pull requests using the Github API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/search#search-issues-and-pull-requests
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
    q,
    sort,
    order,
    per_page,
    page,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "get",
      url: "https://api.github.com/search/issues",
      auth: { password: GITHUB_API_TOKEN, username: GITHUB_API_USERNAME },
      params: {
        q,
        ...(sort ? { sort } : {}),
        ...(order ? { order } : {}),
        ...(per_page ? { per_page } : {}),
        ...(page ? { page } : {}),
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
const verifyInput = ({ GITHUB_API_TOKEN, GITHUB_API_USERNAME, q }) => {
  const ERRORS = {
    INVALID_GITHUB_API_TOKEN:
      "A valid GITHUB_API_TOKEN field (string) was not provided in the input.",
    INVALID_GITHUB_API_USERNAME:
      "A valid GITHUB_API_USERNAME field (string) was not provided in the input.",
    INVALID_Q: "A valid q field (string) was not provided in the input.",
  };

  if (typeof GITHUB_API_TOKEN !== "string")
    throw new Error(ERRORS.INVALID_GITHUB_API_TOKEN);
  if (typeof GITHUB_API_USERNAME !== "string")
    throw new Error(ERRORS.INVALID_GITHUB_API_USERNAME);
  if (typeof q !== "string") throw new Error(ERRORS.INVALID_Q);
};
