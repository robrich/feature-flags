import { Client } from '@harnessio/ff-nodejs-server-sdk';
import { FeatureFlags } from '../types/feature-flag.js';


/*
Harness.io SDK docs
https://developer.harness.io/docs/feature-flags/use-ff/ff-sdks/server-sdks/node-js-sdk-reference
*/

const HARNESS_IO_KEY = process.env.HARNESS_IO_KEY;
if (!HARNESS_IO_KEY) {
  throw new Error('set HARNESS_IO_KEY environment variable');
}
const client = new Client(HARNESS_IO_KEY);


export default async function getFlag(key: FeatureFlags, name?: string | undefined, defaultValue: boolean = false): Promise<boolean> {
  const target = {
    identifier: 'demo',
    name: 'name',
    attributes: {
       name
    }
  };

  const value = await client.boolVariation(key, target, defaultValue);
  return value;
}

export async function getAllFlags(name?: string | undefined): Promise<{ [key: string]: boolean }> {
  // Harness doesn't have a GetAll in the SDK
  // https://apidocs.harness.io/tag/Feature-Flags/#operation/GetAllFeatures

  const results = {
    'ONE': await getFlag(FeatureFlags.ONE, name),
    'TWO': await getFlag(FeatureFlags.TWO, name),
    'THREE': await getFlag(FeatureFlags.THREE, name)
  }
  return results;
}
