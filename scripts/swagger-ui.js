const path = require('path');
const fs = require('fs');
const validator = require('swagger-parser');
const yaml = require('js-yaml');
const touch = require("touch");
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

  /*
   * libsHtml contains required libs for operation.
   */
  const libsHtml = `
      <link rel="stylesheet" href="/style/swagger/swagger-ui-min.css">
      <!-- dependencies -->
      <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.3/angular.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.3/angular-sanitize.min.js"></script>
      <!-- angular-swagger-ui -->
      <script src="/script/swagger/swagger-ui.min.js"></script>
  `;

  /*
   * Function responsible for creating an instance of angular-swagger-ui with HTML and scripts.
   */
  function getTemplate(swagger){
    const id = instance;
    const template = `
        <div class="swagger-wrap bootstrap" id="swagger-wrap-${id}"  ng-controller="swagger-ctrl-${id}" >
            <div swagger-ui input="swaggerJson" input-type="json" api-explorer="true" parser="auto" trusted-sources="true"  > </div>
        </div>
        <script type="text/javascript">
            angular
                .module('swagger-module-${id}', ['ngSanitize', 'swaggerUi'])
                .config([
                  '$provide',
                  function($provide) {
                    $provide.decorator('$anchorScroll', [
                      '$delegate',
                      function anchorScrollDecorator($delegate){
                        return function () {
                          /* Just not doing anything.  */
                        }
                      }
                    ])
                  }
                ])
                .controller('swagger-ctrl-${id}', function($scope, swaggerTranslator) {
                    $scope.swaggerJson = ${swagger};
                });
                angular.bootstrap(document.getElementById('swagger-wrap-${id}'), ['swagger-module-${id}'])
        </script>
    `;
    return template;
  }

  return {
    /*
     * Function exposed to get HTML for a specific swagger object.
     *
     * pageSource: It is used to make sure that the libraries are inserted only once.
     *
     * swagger: The swagger object.
     */
    getHtml: function (pageSource, swagger) {
      instance++;

      /**
       * Check whether the page is in processedPages. 
       *
       * If it is there just respond with the angular snippet and if not also add the library tags.
       *
       * And update processedPages if you process the page.
       */
      if(!processedPages[pageSource]){
        processedPages[pageSource] = true;
        return libsHtml + getTemplate(swagger);
      }

      return getTemplate(swagger);
    }
  }
})();

function parseSchemaFile(filepath, pageSource) {
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
    });
}

function renderHTML({pageSource, swagger}){
  const str = uiGenerator.getHtml(pageSource, swagger);
  return `<div class="hexo-swagger-ui">${str}</div>`;
}

hexo.extend.tag.register('swagger_ui', function(args){
  const ctx = this;
  const pageSource = ctx.source;
  const swaggerPath = path.resolve(path.dirname(ctx.full_source), args[0]);


  if(!specBacklinks[swaggerPath]){
    specBacklinks[swaggerPath] = new Set();
  }
  specBacklinks[swaggerPath].add(ctx.full_source);

  return parseSchemaFile(swaggerPath, pageSource)
    .then(renderHTML);
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
