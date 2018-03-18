'use strict';

module.exports = {
  'src_folders' : ['tests/lib'],
  'page_objects_path' : 'tests/pages',
  'globals_path' : 'tests/globals.js',
  'selenium': {
    'start_process': true,
    server_path: require('selenium-server').path,
    'cli_args': {
      'webdriver.chrome.driver': require('chromedriver').path
    }
  },
  'test_settings': {
    'default': {
      'launch_url': 'http://localhost:4000/hexo-theme-doc',
      'desiredCapabilities': {
        'browserName': 'chrome'
      },
      'screenshots': {
        'enabled': true,
        'on_failure': true,
        'path': 'tests_output/screenshots'
      },
      'globals': {
      }
    },
    'live': {
      'launch_url': 'https://zalando-incubator.github.io/hexo-theme-doc/'
    }
  }
};
