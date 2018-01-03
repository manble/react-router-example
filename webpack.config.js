/**
 * @description：
 * @author: manble@live.com
 * @created: 2017-12-10
 */

'use strict';

const path = require('path');
const webpack = require('webpack');
const appConf = require('./app.config');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';
const isDev = /development/.test(NODE_ENV);

let scssLoader = [
   {
      loader: 'css-loader',
      options: {
         minimize: isDev ? false : true,
         modules: true,
         importLoaders: 1,
         localIdentName: isDev ? '[path][name]-[local]' : '[hash:base64:10]'
      }
   }, {
      loader: 'postcss-loader',
      options: {
         ident: 'postcss',
         plugins: [require('autoprefixer')()]
      }
   }, {
      loader: 'sass-loader',
      options: {
         includePaths: []
      }
   }
];
let getCssLoader = () => {
   return isDev
      ? [{
            loader: 'style-loader'
         }].concat(scssLoader)
      : ExtractTextPlugin.extract({ fallback: 'style-loader', use: scssLoader });
};

let base = {
   entry: {
      common: [
         'babel-polyfill', 'react', 'react-dom', 'redux', 'react-redux', 'redux-thunk', 'react-router-dom', 'react-router-config'
      ],
      app: ['./src/scripts/app.js']
   },
   module: {
      rules: [
         {
            test: /\.jsx?/,
            exclude: /node_modules/,
            use: 'babel-loader'
         }, {
            test: /\.(jpe?g|png|gif|svg)$/i,
            loader: 'url-loader',
            include: path.resolve(__dirname, './src/'),
            options: {
               limit: 8192,
               name: 'images/[name].[hash:12].[ext]'
            }
         }, {
            test: /\.s?css$/,
            exclude: /node_modules/,
            use: getCssLoader()
         }
      ]
   },
   resolve: {
      alias: {},
      extensions: [
         '.js', '.jsx', '.css', '.scss'
      ],
      modules: [
         path.resolve('./node_modules/'),
         path.resolve('./src'),
         path.resolve('./src/scripts/')
      ]
   }
};

let dev = {
   output: {
      path: path.resolve(__dirname, './dist/'),
      publicPath: '/dist/',
      filename: '[name].js'
   },
   devServer: {
      proxy: {
         '/api': {
            target: 'http://api.example.com',
            changeOrigin: true,
            secure: false
         }
      },
      historyApiFallback: true,
      open: true,
      inline: true,
      contentBase: './src/',
      port: 8000
   },
   watch: true,
   watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
   },
   plugins: [
      new webpack.DefinePlugin({
         CONFIG: JSON.stringify(appConf[NODE_ENV])
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.optimize.CommonsChunkPlugin({ name: 'common', filename: 'common.js' })
   ]
};

let prod = {
   output: {
      path: path.resolve(__dirname, './dist/'),
      publicPath: '/dist/',
      filename: 'scripts/[name].[chunkhash:12].js'
   },
   plugins: [
      new webpack.DefinePlugin({
         CONFIG: JSON.stringify(appConf[NODE_ENV]),
         'process.env': {
            NODE_ENV: '"production"'
         }
      }),
      new webpack.optimize.CommonsChunkPlugin({ name: 'common', filename: 'scripts/[name].[hash:12].js' }),
      new webpack.optimize.UglifyJsPlugin({
         compress: {
            warnings: false
         },
         output: {
            comments: false,
            ascii_only: true
         }
      }),
      new webpack.HashedModuleIdsPlugin(),
      new ExtractTextPlugin('style/app-[contenthash:12].css'),
      new HTMLWebpackPlugin({
         template: './tpl.html',
         // favicon: './src/images/favicon.png',
         minify: {
            removeComments: true,
            sortAttributes: true,
            collapseWhitespace: true
         }
      })
   ]
};

module.exports = Object.assign(base, isDev ? dev : prod);