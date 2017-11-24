module.exports = {
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
