'use strict';

const mockGetBody = jest.fn(() =>  'flatBody');
const mockSwaggerParser = {
  getBody: mockGetBody
};

jest.mock('../swaggerParser', () => mockSwaggerParser);

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

  describe('request.controller', () => {
    it('should transform the context as expected', () => {
      const headerParam = {
        name: 'headerParam',
        in: 'header',
        description: 'description',
        required: 'true',
        type: 'string',
        format: 'format',
      };
      const pathParam = {
        name: 'pathParam',
        in: 'path',
        description: 'description',
        required: 'true',
        type: 'string',
        format: 'format',
      };
      const queryParam = {
        name: 'queryParam',
        in: 'query',
        description: 'description',
        required: 'true',
        type: 'string',
        format: 'format',
      };
      const formDataParam = {
        name: 'formDataParam',
        in: 'formData',
        description: 'description',
        required: 'true',
        type: 'string',
        format: 'format',
      };
      const bodyParam = {
        name: 'bodyParam',
        in: 'body',
        description: 'description',
        required: 'true',
        type: 'string',
        format: 'format',
      };
      const ctx = {
        operations: [ {} ],
        operation: {
          summary: 'A nice summary',
          description: 'A nice description',
          parameters: [
            headerParam,
            pathParam,
            queryParam,
            formDataParam,
            bodyParam
          ],
          tags: [],
          produces: [],
          responses: {},
          verb: 'get',
          path: '/path',
          title: 'title',
        }
      };

      const {request} = modules.request.controller(ctx);

      expect(request).toBeInstanceOf(Object);
      expect(Object.keys(request).length).toBe(5);
      expect(request.header[0]).toBe(headerParam);
      expect(request.path[0]).toBe(pathParam);
      expect(request.query[0]).toBe(queryParam);
      expect(request.formData[0]).toBe(formDataParam);
      expect(request.body[0]).toBe(bodyParam);
    });
  });
  describe('requestBody.controller', () => {
    it('should transform the context as expected', () => {
      const ctx = {
        request: {},
        body: [
          {},
          {}
        ]
      };
      const {body} = modules.requestBody.controller(ctx);
      expect(body).toBeInstanceOf(Array);
      expect(body.length).toBe(2);
      expect(body[0]).toBe('flatBody');
    });
  });
});
