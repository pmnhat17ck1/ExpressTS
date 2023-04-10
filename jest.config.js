const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.ts?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/src',
  }),
  setupFiles: ['dotenv/config'],
  collectCoverageFrom: [
    'src/**/*.ts',
    'src/components/*.tsx',
    '!**/node_modules/**',
    '!**/src/config/*',
    '!**/src/exceptions/*',
    '!**/src/services/systems/*',
    '!**/src/models/*',
  ],
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'html'],
};
