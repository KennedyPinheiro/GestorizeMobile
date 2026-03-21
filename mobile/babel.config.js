module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@components': './src/components',
            '@views': './src/views',
            '@context': './src/context',
            '@api': './src/api',
            '@configs': './src/configs',
            '@routes': './routes',
            '@lib': './lib',
            '@utils': './src/utils',
            '@core': './src/@core',
            '@@core': './src/@core'
          }
        }
      ]
    ]
  }
}
