const path = require('path');
const fs = require('fs');
const converter = require('widdershins');
const validator = require('swagger-parser');
const yaml = require('js-yaml');

function swaggerToMarkdown(filepath, options) {
  const specFileContent = fs.readFileSync(filepath,'utf8');
  const ext = path.extname(filepath);
  return validator
    .validate(filepath)
    .then(() => {
      const swaggerObj = ext === 'json' ? JSON.parse(specFileContent) : yaml.safeLoad(specFileContent);
      return converter.convert(swaggerObj, options);
    });
}

function markdownToHTML(string) {
  return hexo.render.render({text: string, engine: 'markdown'}).then((html) => {
    return `<div class="hexo-swagger-to-md">${html}</div>`;
  })
}

hexo.extend.tag.register('swagger_to_md', function(args){
  const ctx = this;
  const swagger_path = path.resolve(path.dirname(ctx.full_source), args[0]);
  return swaggerToMarkdown(swagger_path, { header: false, single: false})
    .then(markdownToHTML);
}, {async: true});
