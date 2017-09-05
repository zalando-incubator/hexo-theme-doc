'use strict';

describe('swagger-parser.lib.filterResponses', () => {
  const {filterResponses} = require('../../lib/filterResponses');

  test('should filter important responses', () => {

    const responseOk = {
      description: 'Pet response.',
      schema: {
        type: 'object',
        description: 'List of pets',
        properties: {}
      }
    };

    const originalResponse = {
      '200': responseOk,
      '401': {
        description: 'Unauthorized',
        schema: {
          required: {},
          type: 'object',
          properties: {}
        }
      },
      default: {
        description: 'unexpected error',
        schema: {
          required: {},
          type: 'object',
          properties: {}
        }
      }
    };

    const filteredResponses = filterResponses(originalResponse);

    expect(Object.keys(filteredResponses).length).toBe(1);
    expect(filteredResponses['200']).toBeInstanceOf(Object);
    expect(filteredResponses['200']).toEqual(responseOk);

  });
});
