module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '@library': './src/library',
          '@modules': './src/modules',
          '@services': './src/services',
          '@screens': './src/screens',
          '@config': './src/config',
          '@i18n': './src/i18n',
          '@utils': './src/utils',
          '@app': './src',
        },
      },
    ],
    ['react-native-reanimated/plugin'],
  ],
};
