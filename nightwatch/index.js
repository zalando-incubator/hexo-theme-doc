const path = require('path');
const { merge } = require('lodash');


const src_folders = path.resolve(process.cwd(), 'node_modules/hexo-theme-doc/nightwatch/lib');
const globals_path = path.resolve(process.cwd(), 'node_modules/hexo-theme-doc/nightwatch/globals.js');
const page_objects_path = path.resolve(process.cwd(), 'node_modules/hexo-theme-doc/nightwatch/pages');

const paths = {
  src_folders: [src_folders],
  globals_path,
  page_objects_path
}

const baseConfig = require('./nightwatch.conf.js');

const defaultConfig = Object.assign(baseConfig, paths, {});

module.exports = (userConfig = {}) => {

    /**
     * Delete these properties so that user cannot overwrite them.
     * */
    delete userConfig.src_folders;
    delete userConfig.page_objects_path;
    delete userConfig.globals_path;

    const config = merge(defaultConfig, userConfig);

    return {
      getConfig (){
        return config ;
      }
    }
};
