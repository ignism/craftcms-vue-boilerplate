// node modules
const merge = require('webpack-merge')
const path = require('path')

// webpack plugins
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CriticalCssPlugin = require('critical-css-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const common = require('./webpack.common.js')
const settings = require('./webpack.settings.js')

process.env.NODE_ENV = 'production'

// configurations
const configureCleanWebpack = () => {
  return [
    path.resolve(__dirname, 'server/private/craft/templates'),
    path.resolve(__dirname, 'server/public/dist')
  ]
}

const configureCriticalCss = () => {
  return settings.criticalCssConfig.pages.map((row) => {
    const criticalSrc = settings.urls.critical + row.url
    const criticalDest = settings.criticalCssConfig.base + row.template + settings.criticalCssConfig.suffix
    let criticalWidth = settings.criticalCssConfig.criticalWidth
    let criticalHeight = settings.criticalCssConfig.criticalHeight
    // Handle Google AMP templates
    
    if (row.template.indexOf(settings.criticalCssConfig.ampPrefix) !== -1) {
      criticalWidth = settings.criticalCssConfig.ampCriticalWidth
      criticalHeight = settings.criticalCssConfig.ampCriticalHeight
    }
    
    return new CriticalCssPlugin({
      base: './',
      src: criticalSrc,
      dest: criticalDest,
      extract: false,
      inline: false,
      minify: true,
      width: criticalWidth,
      height: criticalHeight
    })
  })
}

const configureTerser = () => {
  return {
    terserOptions: {
      output: {
        comments: false
      },
      compress: {
        drop_console: true
      }
    }
  }
}

module.exports = merge(common, {
  mode: 'production',

  plugins: [
    new BundleAnalyzerPlugin(),
    new CleanWebpackPlugin(configureCleanWebpack())
  ].concat(configureCriticalCss()),

  optimization: {
    minimizer: [new TerserPlugin(configureTerser())]
  }
})
