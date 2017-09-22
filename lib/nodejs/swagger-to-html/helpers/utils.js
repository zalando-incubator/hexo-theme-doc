'use strict';


const {mergeWith, isArray, uniq} = require('lodash');

const arrayMergeCustomizer = (objValue, srcValue) => {
  if (isArray(objValue)) {
    return uniq(objValue.concat(srcValue));
  }
};

const deepMerge = (object, sources, customizer) => {
  const finalCustomizer = customizer || arrayMergeCustomizer;
  return mergeWith(object, sources, finalCustomizer);
};


const toSlug = (words) => {
  return encodeURIComponent(words.replace(/\s/g, '-').replace(/\./g, ''));
};

module.exports = {
  deepMerge,
  toSlug
};
