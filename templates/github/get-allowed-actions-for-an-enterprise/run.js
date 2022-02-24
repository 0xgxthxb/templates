/**
 * ----------------------------------------------------------------------------------------------------
 * Get Allowed Actions for an Enterprise [Run]
 *
 * @description - Get Allowed Actions for an Enterprise using the GitHub API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/enterprise-admin#get-allowed-actions-for-an-enterprise
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
  const { GITHUB_API_USERNAME, GITHUB_API_TOKEN, enterprise } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "get",
      url: `https://api.github.com/enterprises/${enterprise}/actions/permissions/selected-actions`,
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
const verifyInput = ({ enterprise }) => {
  const ERRORS = {
    INVALID_ENTERPRISE: "A valid enterprise field (string) was not provided in the input.",
  };

  if (typeof enterprise !== "string") throw new Error(ERRORS.INVALID_ENTERPRISE);
};