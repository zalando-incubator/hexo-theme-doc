'use strict';

let result;

const traverse = ({object, key, isRequired}) => {
  // Check object type.
  const type = object.type;

  if ('array' === type){
    return processArray({object, key, isRequired});
  }

  if ('object' === type){
    return processObject({object, key, isRequired});
  }

  if (object.enum){
    return processEnum({object, key, isRequired}) ;
  }

  return processDefault({object, key, isRequired});
};

const processDefault = ({object, key, isRequired}) => {
  updateResult({object, key, isRequired});
  return result;
};

const processEnum = ({object, key, isRequired}) => {
  object.type = 'enum';
  object.values = object.enum;
  updateResult({object, key, isRequired});
  return result;
};

const processArray = ({object, key, isRequired}) => {
  updateResult({object, key, isRequired});
  const items = object.items;
  return traverse({
    object: items,
    key: key + '[]'
  });
};

const processObject = ({object, key, isRequired}) => {
  updateResult({object, key, isRequired});

  // Check for additional properteis
  // FIXME:: Check the representation of additionalProperties
  if (object.additionalProperties){
    object = object.additionalProperties;
    updateResult({object, key, isRequired});
  }

  const properties = object.properties || {};
  const required = object.required || [] ;

  return Object.keys(properties).reduce((result, propertyName) => {
    const property = properties[propertyName];
    const childKey = key ? (key + '.' + propertyName) : propertyName;
    const isRequired = required.includes(propertyName);

    return traverse({
      object: property,
      key: childKey,
      isRequired
    });

  }, result);
};

const updateResult = ({object, key, isRequired}) => {
  if (!key){
    return false;
  }

  result[key] = result[key] || {};

  const _result = result[key];

  const description = object.description;
  const type = object.type;
  const values = object.values;    // Used for enums
  const required = object.required || isRequired;
  const example = object.example;
  const format = object.format;

  if (description){
    _result.description = description;
  }

  if (type){
    _result.type = type;
  }

  if (values){
    _result.values = values;
  }

  if (typeof required === 'boolean' && required){
    _result.required = required;
  }

  if (example){
    _result.example = example;
  }

  if (format){
    _result.format = format;
  }

  return true;
};


const getBody = (body) => {

  result = {};

  if (!body){
    return result;
  }

  const schema = body.schema;

  return traverse({
    object: schema,
    key: ''
  });
};

const getResponse = (response) => {

  result = {};

  if (!response){
    return result;
  }
  const schema = response.schema;

  if (schema){
    return traverse({
      object: schema,
      key: ''
    });
  } else {
    response.__noData = true;
    return response;
  }
};


module.exports =  {
  getBody,
  getResponse
};
