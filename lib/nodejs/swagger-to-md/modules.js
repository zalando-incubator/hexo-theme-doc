'use strict';

const path = require('path');
module.exports = {
  head: {
    order: 0,
    template: path.resolve(__dirname, './templates/head.ejs')
  },
  paths: {
    order: 1,
    template: path.resolve(__dirname, './templates/paths.ejs'),
    controller: (ctx) => {
      const paths = ctx.paths;

      return { paths, path_template: path.resolve(__dirname, './templates/path.ejs') , operation_template: path.resolve(__dirname, './templates/operation.ejs')}
    }
  }
};
