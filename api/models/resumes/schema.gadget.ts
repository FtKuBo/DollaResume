import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "resumes" model, go to https://dollaresume.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "1gJIeSZv__Ae",
  fields: {
    queries: {
      type: "json",
      validations: { required: true },
      storageKey: "L1k1P42CCR1B",
    },
    userEmail: {
      type: "email",
      validations: { required: true },
      storageKey: "T5qw3QPhn9Cb",
    },
  },
};
