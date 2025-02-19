import { load } from '@azure/app-configuration-provider';
import { FeatureManager, ConfigurationMapFeatureFlagProvider} from '@microsoft/feature-management';
import { FeatureFlags } from '../types/feature-flag.js';


/*
Azure App Configuration docs:
- https://learn.microsoft.com/en-us/azure/azure-app-configuration/quickstart-azure-app-configuration-create?tabs=azure-portal#create-an-app-configuration-store
- https://learn.microsoft.com/en-us/azure/azure-app-configuration/quickstart-feature-flag-javascript
*/


const AZURE_APP_CONFIG = process.env.AZURE_APP_CONFIG;
if (!AZURE_APP_CONFIG) {
  throw new Error('set AZURE_APP_CONFIG environment variable');
}

const settings = await load(AZURE_APP_CONFIG, {
  featureFlagOptions: {
    enabled: true,
    selectors: [{
      keyFilter: '*' // must specify selector
    }],
    refresh: {
      enabled: true,
      refreshIntervalInMs: 10_000
    }
  }
});

const ffProvider = new ConfigurationMapFeatureFlagProvider(settings);
const fm = new FeatureManager(ffProvider);

export default async function getFlag(key: FeatureFlags): Promise<boolean> {
  const value = await fm.isEnabled(key);
  return value;
}

export async function getAllFlags(): Promise<{ [key: string]: boolean }> {
  // Azure App Config doesn't have a GetAll in the SDK

  const results = {
    'ONE': await getFlag(FeatureFlags.ONE),
    'TWO': await getFlag(FeatureFlags.TWO),
    'THREE': await getFlag(FeatureFlags.THREE)
  }
  return results;
}
