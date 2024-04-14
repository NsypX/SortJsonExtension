module.exports = {
  testEnvironment: 'node', // Use Node.js environment for running tests
  roots: ['<rootDir>/src'], // Specify the root directory where Jest should look for test files
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.js$', // Specify the regex pattern Jest uses to detect test files
  moduleFileExtensions: ['js', 'json', 'node'], // Specify the file extensions Jest should look for
  collectCoverage: true, // Enable code coverage reporting
  coverageDirectory: '<rootDir>/coverage', // Specify the directory where coverage reports are stored
  collectCoverageFrom: ['<rootDir>/src/**/*.js'], // Specify the files for which coverage information should be collected
};