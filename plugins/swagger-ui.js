'use strict';

const createSwaggerUI = require('../lib/nodejs/swagger-ui/index');

module.exports = ({hexo}) => {
  const {swaggerUITag, swaggerUIProcessor} = createSwaggerUI({hexo});

  hexo.extend.tag.register('swagger_ui', swaggerUITag, {async: true});

  /**
   * This funtion is called when any file is processed. It is automatically hooked to the watch task and is called if any file is modified.
   * */
  hexo.extend.processor.register('*', swaggerUIProcessor);
};
