const path = require('path');


const src_folders = path.resolve(process.cwd(), 'node_modules/hexo-theme-doc/nightwatch/lib');
const globals_path = path.resolve(process.cwd(), 'node_modules/hexo-theme-doc/nightwatch/globals.js');
const page_objects_path = path.resolve(process.cwd(), 'node_modules/hexo-theme-doc/nightwatch/pages');

module.exports = {

    src_folders,
    globals_path,
    page_objects_path

}
