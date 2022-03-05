/**
 * ----------------------------------------------------------------------------------------------------
 * Send XLM From Address to Address [Run]
 *
 * @description - Send xlm from address to address using the Tatum API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/XlmTransferBlockchain
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
  const { TATUM_API_URL, TATUM_API_KEY, fromSecret, amount, to, fromAccount, initialize, message } =
    input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: `${TATUM_API_URL}/v3/xlm/transaction`,
      headers: { "x-api-key": `${TATUM_API_KEY}` },
      params: {},
      data: {
        fromSecret,
        amount,
        to,
        fromAccount,
        ...(initialize ? { initialize } : {}),
        ...(message ? { message } : {}),
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
const verifyInput = ({ TATUM_API_KEY, TATUM_API_URL, fromSecret, amount, to, fromAccount }) => {
  const ERRORS = {
    INVALID_TATUM_API_KEY: "A valid TATUM_API_KEY field (string) was not provided in the input.",
    INVALID_TATUM_API_URL: "A valid TATUM_API_URL field (string) was not provided in the input.",
    INVALID_FROM_SECRET: "A valid fromSecret field (string) was not provided in the input.",
    INVALID_AMOUNT: "A valid amount field (string) was not provided in the input.",
    INVALID_TO: "A valid to field (string) was not provided in the input.",
    INVALID_FROM_ACCOUNT: "A valid fromAccount field (string) was not provided in the input.",
  };

  if (typeof TATUM_API_KEY !== "string") throw new Error(ERRORS.INVALID_TATUM_API_KEY);
  if (typeof TATUM_API_URL !== "string") throw new Error(ERRORS.INVALID_TATUM_API_URL);
  if (typeof fromSecret !== "string") throw new Error(ERRORS.INVALID_FROM_SECRET);
  if (typeof amount !== "string") throw new Error(ERRORS.INVALID_AMOUNT);
  if (typeof to !== "string") throw new Error(ERRORS.INVALID_TO);
  if (typeof fromAccount !== "string") throw new Error(ERRORS.INVALID_FROM_ACCOUNT);
};
