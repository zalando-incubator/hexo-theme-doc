'use strict';

const path = require('path');

module.exports = {
  'Open homepage': function (browser) {
    browser
      .url(browser.launchUrl)
      .waitForElementVisible('body', 1000)
      .end();
  },
  'Scroll to Anchor': function (browser) {
    const stepOptions = getStepOptions('scrollToAnchor', browser);

    if (!stepOptions) {
      browser.end();
      return;
    }

    const eHeader = `${stepOptions.element}#${stepOptions.id}`;

    browser
      .url(path.join(browser.launchUrl, stepOptions.path + '#' + stepOptions.id))
      .waitForElementVisible('body', 1000)
      .assert.visible(eHeader);

    browser
      .getLocationInView(eHeader, (result) => {
        browser.assert.equal(typeof result, 'object');
        browser.assert.equal(result.status, 0);
        browser.assert.equal(result.value.y, 0, 'anchor header should be at the top of the page view');
      })
      .end();

  }
};


/**
 * Dummy utility function to get stepOptions if any
 *
 * @param  {string} property - property nested in globals.stepOptions
 * @param  {client} browser  - nightwatch client object
 * @return {Object}
 */
function getStepOptions (property, browser) {
  if (!browser.globals) {
    return;
  }

  if (!browser.globals.stepOptions) {
    return;
  }

  if (!browser.globals.stepOptions[property]) {
    return;
  }

  return browser.globals.stepOptions[property];
}
