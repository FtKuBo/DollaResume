import { applyParams, save, ActionOptions } from "gadget-server";

// Powers the form in web/routes/sign-up.jsx

/** @type { ActionRun } */
export const run = async ({ params, record, api, session }) => {
  applyParams(params, record);

  record.lastSignedIn = new Date();
  
  try {
    await save(record);

    if (record.emailVerified) {
      // Assigns the signed-in user to the active session
      session?.set("user", { _link: record.id });
    }

    return {
      result: "ok"
    };
  } catch (error) {
    // Check if error is from unique email constraint
    if (error.message && error.message.includes("unique")) {
      throw new Error("email already exists");
    }
    // Re-throw any other errors
    throw error;
  }
};

/** @type { ActionOnSuccess } */
export const onSuccess = async ({ params, record, logger, api, session }) => {
  if (!record.emailVerified) {
    // Sends verification email by calling api/models/users/actions/sendVerifyEmail.js
    await api.user.sendVerifyEmail({ email: record.email });
  }
};

/** @type { ActionOptions } */
export const options = {
  actionType: "create",
  returnType: true,
  triggers: {
    googleOAuthSignUp: true,
    emailSignUp: true,
  },
};
