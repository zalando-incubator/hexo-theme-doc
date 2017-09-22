'use strict';

const modules = require('./modules');
const SwaggerParser = require('swagger-parser');
const {createTransformer} = require('./core');

module.exports = createTransformer({
  input: api => SwaggerParser.validate(api),
  modules
});
