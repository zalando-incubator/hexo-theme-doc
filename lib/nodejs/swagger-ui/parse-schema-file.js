'use strict';

const fs = require('fs');
const path = require('path');
const validator = require('swagger-parser');
const yaml = require('js-yaml');
const ParseSchemaFileError = require('./parse-schema-file-error.js');


function parseSchemaFile (filepath, pageSource) {
  try {
    const specFileContent = fs.readFileSync(filepath,'utf8');
    const ext = path.extname(filepath);
    return validator
      .validate(filepath)
      .then(() => {
        const swaggerObj = ext === 'json' ? JSON.parse(specFileContent) : yaml.safeLoad(specFileContent);
        return {
          pageSource: pageSource,
          swagger: JSON.stringify(swaggerObj)
        };
      })
      .catch(() => {
        return Promise.reject(new ParseSchemaFileError({
          'message': 'There is an error parsing the swagger file.',
          'filePath': filepath,
          'referencePath': pageSource
        }));
      });
  } catch (error){
    return Promise.reject( new ParseSchemaFileError({
      'message': 'There is an error reading the file.',
      'filePath': filepath,
      'referencePath': pageSource
    }));
  }
}

module.exports = parseSchemaFile;
