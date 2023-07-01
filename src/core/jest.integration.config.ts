import baseJestConfig from './jest.config';

export default {
  ...baseJestConfig,
  setupFilesAfterEnv: ['<rootDir>/../jest-setup/setupFile.ts'],
  testRegex: '.*\\..*integration\\.*\\..*spec\\.ts$',
  transform: {
    '^.+\\.ts?$': ['@swc/jest'],
  },
};
