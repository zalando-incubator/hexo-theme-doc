'use strict';

const logger = require('hexo-log')({
  debug: false,
  silent: false,
  name: 'search'
});

['log', 'debug', 'info', 'warn', 'error'].forEach((method) => {
  const originalFn = logger[method];
  logger[method] = function () {
    const args = Array.from(arguments);
    args.unshift('search:');
    return originalFn.apply(logger, args);
  };
});

module.exports = logger;
