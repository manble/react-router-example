/**
 * @description：
 * @author: manble@live.com
 * @created: 2017-12-10
 */

'use strict';

const path = require('path');
const webpack = require('webpack');
const appConf = require('./app.config');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';
const isDev = /development/.test(NODE_ENV);

let getCssLoader = () => {
    return [
        {
            loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader
        }, {
            loader: 'css-loader',
            options: {
                minimize: isDev ? false : true,
                modules: true,
                importLoaders: 1,
                localIdentName: isDev ? '[path][name]-[local]' : '[name]-[local]-[hash:base64:3]'
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
};

let base = {
    mode: NODE_ENV,
    entry: {
        common: [
            'react', 'react-dom', 'redux', 'react-redux', 'redux-thunk', 'react-router-dom', 'react-router-config'
        ],
        app: ['./src/scripts/app.js']
    },
    module: {
        rules: [{
            enforce: 'pre',
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'eslint-loader',
            options: {
                fix: false
            }
        },
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
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'common',
                    chunks: 'all'
                }
            }
        }
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
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
};

let prod = {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, './dist/'),
        publicPath: '',
        filename: 'scripts/[name].[chunkhash:12].js'
    },
    performance: {
        hints: 'warning',
        maxEntrypointSize: 300000,
        maxAssetSize: 450000
    },
    plugins: [
        new webpack.DefinePlugin({
            CONFIG: JSON.stringify(appConf[NODE_ENV])
        }),
        new UglifyJsPlugin({
            uglifyOptions: {
                compress: {
                    warnings: false
                },
                output: {
                    beautify: false,
                    comments: false
                }
            }
        }),
        new webpack.HashedModuleIdsPlugin(),
        new MiniCssExtractPlugin({
            filename: 'styles/[name].[hash:12].css'
        }),
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