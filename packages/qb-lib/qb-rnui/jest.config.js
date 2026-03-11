

import { rnJestConfig } from '@qb/rn-testing';

export default {
  ...rnJestConfig,
  setupFilesAfterEnv: ['./test/jest.setup.ts'],
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    // Don't ignore these
    'node_modules/(?!(react-native|@react-native)/)',
  ],
  moduleNameMapper: {
    '@qb-rnui/(.*)$': '<rootDir>/src/$1',
  },
}
