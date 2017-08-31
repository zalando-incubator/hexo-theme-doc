'use strict';

const mockInit = jest.fn(() => {});

jest.mock('../../lib/init', () => ({
  init: mockInit
}));

describe('swagger-parser.lib.getBody', () => {
  const {getBody} = require('../../lib/getBody');

  describe('if body or body.schema is not defined', () => {
    const parsedBody = getBody();
    test('should return blank object', () => {
      expect(parsedBody).toEqual({});
    });
  });

  describe('if body is defined', () => {
    const body = {
      schema: 'mockSchema'
    };

    test('should traverse body.schema', () => {
      getBody(body);
      expect(mockInit).toHaveBeenCalled();
      expect(mockInit).toHaveBeenCalledWith({object: body.schema});
    });
  });
});
