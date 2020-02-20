// node modules
const webpack = require('webpack')
const path = require('path')

// webpack plugins
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// const CleanWebpackPlugin = require('clean-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')

const settings = require('./webpack.settings.js')

// configurations
const configureCopyWebpack = () => {
  return [
    {
      from: path.resolve(__dirname, 'theme/templates'),
      to: path.resolve(__dirname, 'server/private/craft/templates')
    }, {
      from: path.resolve(__dirname, 'theme/include'),
      to: ''
    }
  ]
}

const configureMiniCssExtract = () => {
  return { filename: 'css/[name].[hash:8].css', chunkFilename: 'css/[id].[hash:8].css' }
}

const configureManifest = () => {
  return { publicPath: settings.publicPath }
}

// webpack config
module.exports = {
  node: {
    fs: 'empty'
  },

  plugins: [
    new VueLoaderPlugin(),
    new CopyWebpackPlugin(configureCopyWebpack()),
    new MiniCssExtractPlugin(configureMiniCssExtract()),
    new ManifestPlugin(configureManifest())
  ],

  module: {
    rules: [
      {
        test: /\.js$/,

        include: [path.resolve(__dirname, 'theme', 'src')],

        loader: 'babel-loader'
      }, {
        test: /\.vue$/,
        loader: 'vue-loader'
      }, {
        test: /\.(css|pcss)$/,

        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: settings.publicPath
            }
          }, {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: true
            }
          }, {
            loader: 'postcss-loader'
          }
        ]
      }, {
        test: /\.(svg|png|jpg)$/,

        use: {
          loader: 'file-loader',
          options: {
            name: 'images/[name].[ext]',
            publicPath: settings.buildPath
          }
        }
      }, {
        test: /\.(woff(2)?|otf|ttf|eot|svg)$/,

        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]',
            publicPath: settings.publicPath
          }
        }
      }
    ]
  },

  resolve: {
    extensions: ['.js'],
    alias: {
      '@root': path.resolve(__dirname),
      '@src': path.resolve(__dirname, 'theme/src'),
      vue$: 'vue/dist/vue.esm.js'
    }
  },

  entry: {
    main: path.resolve(__dirname, 'theme/src/index.js'),
    head: path.resolve(__dirname, 'theme/src/head.js'),
    fonts: path.resolve(__dirname, 'theme/src/fonts.js')
  },

  output: {
    path: path.resolve(__dirname, 'server/public/', settings.buildPath),
    filename: 'js/[name].[hash:8].js',
    publicPath: settings.publicPath
  },
}
