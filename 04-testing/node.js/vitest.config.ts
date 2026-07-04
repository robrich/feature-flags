import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: false,
    environment: 'node',
    include: ['tests/**/*.test.ts'],
    setupFiles: ['dotenv/config'],
    reporters: ['default', 'junit'],
    outputFile: {
      junit: './test-results/junit.xml', // Path for your JUnit XML file
    },
    coverage: {
      enabled: true,
      provider: 'v8', // or 'istanbul'
      reportsDirectory: './test-results/coverage',
      reporter: ['text', 'json', 'html', 'cobertura'],
    }
  }
});
