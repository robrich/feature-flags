export enum FeatureFlags {
  ONE = 'ONE',
  TWO = 'TWO',
  THREE = 'THREE'
}

export type FeatureFlag = {
  key: FeatureFlags;
  value: boolean;
}
