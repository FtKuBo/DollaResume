import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "user" model, go to https://dollaresume.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "_zexUnL3WKwX",
  fields: {
    email: {
      type: "email",
      validations: {
        required: true,
        unique: { caseSensitive: true },
      },
      storageKey: "QeLisFW6VQgu",
    },
    emailVerificationToken: {
      type: "string",
      storageKey: "cmWtP6kRQYon",
    },
    emailVerificationTokenExpiration: {
      type: "dateTime",
      includeTime: true,
      storageKey: "J07Z4xAdW2uG",
    },
    emailVerified: {
      type: "boolean",
      default: false,
      storageKey: "dQ7KNWGJGEzy",
    },
    firstName: { type: "string", storageKey: "j5y07RZN4A-P" },
    googleImageUrl: { type: "url", storageKey: "XgW3HP3eQezx" },
    googleProfileId: { type: "string", storageKey: "MF0AYO68D25U" },
    lastName: { type: "string", storageKey: "Y0trIOGJRCJe" },
    lastSignedIn: {
      type: "dateTime",
      includeTime: true,
      storageKey: "JXzPAlUzBrcr",
    },
    password: {
      type: "password",
      validations: { strongPassword: true },
      storageKey: "EgzqYDQvSADQ",
    },
    phoneNumber: {
      type: "string",
      storageKey: "_zexUnL3WKwX-phoneNumber",
    },
    resetPasswordToken: {
      type: "string",
      storageKey: "YTeCFaj9kR14",
    },
    resetPasswordTokenExpiration: {
      type: "dateTime",
      includeTime: true,
      storageKey: "lxxvQx-o8-xP",
    },
    roles: {
      type: "roleList",
      default: ["unauthenticated"],
      storageKey: "VH8ftdABQc9z",
    },
  },
};
