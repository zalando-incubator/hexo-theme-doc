const { nightwatch } = require('hexo-theme-doc');


const config = {
  "selenium": {
    "start_process": true,
    "server_path": "./node_modules/webdriver-manager/selenium/selenium-server-standalone-3.7.1.jar",
    "cli_args": {
      "webdriver.chrome.driver": "./node_modules/webdriver-manager/selenium/chromedriver_2.33"
    }
  },
  "test_settings": {
    "default": {
      "launch_url": "http://localhost:4000/hexo-theme-doc/",
      "desiredCapabilities": {
        "browserName": "chrome"
      },
      "screenshots": {
        "enabled": true,
        "on_failure": true,
        "path": "tests_output/screenshots"
      },
      "globals": {
        "tests":{
          "scrollToAnchor": {
            "page": "gettingStarted"
          },
          "currTocParentsHighlighted": {
            "page": "swaggerToHtml"
          }
        }
      }
    },
    "live": {
      "launch_url": "https://zalando-incubator.github.io/hexo-theme-doc/"
    }
  }
}


module.exports = nightwatch(config).getConfig();
