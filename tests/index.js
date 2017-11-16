'use strict';

const path = require('path');

const rootTag = '.dc-page';

module.exports = {
  'Open homepage': function (browser) {
    browser
      .url(browser.launchUrl)
      .waitForElementVisible(rootTag, 1000);
  },
  'Scroll to Anchor': function (browser) {
    const stepOptions = getStepOptions('scrollToAnchor', browser);

    if (!stepOptions) {
      return;
    }

    const eHeader = `${stepOptions.element}#${stepOptions.id}`;

    browser
      .url(path.join(browser.launchUrl, stepOptions.path + '#' + stepOptions.id))
      .waitForElementVisible(rootTag, 1000)
      .assert.visible(eHeader);

    browser
      .getLocationInView(eHeader, (result) => {
        browser.assert.equal(typeof result, 'object');
        browser.assert.equal(result.status, 0);
        browser.assert.equal(result.value.y, 0, 'anchor header should be at the top of the page view');
      });
  },
  'Current item in TOC and its parents should be highlighted': function (browser){
    const stepOptions = getStepOptions('highlightToc', browser);

    if (!stepOptions) {
      return;
    }

    const ancestorXpath = '/ancestor::li[position()=1]';   // Xpath string to move one ancestor up
    const anchorXpath = `(//a[contains(@href, '${stepOptions.href}')])`;   // Xpath for finding anchor with href

    // Check if toc is highlighted
    browser
      .url(path.join(browser.launchUrl, stepOptions.path +  stepOptions.href))
      .useXpath()
      .waitForElementVisible(anchorXpath, 1000)
      .assert
      .cssClassPresent(anchorXpath + ancestorXpath, stepOptions.tocCurrentClass, 'Toc is highlighted');   // Check if toc is highlighted

    // Recursively check if all parents of current TOC are highlighted
    (function checkParent (path){
      const parent = path + ancestorXpath;
      browser
        .element('xpath', parent, function (res){
          if (!res.status){
            browser
              .assert
              .attributeContains(parent, 'class', stepOptions.sidebarCurrentRegex, 'Parent of TOC is highlighted');

            checkParent(parent);
          }
        });
    })(anchorXpath + ancestorXpath);

  },

  'TOC for a page are generated': function (browser){
    const stepOptions = getStepOptions('generateToc', browser);

    if (!stepOptions) {
      return;
    }

    browser
      .url(path.join(browser.launchUrl, stepOptions.path))
      .useCss()
      .waitForElementVisible(rootTag, 1000);

    browser
      .elements('css selector', '#page-content h2', (result) => {
        result.value && result
          .value
          .forEach((value, index) => {
            browser
              .useCss()
              .getText(`${stepOptions.tocItemSelector}:nth-of-type(${index + 1})`, function (result){
                browser
                  .assert
                  .equal(result.status, 0);

                browser
                  .useXpath()
                  .assert
                  .containsText(`//div[@id="page-content"] //h2[position()=${index + 1}]`, result.value, 'Title of TOC is same as content of H2');
              });
          });
      });
  },

  'Search input visible': function (browser){
    const stepOptions = getStepOptions('searchInputVisible', browser);

    if (!stepOptions) {
      return;
    }

    // Search input is present
    browser
      .url(path.join(browser.launchUrl, stepOptions.path))
      .useCss()
      .waitForElementVisible(rootTag, 1000)
      .assert
      .elementPresent(stepOptions.searchInputSelector, 'Search input is present');

    // Search input is visible
    browser
      .assert
      .visible(stepOptions.searchInputSelector, 'Search input is visible');
  },

  'Search results displayed on search input': function (browser){
    const stepOptions = getStepOptions('searchResultsDisplayed', browser);

    if (!stepOptions) {
      return;
    }

    // Wait for page load
    browser
      .url(path.join(browser.launchUrl, stepOptions.path))
      .useCss()
      .waitForElementVisible(stepOptions.searchInputSelector, 1000)
      .setValue(stepOptions.searchInputSelector, stepOptions.searchQuery);

    browser
      .assert
      .visible(stepOptions.searchResultsSelector, 'Search results are visible');

    // Search result title is visible and is equal to search query
    browser
      .assert
      .containsText(stepOptions.searchTitleQuerySelector, '"' + stepOptions.searchQuery + '"', 'Search result title is visible and is equal to search query');
  },

  'Search result items and their details(score, title, summary) are displayed': function (browser){
    const stepOptions = getStepOptions('searchResultItems', browser);

    if (!stepOptions) {
      return;
    }

    browser
      .url(path.join(browser.launchUrl, stepOptions.path))
      .useCss()
      .waitForElementVisible(stepOptions.searchInputSelector, 1000)
      .setValue(stepOptions.searchInputSelector, stepOptions.searchQuery);


    // Search result item is visible
    browser
      .assert
      .visible(stepOptions.searchResultItemSelector, 'Search result item is visible');

    // Search title is visible and contains some text
    browser
      .expect
      .element(stepOptions.searchItemTitleSelector)
      .text
      .to
      .match(new RegExp(stepOptions.searchQuery, 'i'));

    // Search item's score is visible and contains some decimal score
    browser
      .expect
      .element(stepOptions.searchItemScoreSelector)
      .text
      .to
      .match(/score: {0,1}.\d+/);


    // Search item summary's highlight contains search query
    browser
      .assert
      .containsText(stepOptions.searchItemSummaryHighlightSelector, stepOptions.searchQuery, 'Search item summary\'s highlight contains search query');



    // Search items summary is visible and contains some text
    browser
      .expect
      .element(stepOptions.searchItemSummarySelector)
      .text
      .to
      .match(/\w/);
  },
  after: function (browser) {
    browser.end();
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
