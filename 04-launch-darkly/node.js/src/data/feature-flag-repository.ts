import * as ld from '@launchdarkly/node-server-sdk';
import { FeatureFlags } from '../types/feature-flag.js';


/*
LaunchDarkly SDK docs
https://docs.launchdarkly.com/sdk/server-side/node-js
*/

const LAUNCH_DARKLY_SDK_KEY = process.env.LAUNCH_DARKLY_SDK_KEY;
if (!LAUNCH_DARKLY_SDK_KEY) {
  throw new Error('set LAUNCH_DARKLY_SDK_KEY environment variable');
}
const client = ld.init(LAUNCH_DARKLY_SDK_KEY);


export default async function getFlag(key: FeatureFlags, name?: string | undefined, defaultValue: boolean = false): Promise<boolean> {
  // A context is a person, service, or machine
  // https://docs.launchdarkly.com/sdk/features/context-config
  const context = {
    kind: 'user',
    key: 'demo',
    name: name,
  };

  const value = await client.variation(key, context, defaultValue);
  return value;
}

export async function getAllFlags(name?: string | undefined): Promise<{ [key: string]: boolean }> {
  const context = {
    kind: 'user',
    key: 'demo',
    name: name,
  };

  const flags = await client.allFlagsState(context);
  const json = flags.toJSON() as { [key: string]: boolean };
  const keys = Object.keys(json);
  keys.filter(k => k.startsWith('$')).forEach(k => delete json[k]);
  return json;
}
