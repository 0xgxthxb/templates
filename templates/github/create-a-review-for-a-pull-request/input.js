/**
 * ----------------------------------------------------------------------------------------------------
 * Create a Review for a Pull Request [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/pulls#create-a-review-for-a-pull-request
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
    GITHUB_API_USERNAME: $trigger.env.GITHUB_API_USERNAME, // Required for private repos or if making structural changes (i.e modifying branch protection rules)
    GITHUB_API_TOKEN: $trigger.env.GITHUB_API_TOKEN, // Required for private repos or if making structural changes (i.e modifying branch protection rules)
    owner: "string", // Required
    repo: "string", // Required
    pull_number: 0, // Required

    // commit_id: "string",
    // body: "string",
    // event: "APPROVE",
    // comments: [{"path":"string","position":0,"body":"string","line":28,"side":"RIGHT","start_line":26,"start_side":"LEFT"}],
  };
};