'use strict';

const path = require('path');
module.exports = {
  head: {
    order: 0,
    template: path.resolve(__dirname, './templates/head.ejs')
  }
};
