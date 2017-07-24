'use strict';

const fs = require('fs');
const {merge} = require('lodash');
const {PassThrough} = require('stream');
const consolidate = require('consolidate');
consolidate.requires.ejs = require('ejs');

module.exports = {createTransformer};

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
 * // file: content.ejs
 * //
 *
 * <div>
 *  <h1><%= pkg.name %></h1>
 *  <div><strong>version:</strong> <%= pkg.version %></div>
 *  <%- include_module('description', { description: pkg.description }) %>
 * </div>
 *
 * //
 * // file: description.ejs
 * //
 *
 * <p><%= description %></p>
 *
 * //
 * // file: footer.ejs
 * //
 *
 * <footer>
 *    <small><%= pkg.license || 'NO LICENSE' %> - 2017</small>
 * </footer>
 *
 * //
 * // file: package.json
 * //
 *
 * {
 *   "name": "foo",
 *   "version": "2.0.0",
 *   "description": "foo description"
 * }
 *
 * //
 * // file: index.js
 * //
 *
 * const transformer = createTransformer({
 *    input: (json) => Promise.resolve(require(json)),
 *    modules: {
 *      head: {
 *        order: 0,
 *        template: path.resolve(__dirname, './head.ejs'),
 *        controller: (pkg) => { return { pkg } }
 *      },
 *      description: {
 *        include: true,
 *        template: path.resolve(__dirname, './description.ejs')
 *      },
 *      footer: {
 *        order: 1,
 *        template: path.resolve(__dirname, './footer.ejs')
 *      }
 *    }
 * });
 *
 * transformer('./package.json')
 *  .pipe(process.stdout); // the output will be:
 *
 * //
 * // output
 * //
 *
 * <div>
 *  <h1>foo</h1>
 *  <div><strong>version:</strong> 2.0.0</div>
 *  <p>foo description</p>
 * </div>
 * <footer>
 *   <small>NO LICENSE - 2017</small>
 * </footer>
 *
 */
function createTransformer (defaultOptions) {

  /**
   * Transform an input to a compiled text output
   *
   * @param  {any} input - the transformer input
   * @param  {Object} [options={}] - user options overriding defaultOptions
   * @return {stream.Readable} - readable stream
   */
  return function transformer (input, options = {}) {

    const stream = new PassThrough();
    const opt = merge({}, defaultOptions, options);

    const render = typeof opt.render === 'function' ? opt.render : consolidate.ejs;
    const renderString = typeof opt.renderString === 'function' ? opt.renderString : consolidate.requires.ejs.render;

    const modules = Object.keys(opt.modules).reduce((acc, key) => {
      const mod = opt.modules[key];
      mod.key = key;
      mod.controller = typeof mod.controller === 'function' ? mod.controller : (ctx) => ctx;
      acc.push(mod);
      return acc;
    }, []);

    const includeModules = modules.filter(m => m.include === true);

    const layoutModules = modules.filter(m => m.include !== true)
      .sort((m1, m2) => m1.order - m2.order);

    const include_module = createIncludeModule({includeModules, renderString});

    opt
      .input(input)
      .then((ctx) => {
        // render modules in sequence
        return layoutModules.reduce((prev, m) => {
          const locals = m.controller(Object.assign({}, ctx, { include_module }));
          return prev.then(() => {
            return render(m.template, locals)
              .then((output) => {
                stream.push(output);
                return output;
              });
          });
        }, Promise.resolve());
      }).then(() => {
        stream.push(null);
      }).catch((err) => {
        stream.emit('error', err); // The emitting of an error event will end the stream. The end event will not be fired(explicitly).
      });

    return stream;
  };
}

/**
 * Create `include_module` function that can be used inside templates
 *
 * @private
 *
 * @param  {Array} opt.includeModules - registered modules as includes
 * @param  {Function} [opt.renderString] - a function used to render a template syntax string
 * @return {Function} - return include_module function that can be used inside templates
 */
function createIncludeModule ({includeModules, renderString}) {

  return function include_module (key, mctx = {}) {
    const m = includeModules.find(m => m.key === key);

    if (!m) { return ''; }

    const locals = m.controller(Object.assign({}, this, mctx, { include_module }));
    const string = fs.readFileSync(m.template, 'utf8');

    return renderString(string, locals);
  };
}
