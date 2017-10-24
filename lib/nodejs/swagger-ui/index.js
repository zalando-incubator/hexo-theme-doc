'use strict';


const path = require('path');
const touch = require('touch');
const parseSchemaFile = require('./parse-schema-file.js');
const hexoUtil = require('../hexo-util');
const validUrl = require('valid-url');

const DEFAULT_CONFIG = {
  api_explorer: true,
  permalinks: true
};

const createSwaggerUI = function ({hexo}) {
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
        const {url_for} = hexoUtil({hexo});

        /**
         * Render the angular snippet.
         *
         * Check whether the page is in processedPages.
         *
         * If it is there just respond with the angular snippet and if not also add the library tags.
         *
         * And update processedPages if you process the page.
         */

        const snippetPath = path.resolve(__dirname, './partials/snippet.ejs');
        const libsPath = path.resolve(__dirname, './partials/libs.ejs');

        return hexo.render.render({path: snippetPath}, { id: instance, swagger, url_for, swagger_ui_config: hexo.config.theme_config.swagger_ui })
          .then((snippet) => {

            if (!processedPages[pageSource]){
              processedPages[pageSource] = true;

              return hexo.render.render({path: libsPath}, { url_for: url_for })
                .then((libs) => {
                  return `<div class="hexo-swagger-ui">${libs + snippet}</div>`;
                });

            } else {
              return `<div class="hexo-swagger-ui">${snippet}</div>`;
            }
          });
      }
    };
  })();


  function swaggerUITag (args){
    const ctx = this;
    const pageSource = ctx.source;
    let swaggerPath = args[0];

    if (!validUrl.isUri(swaggerPath)){
      swaggerPath = path.resolve(path.dirname(ctx.full_source), swaggerPath);
    }


    /**
     * Add the current page to specBacklinks for current swagger file.
     */
    if (!specBacklinks[swaggerPath]){
      specBacklinks[swaggerPath] = new Set();
    }
    specBacklinks[swaggerPath].add(ctx.full_source);

    return parseSchemaFile(swaggerPath, pageSource, hexo)
      .then(uiGenerator.getHtml)
      .catch(error => {
        log.error('----------------------------------------------------------------');
        log.error(error.message);
        log.error('File path:' + error.filePath);
        log.error('File is referenced in:' + error.referencePath);
        log.error('Skipping the file.');
        log.error('----------------------------------------------------------------');
      });
  }

  function swaggerUIProcessor (file){

    /**
     * Since the file is being reprocessed and will start the complete lifecycle from begining, if this file is in processedPages set the status of this file to false so that it can be processed by uiGenerator as a new unprocessed file.
     */
    if (processedPages[file.path]){
      processedPages[file.path] = false;
    }

    /**
     *  Since the function watches every change, it will capture changes for spec files as well.
     *  If the source(path of the file) of changed file is in specBacklinks we need to get all the pages for that file and modify their last updated time so that hexo reloads that file as well.
     */
    const files = specBacklinks[file.source];
    if (files){
      for (const value of files) {
        touch(value);
      }
    }
  }

  return {
    swaggerUITag,
    swaggerUIProcessor
  };
};

createSwaggerUI.DEFAULT_CONFIG = DEFAULT_CONFIG;

module.exports = createSwaggerUI;
