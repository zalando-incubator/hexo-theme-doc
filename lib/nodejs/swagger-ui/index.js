'use strict';


const path = require('path');
const isAbsoluteUrl = require('is-absolute-url');
const hexoUtil = require('../hexo-util');

const createSwaggerUI = function ({hexo}) {

  const {url_for} = hexoUtil({hexo});

  let id = 0;

  const renderSnippet = ({swaggerUrl}) => {
    id++;
    const snippetPath = path.resolve(__dirname, './partials/snippet.ejs');
    return hexo.render.render({path: snippetPath}, { id, swaggerUrl })
      .then((snippet) => `<div class="hexo-swagger-ui">${snippet}</div>`);
  };

  const getSwaggerUrl = (specReference, ctx) => {
    if (isAbsoluteUrl(specReference)) {
      return specReference;
    }

    const specAbsPath = path.resolve(path.dirname(ctx.full_source), specReference);

    let specUrl = url_for(path.relative(ctx.source_dir, specAbsPath));

    // FIXME: replace extension with json since hexo transform yaml as json when generating the route
    specUrl = specUrl.substr(0, specUrl.lastIndexOf('.')) + '.json';

    return specUrl;
  };

  function swaggerUITag (args){
    const ctx = this;
    const swaggerUrl = getSwaggerUrl(args[0], {
      source_dir: hexo.source_dir,
      full_source: ctx.full_source
    });
    return renderSnippet({swaggerUrl});
  }

  return {
    swaggerUITag
  };
};

module.exports = createSwaggerUI;
