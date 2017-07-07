'use strict';

const mockHexo = {
  config: {
    theme_config: {
      search: {
        route: 'testlunr.json'
      }
    }
  },
  route: {
    'set': () => {}
  }
};
const mockLogger = {
  info: () => {},
  error: () => {}
};

const mockCb = () => {};

const mockHexoUtil = () => {
  return {
    url_for: (path) => {
      return path;
    },
    themeConfig: () => {
      return mockHexo.theme_config;
    }
  }
};

module.exports = {
  mockHexo,
  mockLogger,
  mockCb,
  mockHexoUtil
};
