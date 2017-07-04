'use strict';

/* global hexo */

const path = require('path');
const transformer = require('../lib/nodejs/swagger-to-md');

function swaggerToMdTag (args) {
  const ctx = this;
  const specificationPath = path.resolve(path.dirname(ctx.full_source), args[0]);

  let output = '';
  return (new Promise((resolve, reject) => {
    transformer(specificationPath)
      .on('data', (chunk) => {
        output += chunk;
      })
      .on('end', () => {
        resolve(output);
      })
      .on('error', (err) => {
        reject(err);
      });
  })).then((output) => {
    return hexo.render.render({text: output.toString(), engine: 'md' })
      .then((html) => {
        return `<div class="hexo-swagger-to-md">${html}</div>`;
      });
  });
}

hexo.extend.tag.register('swagger_to_md', swaggerToMdTag, {async: true});
