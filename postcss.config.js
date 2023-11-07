module.exports = {
  plugins: [
    require('autoprefixer'),
    require('postcss-preset-env')({
      stage: 1,
    }),
    require('postcss-import'),
    /*require('cssnano')({
      preset: 'default'
    })*/
  ]
};