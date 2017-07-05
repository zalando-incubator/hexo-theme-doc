'use strict';

/* global hexo */

const generator = require('../lib/nodejs/search/generator');

const createGeneratorFn = ({hexo}) => {
  const cmd = hexo.env.args._.length ? hexo.env.args._[0] : null;

  // apply the generator just when server or generate command are invoked
  const skip = cmd !== 'generate' && cmd !== 'server' && cmd !== 'g' && cmd !== 's';

  // run in background when server command is used,
  // unless background is "forced" to false by the user configuration
  const background = cmd === 'server' || cmd === 's';

  hexo.config.lunr = Object.assign({}, { skip, background }, hexo.config.lunr || {});

  return generator({hexo});
};

hexo.extend.generator.register('search', createGeneratorFn({hexo}));
