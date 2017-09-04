'use strict';

const path = require('path');
const {getBody, getResponse, filterResponses} = require('../swagger-parser');
const jsonMarkup = require('json-markup');

const toSlug = (words) => {
  return encodeURIComponent(words.replace(/\s/g, '-').replace(/\./g, ''));
};

module.exports = {
  head: {
    order: 0,
    template: path.resolve(__dirname, './templates/head.ejs')
  },
  operations: {
    order: 1,
    template: path.resolve(__dirname, './templates/operations.ejs'),
    controller: (ctx) => {
      const paths = ctx.paths;

      ctx.schemes = ctx.schemes || [];

      let baseUrl = '';
      if (ctx.schemes.includes('https')){
        baseUrl += 'https://';
      } else {
        baseUrl += 'http://';
      }
      baseUrl += ctx.host + ctx.basePath;

      const operations  = Object.keys(paths).reduce((acc, path_) => {
        const ops = Object.keys(paths[path_]).map((verb) => {
          const operation = paths[path_][verb];
          const title = operation.summary || operation.operationId || operation.description || '';
          return Object.assign({}, operation, {
            verb,
            path: path_,
            title: title,
            id: toSlug(title)
          });
        });
        return acc.concat(ops);
      }, []);

      return {
        operations,
        baseUrl
      };
    }
  },
  operation: {
    include: true,
    template: path.resolve(__dirname, './templates/operation.ejs')
  },
  header: {
    include: true,
    template: path.resolve(__dirname, './templates/header.ejs')
  },
  requestParams: {
    include: true,
    template: path.resolve(__dirname, './templates/requestParams.ejs')
  },
  requestBody: {
    include: true,
    template: path.resolve(__dirname, './templates/requestBody.ejs'),
    controller: ( ctx ) => {
      const body = [];

      ctx['body'].forEach((item) => {
        body.push(getBody(item));
      });

      return {
        body
      };
    }
  },
  request: {
    include: true,
    template: path.resolve(__dirname, './templates/request.ejs'),
    controller: (ctx) => {
      const operation = ctx.operation;
      const parameters = operation.parameters;
      const baseUrl = ctx.baseUrl;
      const path = operation.path;
      const verb = operation.verb;
      const request = {
        header: [],
        path: [],
        query: [],
        formData: [],
        body: []
      };

      parameters && parameters.forEach((param) => {
        const paramType = param['in'];
        request[paramType] && request[paramType].push(param);
      });

      return {
        request,
        path,
        verb,
        baseUrl
      };
    }
  },
  responses: {
    include: true,
    template: path.resolve(__dirname, './templates/responses.ejs'),
    controller: (ctx) => {
      const operation = ctx.operation;
      const allResponses = operation['responses'];
      const responses = filterResponses(allResponses);

      return {
        responses
      };
    }
  },
  response: {
    include: true,
    template: path.resolve(__dirname, './templates/response.ejs'),
    controller: (ctx) => {
      const responseCode = ctx['responseCode'];
      const originalResponse = ctx['response'];
      const responseData = getResponse(originalResponse);
      const response = {
        description: originalResponse.description,
        data: responseData
      };

      return {
        responseCode,
        response
      };
    }
  },
  emptyResponse: {
    include: true,
    template: path.resolve(__dirname, './templates/emptyResponse.ejs')
  },
  responseBody: {
    include: true,
    template: path.resolve(__dirname, './templates/responseBody.ejs')
  },
  requestSample: {
    include: true,
    template: path.resolve(__dirname, './templates/requestSample.ejs'),
    controller: (ctx) => {
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
    }
  },
  responseSample: {
    include: true,
    template: path.resolve(__dirname, './templates/responseSample.ejs'),
    controller: (ctx) => {
      let sample = ctx.sample;
      if (sample){
        sample = sample['application/json'];
        // sample = JSON.stringify(sample, null, 2);
        sample = jsonMarkup(sample);
      }
      return {
        sample
      };
    }
  }
};
