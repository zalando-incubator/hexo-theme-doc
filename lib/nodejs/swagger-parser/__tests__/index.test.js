'use strict';

describe('swagger-parser.index', () => {
  const swaggerParser = require('../index');

  test('should export getBody, getResponse and filterResponses', () => {
    const {getBody, getResponse, filterResponses} = swaggerParser;
    expect(Object.keys(swaggerParser).length).toBe(3);
    expect(getBody).toBeInstanceOf(Function);
    expect(getResponse).toBeInstanceOf(Function);
    expect(filterResponses).toBeInstanceOf(Function);
  });
});
