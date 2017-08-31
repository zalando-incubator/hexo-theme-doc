'use strict';

let result;

function traverse ({object, key, isRequired, init}){
  // Check object type.
  const type = object.type;

  if (init){
    result = {};
  }

  if ('array' === type){
    return processArray({object, key, isRequired, result});
  }

  if ('object' === type){
    return processObject({object, key, isRequired, result});
  }

  if (object.enum){
    return processEnum({object, key, isRequired, result}) ;
  }

  return processDefault({object, key, isRequired, result});
}



module.exports = {
  traverse
};

const {processArray, processObject, processEnum, processDefault} = require('./processItems') ;
