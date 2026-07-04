import { SplitFactory } from '@splitsoftware/splitio';
import { FeatureFlags } from '../types/feature-flag.js';


/*
Split.io SDK docs
https://help.split.io/hc/en-us/articles/360020564931-Node-js-SDK
*/

const { SPLIT_IO_KEY, SPLIT_IO_SECRET } = process.env;
if (!SPLIT_IO_KEY || !SPLIT_IO_SECRET) {
  throw new Error('set SPLIT_IO_KEY and SPLIT_IO_SECRET environment variables');
}
const factory: SplitIO.ISDK = SplitFactory({
  core: {
    authorizationKey: SPLIT_IO_SECRET
  }
});
const client: SplitIO.IClient = factory.client();

const sdkReady = new Promise((resolve, reject) => {
  client.on(client.Event.SDK_READY, () => {
    // FRAGILE: this will never get called if the SPLIT_IO_SECRET is invalid
    console.log('Split.io SDK ready');
    resolve(true);
  });
  client.on(client.Event.SDK_READY_TIMED_OUT, () => {
    reject(new Error('Split.io SDK ready timed out'));
  });
});

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export default async function getFlag(key: FeatureFlags, name?: string | undefined, defaultValue: boolean = false): Promise<boolean> {
  await sdkReady;
  const attributes = {
    user: name ?? 'user'
  }
  var treatment = client.getTreatment(SPLIT_IO_KEY!, key, attributes);
  const value = treatment === 'on' ? true : false;
  return value;
}

export async function getAllFlags(name?: string | undefined): Promise<{ [key: string]: boolean }> {
  // Split.io doesn't have a GetAll in the SDK, only a get by FlagSet
  // https://help.split.io/hc/en-us/articles/360020564931-Node-js-SDK#multiple-evaluations-at-once

  const results = {
    'ONE': await getFlag(FeatureFlags.ONE, name),
    'TWO': await getFlag(FeatureFlags.TWO, name),
    'THREE': await getFlag(FeatureFlags.THREE, name)
  }
  return results;
}
