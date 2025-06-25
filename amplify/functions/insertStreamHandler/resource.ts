import { defineFunction } from "@aws-amplify/backend";

export const insertStreamHandler = defineFunction({
  name: "insertStreamHandler",
  entry: "./handler.ts",
  environment: {
    NODE_OPTIONS: "--enable-source-maps",
    AMPLIFY_DATA_DEFAULT_NAME: "data",
  },
  resourceGroupName: "data",
});
