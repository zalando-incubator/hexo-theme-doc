'use strict';

const path = require('path');
const {getBody, getResponse} = require('./swaggerParser');

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
      const operations  = Object.keys(paths).reduce((acc, path_) => {
        const ops = Object.keys(paths[path_]).map((verb) => {
          const operation = paths[path_][verb];
          return Object.assign({}, operation, {
            verb,
            path: path_,
            title: operation.summary
          });
        });
        return acc.concat(ops);
      }, []);

      return {
        operations
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
        request
      };
    }
  },
  responses: {
    include: true,
    template: path.resolve(__dirname, './templates/responses.ejs'),
    controller: (ctx) => {
      const operation = ctx.operation;
      const responses = operation['responses'];
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
      const response = getResponse(originalResponse);

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
  }
};
