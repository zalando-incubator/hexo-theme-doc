'use strict';

describe('swagger-parser.index', () => {
  const swaggerParser = require('../index');

  test('should export getBody, getResponse and filterResponses', () => {
    const {getBody, getResponse} = swaggerParser;
    expect(Object.keys(swaggerParser).length).toBe(2);
    expect(getBody).toBeInstanceOf(Function);
    expect(getResponse).toBeInstanceOf(Function);
  });
});
