'use strict';

const build = require('./build');

module.exports = ({process}) => {
  return function (message) {
    const pages = message.pages ? Array.from(message.pages.data) : [];
    const rootPath = message.rootPath || '';
    const result = build({pages, rootPath});
    process.send(result);
  };
};
