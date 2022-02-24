/**
 * ----------------------------------------------------------------------------------------------------
 * Update Records [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://airtable.com/api
 *
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
    AIRTABLE_API_KEY: $trigger.env.AIRTABLE_API_KEY, // Required
    AIRTABLE_BASE_ID: $trigger.env.AIRTABLE_BASE_ID, // Required
    endpoint: "https://api.airtable.com/v0", // Required
    tableName: "Table 1", // Required

    // Required - Array of objects to insert
    records: [
      {
        id: "recZ3d3YqKJ0OKdxv",
        fields: {
          Name: "Fred",
        },
      },
    ],
  };
};