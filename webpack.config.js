'use strict';

const path = require('path');

module.exports = {
  entry: './lib/browser/index.js',
  externals: {
    jquery: '$'
  },
  output: {
    path: path.resolve('source/script'),
    filename: 'main.js'
  },
  module: {
    loaders: [
      { test: /\.jsx$/, exclude: /node_modules/, loader: 'jsx-loader' }
    ]
  }
};
