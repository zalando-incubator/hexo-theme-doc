'use strict';

const createSwaggerUI = require('../lib/nodejs/swagger-ui/index');

module.exports = ({hexo}) => {
  const {swaggerUITag} = createSwaggerUI({hexo});

  hexo.extend.tag.register('swagger_ui', swaggerUITag, {async: true});
};
