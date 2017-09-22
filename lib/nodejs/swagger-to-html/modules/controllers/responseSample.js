'use strict';

const jsonMarkup = require('json-markup');

const responseSample = (ctx) => {
  let sample = ctx.sample;
  if (sample){
    sample = sample['application/json'];
    // sample = JSON.stringify(sample, null, 2);
    sample = jsonMarkup(sample);
  }
  return {
    sample
  };
};


module.exports = responseSample;
