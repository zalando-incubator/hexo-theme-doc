'use strict';


const responses = (ctx) => {
  const operation = ctx.operation;
  const allResponses = operation['responses'];

  const responses = {
    successResponse: {},
    errorResponse: {},
    defaultResponse: null
  };

  Object.keys(allResponses).sort().forEach((key) => {
    const response = allResponses[key];
    const responseCode = key.toString();

    if (responseCode.match(/^(2|3)/)){
      responses.successResponse[key] =  response;
    } else if (responseCode.match(/^(4|5)/)){
      responses.errorResponse[key] = response;
    } else if ('default' === key){
      responses.defaultResponse = response;
    }
  });

  return {
    responses
  };
};


module.exports = responses;
