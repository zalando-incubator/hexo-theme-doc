'use strict';


const requestSample = (ctx) => {
  const sample = {
    header: {},
    formData: {},
    body: ''
  };

  const request = ctx.request;
  const baseUrl = ctx.baseUrl;
  let path = ctx.path;
  const verb = ctx.verb.toUpperCase();

  const pathParams = request.path;
  const queryParams = request.query;

  // Headers
  for (const header of request.header){
    sample.header[header.name] = header['x-example'];
  }

  // Form data
  for (const formData of request.formData){
    sample.formData[formData.name] = formData['x-example'];
  }

  // Update path with path params
  pathParams.forEach((param) => {
    if (param['x-example']){
      path = path.replace('{' + param.name + '}', param['x-example']);
    }
  });

  // Prepare query string
  const queryArray = [];
  queryParams.forEach((param) => {
    if (param['x-example']){
      queryArray.push(param.name + '=' + param['x-example']);
    }
  });
  const queryString = queryArray.join('&');
  if (queryString){
    path += '?' + queryString;
  }

  // Request body
  if (request.body.length){
    const _body = request.body[0]['x-examples'] && request.body[0]['x-examples']['default'];
    sample.body = JSON.stringify(_body, null, 2);
  }

  return {
    sample,
    path,
    verb,
    baseUrl
  };
};


module.exports = requestSample;
