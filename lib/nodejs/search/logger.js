'use strict';

// use this logger when "hexo" global is not available,
// eg. in a child_process
const logger = require('hexo-log')({
  name: 'search'
});

module.exports = logger;
