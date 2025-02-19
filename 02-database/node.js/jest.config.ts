import type { Config } from 'jest';

const config: Config = {
  setupFiles: ['dotenv/config'],
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {useESM: true}]
  },
  moduleFileExtensions: ['js', 'ts', 'json', 'node'],
  collectCoverage: true,
  testMatch: ['**/tests/**/*.test.ts'],
};
export default config;
