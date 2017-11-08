'use strict';

const pathsFilter = require('../paths');

const dummySwagger = {
  paths: {
    '/pets': {
      'get': {
      }
    },
    '/pets/id':{
      'x-doc': {
        'exclude': true
      }
    }
  }
};

const expectedSwagger = {
  paths: {
    '/pets': {
      'get': {
      }
    }
  }
};

describe('docExclude.paths', () => {
  it('should filter paths', () => {
    const updatedSwagger = pathsFilter(dummySwagger);

    expect(updatedSwagger).toEqual(expectedSwagger);
  });
});

