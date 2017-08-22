'use strict';

const build = require('./build');
const logger = require('./logger');

module.exports = ({process}) => {
  return function (message) {
    const pages = message.pages ? Array.from(message.pages.data) : [];
    const rootPath = message.rootPath || '';
    logger.debug('child process got a message');
    const result = build({pages, rootPath});
    process.send(result);
  };
};
