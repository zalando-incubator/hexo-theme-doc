'use strict';

const { isExclude } = require('../utils');
const { filter } = require('lodash');


/**
 * Filter parameters.
 */
const filterParameters = (swagger) => {

  const paramsToRemove = [];

  let parameters = swagger.parameters;
  parameters = parameters && Object
    .keys(parameters)
    .forEach((key) => {
      const value = parameters[key];
      if (isExclude(value)){
        delete parameters[key];
        paramsToRemove.push(key);
      }
    });


  /**
   * Filter params for operations
   * */
  if (paramsToRemove.length){
    swagger.paths && Object
      .keys(swagger.paths)
      .forEach((key) => {
        const path = swagger.paths[key];
        path && Object
          .keys(path)
          .forEach((verb) => {
            const operation = path[verb];
            if ('object' !== typeof operation){
              return;
            }

            const parameters = operation.parameters;
            if (Array.isArray(parameters)){
              operation.parameters = filter(parameters, parameter => !isExclude(parameter));
            }
          });
      });
  }

  return swagger;
};


module.exports = filterParameters;
