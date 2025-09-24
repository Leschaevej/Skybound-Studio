import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    rootDir: '..',
    setupFilesAfterEnv: ['<rootDir>/tests/jest.setup.ts'],
    testPathIgnorePatterns: ['<rootDir>/tests/.*\\.spec\\.ts$'],
    silent: true,
    coverageDirectory: '<rootDir>/tests/coverage',
    collectCoverageFrom: ['app/**/*.{ts,tsx}', '!app/**/*.d.ts', '!app/**/layout.tsx', '!app/globals.css', '!app/assets/**'],
    coverageProvider: 'v8',
    moduleNameMapper: { '\\.(css|scss)$': 'identity-obj-proxy', '\\.(svg|png|jpg|jpeg|gif|webp)$': 'identity-obj-proxy' },
    transform: { '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: { jsx: 'react-jsx' } }] }
};
export default config;