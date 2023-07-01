import baseJestConfig from './jest.config';

export default {
  ...baseJestConfig,
  setupFilesAfterEnv: ['<rootDir>/../jest-setup/setupFile.unity.ts'],
  testRegex: '.*\\.spec\\.ts$',
  testPathIgnorePatterns: [
    '/node_modules/',
    '\\.integration\\.spec\\.ts$',
    '\\.int\\.spec\\.ts$',
  ],
  transform: {
    '^.+\\.ts?$': ['@swc/jest'],
  },
};
