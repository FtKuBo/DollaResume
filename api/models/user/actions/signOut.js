import { ActionOptions } from "gadget-server";

/** @type { ActionRun } */
export const run = async ({ params, record, logger, api, session }) => {
  // Removes the user from the active session
  session?.set("user", null);
};

/** @type { ActionOptions } */
export const options = {
  actionType: "update",
  triggers: {
    signOut: true,
  },
};
