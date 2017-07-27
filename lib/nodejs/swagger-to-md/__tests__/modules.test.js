'use strict';

const modules = require('../modules');

describe('swagger-to-md.modules', () => {
  describe('operations.controller', () => {
    it('should transform the context as expected', () => {
      const ctx = {
        paths: {
          '/foo/{fooId}': {
            'get': {
              summary: 'Get Foo'
            },
            'post': {
              summary: 'Post Foo'
            }
          },
          '/bar/{barId}': {
            'get': {
              summary: 'Get Bar'
            }
          },
        }
      };

      const {operations} = modules.operations.controller(ctx);

      expect(operations).toBeInstanceOf(Array);
      expect(operations.length).toBe(3);

      expect(operations[0].title).toBe('Get Foo');
      expect(operations[0].verb).toBe('get');
      expect(operations[0].path).toBe('/foo/{fooId}');

      expect(operations[1].title).toBe('Post Foo');
      expect(operations[1].verb).toBe('post');
      expect(operations[1].path).toBe('/foo/{fooId}');

      expect(operations[2].title).toBe('Get Bar');
      expect(operations[2].verb).toBe('get');
      expect(operations[2].path).toBe('/bar/{barId}');
    });
  });
});
