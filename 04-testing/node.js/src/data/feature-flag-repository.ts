import db from './database.js';
import { type FeatureFlag, FeatureFlags } from '../types/feature-flag.js';


// FRAGILE: value coming back from DB is an int, not a boolean

export default async function getFlag(key: FeatureFlags): Promise<boolean> {
  const row: FeatureFlag = await db.get('SELECT value FROM FeatureFlag WHERE key = ?', [key]);
  return !!(row?.value);
}

export async function getAllFlags(): Promise<{ [key: string]: boolean }> {
  const rows: FeatureFlag[] = await db.all('SELECT key, value FROM FeatureFlag', []);
  const results = Object.fromEntries(rows.map(({ key, value }) => [key, !!value]));
  return results;
}
