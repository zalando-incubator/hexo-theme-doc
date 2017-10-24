'use strict';

const SwaggerParser = require('swagger-parser');
const Promise = require('bluebird');
const {merge} = require('lodash');
const jsYaml = require('js-yaml');
const isPlainObj = require('is-plain-obj');

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
   * Validates and bundles swagger.
   *
   * Merges dereferenced and referenced swagger objects, the merged object will contain $refs and the referenced object.
   */
  merge (){
    const validatePromise = this._validate(this.swaggerInput);
    const bundlePromise = this._bundle(this.swaggerInput);
    const promiseArray = [validatePromise, bundlePromise];
    const that = this;

    // Merging referenced and deferened swagger object to have ref links and the derefrenced object.
    return Promise.reduce(
      promiseArray,
      (aggregate, swagger) => {
        return merge(aggregate, swagger);
      },
      {}
    )
      .then((mergedSchema) => {
        that.swaggerObject = mergedSchema;
        return Promise.resolve(this);
      });
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
   * Revert the merge of referenced and dereferenced swagger, and use $ref where-ever it is.
   *
   * */
  unmerge (){
    const refMatchingFunction = (obj) => {
      if (obj.hasOwnProperty('$ref')){
        return true;
      }
      return false;
    };

    this.swaggerObject = this._traverseToUnmerge(this.swaggerObject, refMatchingFunction);

    return Promise.resolve(this);
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


  /**
   * Travers swagger object and unmerge keys matched to fn.
   */
  _traverseToUnmerge (subject, fn){
    if (isPlainObj(subject)){

      if (fn(subject)){
        subject = {
          '$ref': subject['$ref']
        };
      }

      subject = Object
        .keys(subject)
        .reduce((acc, key) => {
          if (fn(subject[key])){
            subject[key] = {
              '$ref': subject[key]['$ref']
            };
          } else {
            subject[key] = this._traverseToUnmerge(subject[key], fn);
          }
          return acc;
        },
        subject);

    } else if (Array.isArray(subject)){
      subject = subject
        .reduce((acc, key) => {
          acc.push(this._traverseToUnmerge(key, fn));
          return acc;
        },
        []);
    }

    return subject;
  }
}

module.exports = Swagger;
