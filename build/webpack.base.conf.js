/*!
 * project name: www.cos
 * name:         webpack.base.conf.js.js
 * version:      v0.0.1
 * author:       w.xuan
 * email:        pro.w.xuan@.gmail.com
 * date:         2017/10/12
 */

'use strict';

const fs = require('fs');
const webpack = require('webpack');

const utils = require('./utils');
const config = require('./config');


const entries = () => {
  const src = utils.resolve('www/js');

  let stats = fs.statSync(src);

  if (stats) {
    let files = fs.readdirSync(src);
    let enties = {};

    files.forEach(file => {
      if (file.indexOf('.js') > 0 && file.indexOf('_') != 0) {
        enties[file.split('.js')[0]] = `${src}\\${file}`;
      }
    });

    return enties;
  }
};

module.exports = {
  context: __dirname,
  entry: entries(),
  output: {
    path: utils.resolve('public'),
    filename: 'js/[name].js',
    publicPath: process.env.NODE_ENV === 'production' ?
      config.build.assetsPublicPath :
      config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      jquery: utils.resolve('www/lib/jquery-3.2.1/jquery.js'),
      Library: utils.resolve('www/lib/')
    }
  },
  module: {
    rules: [
      {
        test: require.resolve('jquery'),
        loader: 'expose-loader?$!expose-loader?jQuery'
      },
      {
        test: /\.(js)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [utils.resolve('www')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [utils.resolve('www')]
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  externals: {
    jquery: 'window.$'
  },
};
 
