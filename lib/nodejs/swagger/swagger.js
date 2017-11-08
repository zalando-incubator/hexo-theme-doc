'use strict';

const SwaggerParser = require('swagger-parser');
const Promise = require('bluebird');
const jsYaml = require('js-yaml');

class Swagger{

  /**
   * @param swagger File path for swagger schema or swagger object.
   *
   */
  constructor (swaggerInput){
    if (!swaggerInput){
      throw new TypeError('Please provide path for swagger schema or a valid swagger object.');
    } else {
      this.swaggerInput = swaggerInput;
      // Object containing merge of dereferenced swagger and swagger containing references.
      this.swaggerObject = null;
    }
  }


  /**
   * Validates the swagger schema and gives dereferenced swagger object.
   */
  validate (){
    const that = this;
    return this
      ._validate(this.swaggerInput)
      .then((dereferencedSchema) => {
        that.swaggerObject = dereferencedSchema;
        return that;
      });
  }


  /**
   * Validates the swagger schema and gives dereferenced swagger object.
   */
  bundle (){
    const that = this;
    return this
      ._bundle(this.swaggerInput)
      .then((referencedSchema) => {
        that.swaggerObject = referencedSchema;
        return that;
      });
  }


  /**
   * Decorates swagger object.
   */
  decorate (decorator){
    if ('function' === typeof decorator){
      this.swaggerObject = decorator(this.swaggerObject);
    }
    return Promise.resolve(this);
  }


  /**
   * Returns yamlSchema string.
   */
  get swaggerYaml (){
    return jsYaml.safeDump(this.swaggerObject);
  }


  /**
   * Returns jsonSchema string.
   */
  get swaggerJson (){
    return JSON.stringify(this.swaggerObject);
  }


  /**
   * Internal Methods.
   */

  /**
   * Validates the swagger schema and gives dereferenced swagger object.
   */
  _validate (schema){
    return SwaggerParser.validate(schema);
  }


  /**
   * Bundles and returns referenced swagger object.
   */
  _bundle (schema){
    return SwaggerParser.bundle(schema);
  }

}

module.exports = Swagger;
