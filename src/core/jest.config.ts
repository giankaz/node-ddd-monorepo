export default {
  displayName: {
    name: 'core',
    color: 'blue',
  },
  clearMocks: true,
  coverageDirectory: '<rootDir>/../__coverage',
  coverageProvider: 'v8',
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
  rootDir: './src',
  setupFiles: ['dotenv/config'],
  setupFilesAfterEnv: ['<rootDir>/../jest-setup/setupFile.ts'],
  maxConcurrency: 5,
  testRegex: '.*\\..*spec\\.ts$',
  transform: {
    '^.+\\.ts?$': ['@swc/jest'],
  },
};
