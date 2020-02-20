const merge = require('webpack-merge')
const common = require('./webpack.common.js')

// webpack config
module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
})
