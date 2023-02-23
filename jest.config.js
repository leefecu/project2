module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFiles: ['./jest.setup.js'],
  setupFilesAfterEnv: ['<rootDir>setup-tests.js'],
  // setupTestFrameworkScriptFile: 'jest-enzyme',
  moduleNameMapper: {
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      'identity-obj-proxy',
    '\\.svg': '<rootDir>/app/__mocks__/svgMock.js',
  },
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|react-navigation|@react-navigation/.*))',
  ],
  testEnvironment: 'enzyme',
  testEnvironmentOptions: {
    enzymeAdapter: 'react16',
  },
};
