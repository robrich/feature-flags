import db from './database.js';
import { type FeatureFlag, FeatureFlags } from '../types/feature-flag.js';
import type { UserFlag } from '@/types/user-flag.js';


// FRAGILE: value coming back from DB is an int, not a boolean

export default async function getFlag(key: FeatureFlags, name: string | undefined): Promise<boolean> {
  if (!key) {
    throw new Error('Key is required');
  }
  const row = await db.get('SELECT value FROM FeatureFlag WHERE key = ?', [key]);

  let value = row?.value === 1;

  if (name) {
    const userRow = await db.get('SELECT value FROM UserFlag WHERE userId = (SELECT id FROM User WHERE name = ?) AND featureFlagKey = ?', [name, key]);
    if (userRow) {
      value = userRow.value === 1;
    }
  }

  return value;
}

export async function getAllFlags(name: string | undefined): Promise<{ [key: string]: boolean }> {
  const rows: FeatureFlag[] = await db.all('SELECT key, value FROM FeatureFlag', []);
  const results = Object.fromEntries(rows.map(({ key, value }) => [key, !!value]));

  if (name) {
    const userFlags: UserFlag[] = await db.all('SELECT featureFlagKey, value FROM UserFlag WHERE userId = (SELECT id FROM User WHERE name = ?)', [name]);
    for (const { featureFlagKey, value } of userFlags) {
      results[featureFlagKey] = !!value;
    }
  }

  return results;
}
