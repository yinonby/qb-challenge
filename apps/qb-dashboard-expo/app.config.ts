
import dotenv from 'dotenv';
import type { ConfigContext, ExpoConfig } from 'expo/config';
import type { ExpoEnvVarsT } from './src/types/ExpoTypes';

dotenv.config({ override: true, path: "../../.env" }); // load env file
dotenv.config({ override: true, path: `../../.env.${process.env.NODE_ENV}` }); // load env-specific env file
dotenv.config({ override: true, path: `../../.env.${process.env.NODE_ENV}.local` }); // load env-specific secrets file

// env vars that don't start with expo prefix are not accessible in expo app, so we
// plant them inside 'extra' config, and read them again in the _layout, where we send their values down to the app
export function getExpoEnvVars(): ExpoEnvVarsT {
  const apiUrl = process.env.QB_ENV__API_URL;
  if (apiUrl === undefined) {
    throw new Error("Missing env var: QB_ENV__API_URL");
  }

  return {
    apiUrl,
    appHeaderHeight: 64,
    productsPerPage: 12,
  }
}

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: config.name || "",
  slug: config.slug || "",
  extra: {
    ...config.extra,
    env: {
      expoEnvVars: getExpoEnvVars(),
    },
  },
});
