'use strict';

const {mockFileContent} = require('./mocks');
const ParseSchemaFileError = require('../parse-schema-file-error.js');

/**
 * Mocking implementation, so that for first two calls it responds with content and in third call it will throw an error.
 */
const mockReadFileSync = jest.fn()
  .mockImplementationOnce( path => mockFileContent[path] )
  .mockImplementationOnce( path => mockFileContent[path] )
  .mockImplementationOnce( path  => {
    throw new ParseSchemaFileError({
      'message': 'File read error',
      'filePath': path,
      'referencePath': 'pageSource'
    });
  });

/**
 * Mocking implementation, so that first and third call will be resolved and second call will rejected.
 */

const mockValidate = jest.fn()
  .mockImplementationOnce( ()  => Promise.resolve())
  .mockImplementationOnce( path  => Promise.reject(new ParseSchemaFileError({
    'message': 'Swagger Parse Error',
    'filePath': path,
    'referencePath': 'pageSource'
  }))
  )
  .mockImplementationOnce(()  => Promise.resolve());

describe('parse-schema-file', () => {

  jest.mock('fs', () => ({
    readFileSync: mockReadFileSync
  }));

  jest.mock('swagger-parser', () => ({
    validate: mockValidate
  }));

  const parseSchemaFile = require('../parse-schema-file');

  test('should parse the schema file', async () => {
    const swaggerFilePath = '/path/to/swagger/petstore.json';
    const mdFilePath = 'path/to/md/file';
    const expectedOutput = {
      'pageSource': mdFilePath,
      'swagger': mockFileContent[swaggerFilePath]
    };
    await expect(parseSchemaFile(swaggerFilePath, mdFilePath)).resolves.toEqual(expectedOutput);
  });

  test('should catch swagger parsing error when swagger file contains invalid schema', async () => {
    const swaggerFilePath = '/path/to/swagger/error.json';
    const mdFilePath = 'path/to/md/file';
    await expect(parseSchemaFile(swaggerFilePath, mdFilePath)).rejects.toBeInstanceOf(ParseSchemaFileError);
  });

  test('should catch file read error for file read issues', async () => {
    const swaggerFilePath = '/path/to/swagger/petstore.json';
    const mdFilePath = 'path/to/md/file';
    await expect(parseSchemaFile(swaggerFilePath, mdFilePath)).rejects.toBeInstanceOf(ParseSchemaFileError);
  });
});
