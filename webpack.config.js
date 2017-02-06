'use strict';

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');

const webpackConfig = {
  entry: {
    main: './examples',
  },
  output: {
    path: path.resolve(process.cwd(), 'examples-dist'),
    publicPath: '/',
    filename: '[name].js'
  },
  module: {
    loaders:[
      {
        test: /\.js$/,
        loader: 'babel?presets[]=es2015,presets[]=stage-0'
      },
      {
        test: /\.jsx/,
        loaders: ['jsx', 'babel?presets[]=es2015,presets[]=stage-0,presets[]=react']
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!csscomb-loader!postcss-loader!less-loader')
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!csscomb-loader!postcss-loader')
      },
      {
        test: /\.(eot|woff|svg|ttf|woff2|gif)(\?|$)/,
        loader: 'file-loader?name=[hash].[ext]'
      }, {
        test: /\.(png|jpg)$/,
        loader: 'url?limit=1200&name=[hash].[ext]' //注意后面那个limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图片
      }
    ]
  },
  postcss: [ autoprefixer({ browsers: ['> 1%'] }) ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    contentBase: path.resolve(process.cwd(), 'examples'),
    port: 3000,
    host: '0.0.0.0',
    inline: true,
    historyApiFallback: true
  },
  plugins: [
    new ExtractTextPlugin('main.css'),
    new CopyWebpackPlugin([
      { from: 'examples/index.html' },
      { from: 'examples/assets', to: 'assets' }
    ])
  ],
};

module.exports = webpackConfig;
