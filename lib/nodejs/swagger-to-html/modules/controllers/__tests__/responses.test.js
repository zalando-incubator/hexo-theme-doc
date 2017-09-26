
'use strict';

const responsesController = require('../responses');

describe('controllers.resposnes', () => {
  it('should transform context as expected', () => {
    const ctx = {
      operation: {
        responses: {
          '200': {
            foo: 'Success'
          },
          '400': {
            foo: '400'
          },
          '500': {
            foo: '500'
          },
          '401': {
            foo: '401'
          },
          '201': {
            foo: '201'
          },
          'default': {
            foo: 'default'
          }
        }
      }
    };

    const { responses } = responsesController(ctx);
    const {successResponse, errorResponse, defaultResponse} = responses;

    const expectedSuccess = {
      '200': {
        foo: 'Success'
      },
      '201': {
        foo: '201'
      }
    };
    const expectedError = {
      '400': {
        foo: '400'
      },
      '401': {
        foo: '401'
      },
      '500': {
        foo: '500'
      }
    };
    const expectedDefault = {
      foo: 'default'
    };
    expect(Object.keys(successResponse).length).toBe(2);
    expect(Object.keys(errorResponse).length).toBe(3);
    expect(defaultResponse).toEqual(expectedDefault);
    expect(successResponse).toEqual(expectedSuccess);
    expect(errorResponse).toEqual(expectedError);
  });
});
