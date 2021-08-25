module.exports = function(api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo']
  }
}

module.exports = function getBabelConfig(api) {
  api.cache(true)

  const plugins = [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        alias: {
          '~': './src'
        },
        extensions: ['.js', '.ts', '.tsx']
      }
    ]
  ]

  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins
  }
}
