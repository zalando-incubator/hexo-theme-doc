'use strict';

const build = require('./build');
const logger = require('./logger');

module.exports = ({process}) => {
  return function (message) {
    const pages = message.pages ? Array.from(message.pages.data) : [];
    logger.debug('child process got a message');
    const result = build({pages});
    process.send(result);
  };
};
