'use strict';

const mockJsonMarkup = jest.fn(json => json);
jest.mock('json-markup', () => mockJsonMarkup);

const responseSampleController = require('../responseSample');

describe('controllers.responseSample', () => {
  it('should transform context as expected', () => {
    const responseData = {
      'data': {
      },
      'links': {
      }
    };
    const ctx = {
      sample: {
        'application/json': responseData
      }
    };

    const {sample} = responseSampleController(ctx);

    expect(sample).toEqual(responseData);
    expect(mockJsonMarkup).toBeCalled();

  });
});
