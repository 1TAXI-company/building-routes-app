module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'babel-plugin-root-import',
      {
        paths: [
          {
            rootPathPrefix: 'app',
            rootPathSuffix: 'src/app',
          },
          {
            rootPathPrefix: 'features',
            rootPathSuffix: 'src/features',
          },
          {
            rootPathPrefix: 'shared',
            rootPathSuffix: 'src/shared',
          },
        ],
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
