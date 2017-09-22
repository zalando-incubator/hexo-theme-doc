'use strict';

/* global hexo */

const path = require('path');
const transformer = require('../lib/nodejs/swagger-to-html');

class SwaggerProcessor{

  /*
   * Default templating enging is 'html'.
   */

  constructor (engine = 'html'){
    const availableEngines = ['md', 'html'];
    this.engine = null;

    if (availableEngines.includes(engine)){
      this.engine = engine;
    } else {
      throw new TypeError(`Templating Engine(${engine}) is not supported.`);
    }
  }

  get processor (){

    const engine = this.engine;

    return function (args){
      const ctx = this;
      const specificationPath = path.resolve(path.dirname(ctx.full_source), args[0]);

      let output = '';
      const transformerPromise = new Promise((resolve, reject) => {
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
      });

      return transformerPromise.then((output) => {
        return hexo.render.render({text: output.toString(), engine: engine })
          .then((html) => `<div class="swagger-processor swagger-processor-${this.engine}">${html}</div>`);
      });
    };
  }
}


hexo.extend.tag.register('swagger_to_html', new SwaggerProcessor('html').processor, {async: true});

