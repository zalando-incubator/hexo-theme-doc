const mockHexo = {
  config: {
    lunr: {
      route: 'testlunr.json'
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
    }
  }
}

module.exports = {
  mockHexo,
  mockLogger,
  mockCb,
  mockHexoUtil
};
