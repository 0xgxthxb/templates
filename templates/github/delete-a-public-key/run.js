/**
 * ----------------------------------------------------------------------------------------------------
 * Delete a Public Key [Run]
 *
 * @description - Delete a Public Key using the GitHub API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/enterprise-admin#delete-a-public-key
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
  const { GITHUB_API_USERNAME, GITHUB_API_TOKEN, key_ids } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "delete",
      url: `https://api.github.com/admin/keys/${key_ids}`,
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
const verifyInput = ({ key_ids }) => {
  const ERRORS = {
    INVALID_KEY_IDS: "A valid key_ids field (string) was not provided in the input.",
  };

  if (typeof key_ids !== "string") throw new Error(ERRORS.INVALID_KEY_IDS);
};
