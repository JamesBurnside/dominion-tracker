import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  roots: ['src'],
  transform: {
    '^.+\\.(ts)x?$': 'ts-jest',
  },
  modulePaths: ['<rootDir>/src/'],
  setupFiles: ['<rootDir>/src/test-utils/jestSetup.ts'],
};

export default config;
