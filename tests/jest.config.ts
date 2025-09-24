import type { Config } from 'jest';

// Configuration Jest ultra-simplifiée
const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  rootDir: '..',
  setupFilesAfterEnv: ['<rootDir>/tests/jest.setup.ts'],
  testPathIgnorePatterns: ['<rootDir>/tests/.*\\.spec\\.ts$'],
  silent: true,
  coverageDirectory: '<rootDir>/tests/coverage',
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
    '\\.(svg|png|jpg|jpeg|gif|webp)$': '<rootDir>/tests/jest.setup.ts',
    '^next/font/google$': '<rootDir>/tests/jest.setup.ts',
  },
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: {
        jsx: 'react-jsx'
      }
    }]
  }
};

export default config;