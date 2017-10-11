'use strict';

const generator = require('../lib/nodejs/search/generator');
const util = require('../lib/nodejs/hexo-util');

const DEFAULT_CONFIG = { route: '/lunr.json' };

module.exports = ({hexo}) => {
  const {themeConfig} = util({hexo});
  hexo.extend.generator.register('search', createGeneratorFn({hexo, themeConfig}));
};

function createGeneratorFn ({hexo, themeConfig}) {
  const cmd = hexo.env.args._.length ? hexo.env.args._[0] : null;

  // apply the generator just when server or generate command are invoked
  const skip = cmd !== 'generate' && cmd !== 'server' && cmd !== 'g' && cmd !== 's';

  // run in background when server command is used,
  // unless background is "forced" to false by the user configuration
  const background = cmd === 'server' || cmd === 's';

  themeConfig({ search: { skip, background, route: DEFAULT_CONFIG.route } });

  return generator({hexo});
}
