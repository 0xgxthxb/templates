/**
 * ----------------------------------------------------------------------------------------------------
 * Create an Organization Webhook [Run]
 *
 * @description - Create an Organization Webhook using the GitHub API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/orgs#create-an-organization-webhook
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
  const { GITHUB_API_USERNAME, GITHUB_API_TOKEN, org, name, config, events, active } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: `https://api.github.com/orgs/${org}/hooks`,
      auth: { username: GITHUB_API_USERNAME, password: GITHUB_API_TOKEN },
      headers: { accept: "application/vnd.github.v3+json" },
      params: {},
      data: {
        config,
        name,
        ...(events ? { events } : {}),
        ...(active ? { active } : {}),
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
const verifyInput = ({ org, config, name }) => {
  const ERRORS = {
    INVALID_ORG: "A valid org field (string) was not provided in the input.",
    INVALID_CONFIG: "A valid config field (object) was not provided in the input.",
    INVALID_NAME: "A valid name field (string) was not provided in the input.",
  };

  if (typeof org !== "string") throw new Error(ERRORS.INVALID_ORG);
  if (typeof config !== "object") throw new Error(ERRORS.INVALID_CONFIG);
  if (typeof name !== "string") throw new Error(ERRORS.INVALID_NAME);
};