module.exports = {
  "selenium": {
    "start_process": true,
    "server_path": "./node_modules/webdriver-manager/selenium/selenium-server-standalone-3.7.1.jar",
    "cli_args": {
      "webdriver.chrome.driver": "./node_modules/webdriver-manager/selenium/chromedriver_2.33"
    }
  },
  "test_settings": {
    "default": {
      "launch_url": "http://localhost:4000",
      "desiredCapabilities": {
        "browserName": "chrome"
      },
      "screenshots": {
        "enabled": false,
        "on_failure": false,
        "path": "tests_output/screenshots"
      },
      "globals": {
      }
    }
  }
}
