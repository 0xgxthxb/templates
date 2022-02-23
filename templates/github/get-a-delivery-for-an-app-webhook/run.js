/**
 * ----------------------------------------------------------------------------------------------------
 * Get a Delivery for an App Webhook [Run]
 *
 * @description - Get a Delivery for an App Webhook using the GitHub API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/apps#get-a-delivery-for-an-app-webhook
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
  const { GITHUB_API_USERNAME, GITHUB_API_TOKEN, delivery_id } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "get",
      url: `https://api.github.com/app/hook/deliveries/${delivery_id}`,
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
const verifyInput = ({ delivery_id }) => {
  const ERRORS = {
    INVALID_DELIVERY_ID: "A valid delivery_id field (number) was not provided in the input.",
  };

  if (typeof delivery_id !== "number") throw new Error(ERRORS.INVALID_DELIVERY_ID);
};
