'use strict';


describe('swagger.Swagger', () => {

  const mockValidate = () => Promise.resolve({schema: 'VALIDATED_DEREFERENCED_SCHEMA'});
  const mockBundle = () => Promise.resolve({schema: 'REFERENCED_SCHEMA'});

  jest.mock('swagger-parser', () => ({
    validate: mockValidate,
    bundle: mockBundle
  }));

  const Swagger = require('../swagger');

  it('should expose swagger object', () => {
    expect(Swagger).toBeDefined();
  });

  describe('when swagger path is not passed', () => {
    it('should throw error', () => {
      try {
        new Swagger() ;
        fail('Swagger didn\'t throw error when passing no argument');  // eslint-disable-line no-undef
      } catch (error){
        expect(error).toEqual(new TypeError('Please provide path for swagger schema or a valid swagger object.'));
      }
    });
  });

  describe('when swagger path is passed', () => {
    it('should create a swagger object', () => {
      const swagger = new Swagger('path/to/swagger');
      expect(typeof swagger).toBe('object');
    });

    describe('when calling validate', () => {
      const swagger = new Swagger('path/to/swagger');


      it('should validate the schema and return the object', async () => {
        await expect(swagger.validate()).resolves.toEqual({swaggerInput: 'path/to/swagger', swaggerObject: {schema: 'VALIDATED_DEREFERENCED_SCHEMA'}});
      });
    });

    describe('when calling bundle', () => {
      const swagger = new Swagger('path/to/swagger');


      it('should return references schema', async () => {
        await expect(swagger.bundle()).resolves.toEqual({swaggerInput: 'path/to/swagger', swaggerObject: {schema: 'REFERENCED_SCHEMA'}});
      });
    });

    describe('should decorate swagger using passed decorator', () => {
      const swagger = new Swagger('path/to/swagger');


      const decorator = () => ({schema: 'DECORATED_SWAGGER'});

      it('should return references schema', async () => {
        await expect(swagger.decorate(decorator)).resolves.toEqual({swaggerInput: 'path/to/swagger', swaggerObject: {schema: 'DECORATED_SWAGGER'}});
      });
    });

    describe('when getting swaggerJson', () => {
      const swagger = new Swagger('path/to/swagger');

      it('should return references schema', () => {
        return swagger
          .validate()
          .then((swagger) => {
            const swaggerJson = swagger.swaggerJson;
            const expectedJson = {
              'schema': 'VALIDATED_DEREFERENCED_SCHEMA'
            };
            expect(swaggerJson).toEqual(JSON.stringify(expectedJson));
          });
      });
    });
    describe('when getting swaggerYaml', () => {
      const swagger = new Swagger('path/to/swagger');

      it('should return references schema', () => {
        return swagger
          .validate()
          .then((swagger) => {
            const swaggerYaml = swagger.swaggerYaml;
            const expectedYaml = 'schema: VALIDATED_DEREFERENCED_SCHEMA\n';
            expect(swaggerYaml).toEqual(expectedYaml);
          });
      });
    });


  });

});
