module.exports = {
  collectCoverageFrom: [
    'app/**/*.{js,jsx}',
    '!app/**/*.test.{js,jsx}',
    '!app/*/RbGenerated*/*.{js,jsx}',
    '!app/app.js',
    '!app/global-styles.js',
    '!app/*/*/Loadable.{js,jsx}',
  ],
  coverageThreshold: {
    global: {
      statements: 98,
      branches: 91,
      functions: 98,
      lines: 98,
    },
  },
  coveragePathIgnorePatterns: [
    'App',
    'Community',
    'Dashboard',
    'HomePage',
    'Login',
    'PrivateRoute',
    'LanguageProvider',
    'NotFoundPage',
  ],
  modulePathIgnorePatterns: [
    'App',
    'Community',
    'Dashboard',
    'HomePage',
    'Login',
    'PrivateRoute',
    'LanguageProvider',
    'NotFoundPage',
  ],
  moduleDirectories: ['node_modules', 'app', 'app/themes'],
  moduleNameMapper: {
    '^Theme(.*)$': '<rootDir>/app/themes/base.js',
    '.*\\.(css|less|styl|scss|sass)$': '<rootDir>/internals/mocks/cssModule.js',
    '.*\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/internals/mocks/image.js',
    '\\.svg$': '<rootDir>/internals/mocks/svgr.js',
  },
  setupFilesAfterEnv: [
    '<rootDir>/internals/testing/test-bundler.js',
    'react-testing-library/cleanup-after-each',
  ],
  setupFiles: ['raf/polyfill'],
  testRegex: 'tests/.*\\.test\\.js$',
  snapshotSerializers: [],
  transformIgnorePatterns: [
    '/node_modules/(?!intl-messageformat|@formatjs/icu-messageformat-parser).+\\.js$',
  ],
};
