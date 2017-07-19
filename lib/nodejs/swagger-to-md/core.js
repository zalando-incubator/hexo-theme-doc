'use strict';

const {merge} = require('lodash');
const {PassThrough} = require('stream');
const consolidate = require('consolidate');

/**
 * Creates a transfomrer function
 *
 * @param  {Object} defaultOptions - the default options for a transformer
 * @param  {function} defaultOptions.input - a function that will receive the user input and returns a promise that resolves the context
 * @param  {Object} defaultOptions.modules - an object that represents the default modules
 *
 * @return {function} - transformer function
 *
 * @example
 *
 * //
 * // file: package-to-md-transformer.js
 * //
 *
 * module.exports = createTransformer({
 *    input: (jsonFilePath) => require(jsonFilePath),
 *    modules: {
 *      head: {
 *        order: 0,
 *        template: path.resolve(__dirname, './my-templates/head.ejs'),
 *        controller: (ctx) => { text: `${ctx.name.toUpperCase()} - ${ctx.version}` }
 *      }
 *    }
 * });
 *
 * //
 * // file: head.ejs
 * //
 *
 * # <%= text %>
 *
 * //
 * // file: package.json
 * //
 *
 * {
 *   "name": "foo",
 *   "version": "2.0.0"
 * }
 *
 * //
 * // file: index.js
 * //
 *
 * const transformer = require('./package-to-md-transformer');
 *
 * transformer('./package.json')
 *  .pipe(process.stdout); // the output will be: # Foo - 2.0.0
 *
 */
function createTransformer (defaultOptions) {

  /**
   * Transform an input to a processed output as a readable stream
   *
   * @param  {any} input - the transformer input
   * @param  {Object} [options={}] - user options overriding defaultOptions
   * @return {stream.Readable} - readable stream
   */
  return function transformer (input, options = {}) {
    const stream = new PassThrough();
    const opt = merge({}, defaultOptions, options);
    const modules = Object.keys(opt.modules).reduce((acc, key) => {
      const mod = opt.modules[key];
      mod.key = key;
      acc.push(mod);
      return acc;
    }, []).sort((m1, m2) => m1.order - m2.order);

    opt
      .input(input)
      .then((ctx) => {
        const promises = modules.map((m) => {
          const ctrl = typeof m.controller === 'function' ? m.controller : (ctx) => ctx;
          const locals = ctrl(Object.assign({ cache: false }, ctx));
          return consolidate.ejs(m.template, locals)
            .then((output) => {
              stream.push(output);
              return output;
            });
        });
        return Promise.all(promises);
      }).then(() => {
        stream.push(null);
      }).catch((err) => {
        stream.emit('error', err); // The emitting of an error event will end the stream. The end event will not be fired(explicitly).
      });

    return stream;
  };
}

module.exports = {createTransformer};
