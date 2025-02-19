

export default function getFlag(key: FeatureFlags): boolean {
  if (!key) {
    return false; // TODO: throw?
  }
  // FRAGILE: this is insufficient because 'false' and '0' are not falsey
  // `return !!process.env[`FEATURE_${key}`];`
  const val = process.env['FEATURE_'+key];
  if (val === undefined) {
    return false;
  }
  try {
    return !!JSON.parse(val);
  } catch {
    // in case invalid json
    return false;
  }
}

export function getAllFlags(): { [key: string]: string | undefined } {
  return Object.fromEntries(
    Object.entries(process.env)
      .filter(([key]) => key.startsWith('FEATURE_'))
      .map(([key, value]) => [key.slice(8), value])
  );
}

export enum FeatureFlags {
  ONE = 'ONE',
  TWO = 'TWO',
  THREE = 'THREE'
}
