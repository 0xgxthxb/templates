/**
 * ----------------------------------------------------------------------------------------------------
 * List Workflow Runs [Run]
 *
 * @description - List Workflow Runs using the GitHub API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/actions#list-workflow-runs
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
    GITHUB_API_USERNAME,
    GITHUB_API_TOKEN,
    owner,
    repo,
    workflow_id,
    actor,
    branch,
    event,
    status,
    per_page,
    page,
    created,
    exclude_pull_requests,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "get",
      url: `https://api.github.com/repos/${owner}/${repo}/actions/workflows/${workflow_id}/runs`,
      auth: { username: GITHUB_API_USERNAME, password: GITHUB_API_TOKEN },
      headers: { accept: "application/vnd.github.v3+json" },
      params: {
        ...(actor ? { actor } : {}),
        ...(branch ? { branch } : {}),
        ...(event ? { event } : {}),
        ...(status ? { status } : {}),
        ...(per_page ? { per_page } : {}),
        ...(page ? { page } : {}),
        ...(created ? { created } : {}),
        ...(exclude_pull_requests ? { exclude_pull_requests } : {}),
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
const verifyInput = ({ owner, repo, workflow_id }) => {
  const ERRORS = {
    INVALID_OWNER: "A valid owner field (string) was not provided in the input.",
    INVALID_REPO: "A valid repo field (string) was not provided in the input.",
    INVALID_WORKFLOW_ID: "A valid workflow_id field (number) was not provided in the input.",
  };

  if (typeof owner !== "string") throw new Error(ERRORS.INVALID_OWNER);
  if (typeof repo !== "string") throw new Error(ERRORS.INVALID_REPO);
  if (typeof workflow_id !== "number") throw new Error(ERRORS.INVALID_WORKFLOW_ID);
};