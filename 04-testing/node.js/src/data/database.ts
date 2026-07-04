import { open } from 'promised.sqlite';
import { type FeatureFlag, FeatureFlags } from '../types/feature-flag.js';


const dbFile = process.env.DB_FILE;
if (!dbFile) {
  throw new Error('DB_FILE environment variable is required');
}

const db = await open(dbFile);

// TODO: a CI tool should do this instead:
await db.run(`CREATE TABLE IF NOT EXISTS FeatureFlag (
  key TEXT PRIMARY KEY,
  value BOOLEAN,
  expireDate DATETIME
)`);

export type CountRow = {
  count: number
}

const countRow = await db.get('SELECT COUNT(*) AS count FROM FeatureFlag', []) as CountRow;

if (countRow?.count === 0) {
  const sql = 'INSERT INTO FeatureFlag (key, value, expireDate) VALUES (?, ?, ?)';

  const date = new Date();
  date.setDate(date.getDate() + 60);

  const data: FeatureFlag[] = [
    { key: FeatureFlags.ONE, value: Math.random() > 0.5, expireDate: date },
    { key: FeatureFlags.TWO, value: Math.random() > 0.5, expireDate: date },
    { key: FeatureFlags.THREE, value: Math.random() > 0.5, expireDate: date }
  ];
  console.log('Setting up fake feature flag data', data);

  for (const flag of data) {
    await db.run(sql, [flag.key, flag.value ? 1 : 0, flag.expireDate.getTime()]);
  }
}

export default db;
