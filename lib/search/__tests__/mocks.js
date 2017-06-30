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


module.exports = {
  mockHexo,
  mockLogger,
  mockCb
};
