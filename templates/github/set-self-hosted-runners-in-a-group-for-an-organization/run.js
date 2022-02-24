/**
 * ----------------------------------------------------------------------------------------------------
 * Set Self-Hosted Runners in a Group for an Organization [Run]
 *
 * @description - Set Self-Hosted Runners in a Group for an Organization using the GitHub API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/actions#set-self-hosted-runners-in-a-group-for-an-organization
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
  const { GITHUB_API_USERNAME, GITHUB_API_TOKEN, org, runner_group_id, runners } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "put",
      url: `https://api.github.com/orgs/${org}/actions/runner-groups/${runner_group_id}/runners`,
      auth: { username: GITHUB_API_USERNAME, password: GITHUB_API_TOKEN },
      headers: { accept: "application/vnd.github.v3+json" },
      params: {},
      data: { runners },
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
const verifyInput = ({ org, runner_group_id, runners }) => {
  const ERRORS = {
    INVALID_ORG: "A valid org field (string) was not provided in the input.",
    INVALID_RUNNER_GROUP_ID:
      "A valid runner_group_id field (number) was not provided in the input.",
    INVALID_RUNNERS: "A valid runners field (object) was not provided in the input.",
  };

  if (typeof org !== "string") throw new Error(ERRORS.INVALID_ORG);
  if (typeof runner_group_id !== "number") throw new Error(ERRORS.INVALID_RUNNER_GROUP_ID);
  if (typeof runners !== "object") throw new Error(ERRORS.INVALID_RUNNERS);
};