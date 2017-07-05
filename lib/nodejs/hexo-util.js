'use strict';

module.exports = ({hexo}) => {
  return {
    url_for: hexo.extend.helper.get('url_for').bind({
      config: hexo.config,
      relative_url: hexo.extend.helper.get('relative_url')
    })
  };
};
