const path = require('path');
const { fork } = require('child_process');
const build = require('./build');
const logger = require('./logger');

const DEFAULT_CONFIG = {
  route: 'lunr.json'
};

/**
 * Return a function that represents the hexo generator.
 * When "hexo server" command is used we fork a child process to produce the search index in background since the task can be a time expensive operation.
 * When the child process it's done, it sends back a message containing the computed search index
 *
 * @param options.hexo - the hexo global instance
 * @return {Function} - hexo generator
 */
module.exports =  ({hexo}) => {

  function setRoute({ hexo, result }) {
    const route = hexo.config.lunr.route;
    logger.info(`new search index available at: /${route}`);
    hexo.route.set(route, JSON.stringify(result));
  }

  const {skip, background} = hexo.config.lunr;

  hexo.config.lunr = Object.assign({}, DEFAULT_CONFIG, hexo.config.lunr || {});

  if(skip) { return () => {}; }

  // build the index within the same process
  // wait for the task to complete
  if(!background) {
    logger.info(`run the task in the same process`);
    return function (locals, cb) {
      const result = build({pages: locals.pages});
      setRoute({hexo, result});
      cb();
      return result;
    };
  }

  if(background) {
    logger.info(`run the task in background`);
    // use a child process to don't block the main process
    const child = fork(path.resolve(__dirname, './child.js'));
    child.on('message', (message) => {
      setRoute({ hexo, result: message });
    });

    return function (locals, cb) {
      child.send({pages: locals.pages});
      cb();
    };
  }
};

