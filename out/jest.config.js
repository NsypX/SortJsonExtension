"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    preset: 'ts-jest', // Use ts-jest preset for TypeScript support
    testEnvironment: 'node', // Use Node.js environment for running tests
    roots: ['<rootDir>/src'], // Specify the root directory where Jest should look for test files
    testRegex: '(/__tests__/.*|(\\.|/)(jest-test|spec))\\.(ts|js)$', // Specify the regex pattern Jest uses to detect test files
    moduleFileExtensions: ['ts', 'js', 'json', 'node'], // Specify the file extensions Jest should look for
    collectCoverage: true, // Enable code coverage reporting
    coverageDirectory: '<rootDir>/coverage', // Specify the directory where coverage reports are stored
    collectCoverageFrom: ['<rootDir>/src/**/*.{ts,js}'], // Specify the files for which coverage information should be collected
    clearMocks: true,
    globals: {
        'ts-jest': {
            tsConfig: 'path/to/your/tsconfig.test.json',
        },
    },
};
//# sourceMappingURL=jest.config.js.map