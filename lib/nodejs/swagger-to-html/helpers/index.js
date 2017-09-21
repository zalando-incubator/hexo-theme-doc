'use strict';


const { parseResponse, parseBody } = require('./parser');
const { toSlug , deepMerge } = require('./utils');

module.exports = {
  parseResponse,
  parseBody,
  toSlug,
  deepMerge
};

