'use strict';

const mockInit = jest.fn(() => {});

jest.mock('../../lib/init', () => ({
  init: mockInit
}));

describe('swagger-parser.lib.getResponse', () => {
  const {getResponse} = require('../../lib/getResponse');

  describe('if response not defined', () => {
    const parsedResponse = getResponse();
    test('should return blank object', () => {
      expect(parsedResponse).toEqual({});
    });
  });

  describe('if response is defined', () => {
    describe('if response have schema', () => {
      const response = {
        schema: 'mockSchema'
      };
      getResponse(response);
      expect(mockInit).toHaveBeenCalled();
      expect(mockInit).toHaveBeenCalledWith({object: response.schema});
    });

    describe('if response does not have schema', () => {
      const response = {};
      const parsedResponse = getResponse(response);
      expect(parsedResponse).toEqual({ '__noData': true});
    });
  });
});
