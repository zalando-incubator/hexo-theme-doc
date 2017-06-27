const path = require('path');
const fs = require('fs');
const validator = require('swagger-parser');
const yaml = require('js-yaml');
const touch = require("touch");
const log = hexo.log || console;
/**
 * processedPages = {}
 * processedPages is a dictionary to make sure that js/css library tags are inserted only once in the page.
 *
 * Structure:
 * {
 *    processedPageURI: 'true/false depending upon whether or not library tags are inserted in it or not.'
 * }
 * */
const processedPages = {};


/**
 * specBacklinks
 *
 * A data structure to store the files that are embedding a particular spec
 * so that when ever the spec changes we can touch the file that is using the spec(and this will force the file to reload as its last modified time got changed).
 *
 * Structure:
 * {
 *  pathOfSwaggerFile: Set('path/of/mdFile1', 'path/of/mdFile2')    //Set of files using the swagger file.
 * }
 *
 */
const specBacklinks = {};


const uiGenerator = (function () {

  /* instance is an autoincrement variable to keep the track of instances,  so that we can have unique HTML id in each instance */
  let instance = 0;

  return {
    /*
     * Function exposed to get HTML for a specific swagger object.
     *
     * pageSource: It is used to make sure that the libraries are inserted only once.
     *
     * swagger: The swagger object.
     */
    getHtml: function ({pageSource, swagger}) {
      instance++;

      /**
       * url_for:
       * Helper to fix issue with render not understanding helpers. Injecting helpers to render.
       */
      const url_for = hexo.extend.helper.get('url_for').bind({
        config: hexo.config,
        relative_url: hexo.extend.helper.get('relative_url')
      });

      /**
       * Render the angular snippet.
       *
       * Check whether the page is in processedPages.
       *
       * If it is there just respond with the angular snippet and if not also add the library tags.
       *
       * And update processedPages if you process the page.
       */

        return hexo.render.render({path: './themes/stargate-doc/layout/swagger-ui/snippet.ejs'}, { id: instance, swagger: swagger, url_for: url_for })
        .then((snippet) => {

            if(!processedPages[pageSource]){
              processedPages[pageSource] = true;

              return hexo.render.render({path: './themes/stargate-doc/layout/swagger-ui/libs.ejs'}, { url_for: url_for })
              .then((libs) => {
                return `<div class="hexo-swagger-ui">${libs + snippet}</div>`;
              })

            }else{
              return `<div class="hexo-swagger-ui">${snippet}</div>`;
            }

        })

      return getTemplate(swagger);
    }
  }
})();

function parseSchemaFile(filepath, pageSource) {
  try{
    const specFileContent = fs.readFileSync(filepath,'utf8');
    const ext = path.extname(filepath);
    return validator
      .validate(filepath)
      .then(() => {
        const swaggerObj = ext === 'json' ? JSON.parse(specFileContent) : yaml.safeLoad(specFileContent);
        return {
          pageSource: pageSource,
          swagger: JSON.stringify(swaggerObj)
        };
      })
      .catch(() => {
        return Promise.reject({
          'error': 'There is an error parsing the swagger file.',
          'filePath': filepath,
          'referencePath': pageSource
        });
      });
  }catch(error){
    return Promise.reject({
      'error': 'There is an error reading the file.',
      'filePath': filepath,
      'referencePath': pageSource
    });
  }
}

function renderHTML({pageSource, swagger}){
  return uiGenerator.getHtml(pageSource, swagger);
}

hexo.extend.tag.register('swagger_ui', function(args){
  const ctx = this;
  const pageSource = ctx.source;
  const swaggerPath = path.resolve(path.dirname(ctx.full_source), args[0]);

  /**
   * Add the current page to specBacklinks for current swagger file.
   */
  if(!specBacklinks[swaggerPath]){
    specBacklinks[swaggerPath] = new Set();
  }
  specBacklinks[swaggerPath].add(ctx.full_source);

  return parseSchemaFile(swaggerPath, pageSource)
    .then(uiGenerator.getHtml)
    .catch(error => {
      log.error('----------------------------------------------------------------');
      log.error(error.error);
      log.error('File path:'+error.filePath);
      log.error('File is referenced in:'+error.referencePath);
      log.error('Skipping the file.');
      log.error('----------------------------------------------------------------');
    });
}, {async: true});


/**
 * This funtion is called when any file is processed. It is automatically hooked to the watch task and is called if any file is modified.
 * */
hexo.extend.processor.register('*', function(file){

  /**
   * Since the file is being reprocessed and will start the complete lifecycle from begining, if this file is in processedPages set the status of this file to false so that it can be processed by uiGenerator as a new unprocessed file.
   */
  if(processedPages[file.path]){
    processedPages[file.path] = false;
  }

  /**
   *  Since the function watches every change, it will capture changes for spec files as well.
   *  If the source(path of the file) of changed file is in specBacklinks we need to get all the pages for that file and modify their last updated time so that hexo reloads that file as well.
   */
  const files = specBacklinks[file.source]
  if(files){
    for (const value of files) {
      touch(value);
    }
  }
});
