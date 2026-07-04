import { describe, it, expect } from 'vitest';
import db from '../../src/data/database';
import { type FeatureFlag, FeatureFlags } from '../../src/types/feature-flag';


describe('feature-flags-expired', () => {

  it('should not have expired or missing feature flags', async () => {

    // arrange

    // act
    const rows: FeatureFlag[] = await db.all('SELECT key, value, expireDate FROM FeatureFlag', []);

    // assert
    const expired = rows.filter(r => r.expireDate < new Date());
    expect(expired.length).toBe(0); // any expired flags?
    expect(rows.length).toBe(Object.keys(FeatureFlags).length); // any missing flags?

  });

});
