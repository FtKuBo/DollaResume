// Sets up the API client for interacting with your backend. 
// For your API reference, visit: https://docs.gadget.dev/api/dollaresume
import { Client } from "@gadget-client/dollaresume";

export const api = new Client({ environment: window.gadgetConfig.environment });
