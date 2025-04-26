// jest.config.js
/** @type {import('jest').Config} */
export default {
    preset: 'ts-jest/presets/default-esm',
    setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
    testEnvironment: 'node',
    testMatch: ['**/*.test.ts?(x)'],
    extensionsToTreatAsEsm: ['.ts', '.tsx'],
    moduleFileExtensions: ['ts', 'tsx', 'js'],
    transform: {
      "^.+\\.[tj]s$": [
        'ts-jest',
        {
          useESM: true,
          tsconfig: './tsconfig.json',  // Ensure this points to the correct tsconfig file
        },
      ],
    },
    transformIgnorePatterns: [
        'node_modules/(?!(@oslojs|i18next)/)',
        'generated/',
    ],
    coverageDirectory: 'coverage',
    collectCoverageFrom: [
        'src/**/*.{ts,tsx}',         // adjust if your code is not under src/
        '!src/**/*.d.ts',             // ignore type declarations
        '!src/**/index.{ts,tsx}',     // optional: ignore index.ts re-export files
    ],
    coverageReporters: ['text', 'lcov'], // text for console, lcov for HTML
};
  