'use strict';


const mockLog = jest.fn();
jest.mock('hexo-log', () => () => ({
  log: mockLog
}));

const logger = require('../logger');

describe('logger', () => {
  test('expose a logger with all the methods', () => {
    expect(logger.log).toBeInstanceOf(Function);
    expect(logger.debug).toBeInstanceOf(Function);
    expect(logger.info).toBeInstanceOf(Function);
    expect(logger.warn).toBeInstanceOf(Function);
    expect(logger.error).toBeInstanceOf(Function);
  });

  describe('when log is called', () => {
    test('should prefix search in log messages', () => {
      logger.log('Message');
      expect(mockLog).toHaveBeenCalledWith('search:','Message');
    });
  });
});
