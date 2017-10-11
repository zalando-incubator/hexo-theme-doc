'use strict';

const path = require('path');
const fs = require('fs');
const transformer = require('../lib/nodejs/swagger-to-html');

module.exports = ({hexo}) => {
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

    handleDownload (specPath){

      const downloadRoute = path.relative(hexo.source_dir, specPath);

      const readableStream = fs.createReadStream(specPath);
      let data = '';

      readableStream
        .on('readable', () => {
          let chunk;
          while ((chunk = readableStream.read()) !== null) {
            data += chunk;
          }
        })
        .on('end', () => {
          hexo.route.set(downloadRoute, data);
        });

      return downloadRoute;
    }

    get processor (){

      const engine = this.engine;
      const that = this;

      return function (args){
        const ctx = this;
        const specPath = path.resolve(path.dirname(ctx.full_source), args[0]);

        let output = '';
        const transformerPromise = new Promise((resolve, reject) => {
          const readableStream = transformer(specPath);

          readableStream.on('readable', () => {
            let chunk;
            while ((chunk = readableStream.read()) !== null) {
              output += chunk;
            }
          })
            .on('end', () => {
              resolve(output);
            })
            .on('error', (err) => {
              reject(err);
            });
        });

        const downloadRoute = that.handleDownload(specPath);

        return transformerPromise.then((output) => {
          return hexo.render.render({text: output.toString(), engine: engine })
            .then((html) =>
              `<div class="doc-swagger-to-html">
                <div class="download-btn" data-download-route="/${downloadRoute}">
                  <a class="download-btn__link" href="/${downloadRoute}" target="_blank" download>Download Schema</a>
                </div>
                ${html}
              </div>`
            );
        });
      };
    }
  }

  hexo.extend.tag.register('swagger_to_html', new SwaggerProcessor('html').processor, {async: true});
};
