'use strict';

const {mockLogger} = require('./mocks');

describe('search.child-on-message', () => {

  jest.mock('../build', () => () => 'test');
  jest.mock('../logger', () => mockLogger);

  let childOnMessage, mockProcess;

  beforeEach(() => {
    mockProcess = {
      send: jest.fn()
    };
    childOnMessage = require('../child-on-message')({ process: mockProcess });
  });

  it('should do something', () => {
    const message = {
      pages: {
        data: []
      },
      rootPath: '/'
    };
    childOnMessage(message);

    expect(mockProcess.send).toHaveBeenCalledWith('test');
  });
});
