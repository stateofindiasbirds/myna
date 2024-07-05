// module.exports = {
//     testEnvironment: 'node',
//     transform: { '^.+\\.js$': 'babel-jest',},
//     testMatch: ['<rootDir>/*.test.js'],
//     reporters: [
//       'default',
//       ['jest-html-reporter', {
//         pageTitle: 'Test Report', 
//         outputPath: './test-report/index.html', 
//       }]
//     ],
//   };

module.exports = {
  testEnvironment: 'node',
  transform: { '^.+\\.js$': 'babel-jest',},
  testMatch: ['<rootDir>/*.test.js'],
  reporters: [
    'default',
    '<rootDir>/customReporter.js',
    ['jest-html-reporter', {
      pageTitle: 'Test Report', 
      outputPath: './test-report/index.html', 
    }]
  ],
};