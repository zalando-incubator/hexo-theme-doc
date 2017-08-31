'use strict';

const {init} = require('./init');

const getBody = (body) => {

  if (!body || !body.schema){
    return {};
  }

  const schema = body.schema;

  return init({ object: schema });
};

module.exports = {
  getBody
};
