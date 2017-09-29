'use strict';

/* global hexo */

const generator = require('../lib/nodejs/search/generator');
const {themeConfig} = require('../lib/nodejs/hexo-util')({hexo});

const DEFAULT_CONFIG = { route: '/lunr.json' };

const createGeneratorFn = ({hexo}) => {
  const cmd = hexo.env.args._.length ? hexo.env.args._[0] : null;

  // apply the generator just when server or generate command are invoked
  const skip = cmd !== 'generate' && cmd !== 'server' && cmd !== 'g' && cmd !== 's';

  // run in background when server command is used,
  // unless background is "forced" to false by the user configuration
  const background = cmd === 'server' || cmd === 's';

  themeConfig({ search: { skip, background, route: DEFAULT_CONFIG.route } });

  return generator({hexo});
};

hexo.extend.generator.register('search', createGeneratorFn({hexo}));
