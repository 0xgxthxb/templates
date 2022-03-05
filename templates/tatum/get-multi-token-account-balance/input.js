/**
 * ----------------------------------------------------------------------------------------------------
 * Get Multi Token Account Balance [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/MultiTokenGetBalance
 * ----------------------------------------------------------------------------------------------------
 */

/**
 * Lets you select the input for your Node's run function
 *
 * @param {Params} params
 * @param {Object} $trigger - This Flow's request object
 * @param {Object} $nodes - Data from above Nodes
 */
const nodeInput = ({ $trigger, $nodes }) => {
  return {
    TATUM_API_KEY: $trigger.env.TATUM_API_KEY, // Required
    TATUM_API_URL: $trigger.env.TATUM_API_URL, // Required
    chain: `ETH`, // Required
    address: `0x3223AEB8404C7525FcAA6C512f91e287AE9FfE7B`, // Required
    contractAddress: `0x94Ce79B9F001E25BBEbE7C01998A78F7B27D1326`, // Required
    tokenId: `100`, // Required

    // testnetType: `ethereum-ropsten`,
  };
};
