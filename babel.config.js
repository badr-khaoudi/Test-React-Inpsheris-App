module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    'styled-components',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import',
  ],
  env: {
    development: {
      plugins: [
        [
          'babel-plugin-import',
          {
            libraryName: '@material-ui/core',
            libraryDirectory: 'esm',
            camel2DashComponentName: false,
          },
          'core',
        ],
        [
          'babel-plugin-import',
          {
            libraryName: '@material-ui/icons',
            libraryDirectory: 'esm',
            camel2DashComponentName: false,
          },
          'icons',
        ],
        [
          'babel-plugin-import',
          {
            libraryName: '@material-ui/lab',
            libraryDirectory: 'esm',
            camel2DashComponentName: false,
          },
          'lab',
        ],
        'lodash',
        [
          'formatjs',
          {
            idInterpolationPattern: '[sha512:contenthash:base64:6]',
            ast: true,
          },
        ],
      ],
    },
    production: {
      only: ['app'],
      plugins: [
        'lodash',
        'transform-react-remove-prop-types',
        '@babel/plugin-transform-react-inline-elements',
        '@babel/plugin-transform-react-constant-elements',
        [
          'babel-plugin-import',
          {
            libraryName: '@material-ui/core',
            libraryDirectory: 'esm',
            camel2DashComponentName: false,
          },
          'core',
        ],
        [
          'babel-plugin-import',
          {
            libraryName: '@material-ui/icons',
            libraryDirectory: 'esm',
            camel2DashComponentName: false,
          },
          'icons',
        ],
        [
          'babel-plugin-import',
          {
            libraryName: '@material-ui/lab',
            libraryDirectory: 'esm',
            camel2DashComponentName: false,
          },
          'lab',
        ],
        [
          'formatjs',
          {
            idInterpolationPattern: '[sha512:contenthash:base64:6]',
            ast: true,
          },
        ],
      ],
    },
    test: {
      plugins: [
        '@babel/plugin-transform-modules-commonjs',
        'dynamic-import-node',
      ],
    },
  },
};
