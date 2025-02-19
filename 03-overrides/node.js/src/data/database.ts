import { open } from 'promised.sqlite';
import { type FeatureFlag, FeatureFlags } from '../types/feature-flag.js';
import type { UserFlag } from '@/types/user-flag.js';


const dbFile = process.env.DB_FILE;
if (!dbFile) {
  throw new Error('DB_FILE environment variable is required');
}

const db = await open(dbFile);

// TODO: a CI tool should do this instead:
await db.run(`CREATE TABLE IF NOT EXISTS FeatureFlag (
  key TEXT PRIMARY KEY,
  value BOOLEAN
)`);

await db.run(`CREATE TABLE IF NOT EXISTS User (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT
)`);

await db.run(`CREATE TABLE IF NOT EXISTS UserFlag (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId INTEGER,
  featureFlagKey TEXT,
  value BOOLEAN,
  FOREIGN KEY(userId) REFERENCES User(id),
  FOREIGN KEY(featureFlagKey) REFERENCES FeatureFlag(key)
)`);

export type CountRow = {
  count: number
}

const countRow = await db.get('SELECT COUNT(*) AS count FROM FeatureFlag', []) as CountRow;

if (countRow?.count === 0) {
  let sql = 'INSERT INTO FeatureFlag (key, value) VALUES (?, ?)';

  const data: FeatureFlag[] = [
    { key: FeatureFlags.ONE, value: Math.random() > 0.5 },
    { key: FeatureFlags.TWO, value: Math.random() > 0.5 },
    { key: FeatureFlags.THREE, value: Math.random() > 0.5 }
  ];
  console.log('Setting up fake feature flag data', data);
  for (const flag of data) {
    await db.run(sql, [flag.key, flag.value ? 1 : 0]);
  }

  const users = ['Jon', 'Jane'];
  console.log('Setting up fake user data', users);
  for (const name of users) {
    const { lastID } = await db.run('INSERT INTO User (name) VALUES (?)', [name]);
    const userData: UserFlag[] = [
      { id: 0, userId: lastID, featureFlagKey: FeatureFlags.ONE, value: Math.random() > 0.5 },
      { id: 0, userId: lastID, featureFlagKey: FeatureFlags.TWO, value: Math.random() > 0.5 },
      { id: 0, userId: lastID, featureFlagKey: FeatureFlags.THREE, value: Math.random() > 0.5 }
    ];
    console.log(`Setting up fake user flag data for user ${name}`, userData);
    for (const userFlag of userData) {
      await db.run('INSERT INTO UserFlag (userId, featureFlagKey, value) VALUES (?, ?, ?)', [userFlag.userId, userFlag.featureFlagKey, userFlag.value ? 1 : 0]);
    }
  }
}

export default db;
