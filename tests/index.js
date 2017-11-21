'use strict';

const path = require('path');

const rootTag = '.dc-page';

const Hexo = require('hexo');

const hexo = new Hexo(process.cwd());

module.exports = {
  before: async function (browser, done){
    await hexo.init();
    await hexo.load();
    done();
  },
  'Open homepage': function (browser) {
    browser
      .url(browser.launchUrl)
      .waitForElementVisible(rootTag, 500);
  },
  'Scroll to Anchor': function (browser) {
    const stepOptions = getStepOptions('scrollToAnchor', browser);

    if (!stepOptions) {
      return;
    }

    const eHeader = `${stepOptions.element}#${stepOptions.id}`;

    browser
      .url(path.join(browser.launchUrl, stepOptions.path + '#' + stepOptions.id))
      .waitForElementVisible(rootTag, 500)
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
      .waitForElementVisible(anchorXpath, 500)
      .assert
      .cssClassPresent(anchorXpath + ancestorXpath, 'doc-sidebar-list__toc-item--current', 'Toc is highlighted');   // Check if toc is highlighted

    // Recursively check if all parents of current TOC are highlighted
    (function checkParent (path){
      const parent = path + ancestorXpath;
      browser
        .element('xpath', parent, function (res){
          if (!res.status){
            browser
              .assert
              .attributeContains(parent, 'class', 'doc-sidebar-list__item--current', 'Parent of TOC is highlighted');

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
      .waitForElementVisible(rootTag, 500);

    browser
      .elements('css selector', '#page-content h2', (result) => {
        result.value && result
          .value
          .forEach((value, index) => {
            browser
              .useCss()
              .getText(`.doc-sidebar-list__toc-item:nth-of-type(${index + 1})`, function (result){
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
    const stepOptions = getStepOptions('gettingStarted', browser);

    if (!stepOptions) {
      return;
    }

    // Search input is present
    browser
      .url(path.join(browser.launchUrl, stepOptions.path))
      .useCss()
      .waitForElementVisible(rootTag, 500)
      .assert
      .elementPresent('.doc-sidebar__search-form input.doc-search-form__input', 'Search input is present');

    // Search input is visible
    browser
      .assert
      .visible('.doc-sidebar__search-form input.doc-search-form__input', 'Search input is visible');
  },

  'Search results displayed on search input': function (browser){
    const stepOptions = getStepOptions('gettingStarted', browser);

    if (!stepOptions) {
      return;
    }

    // Wait for page load
    browser
      .url(path.join(browser.launchUrl, stepOptions.path))
      .useCss()
      .waitForElementVisible('.doc-sidebar__search-form input.doc-search-form__input', 500)
      .setValue('.doc-sidebar__search-form input.doc-search-form__input', stepOptions.searchQuery);

    browser
      .assert
      .visible('.doc-search-results', 'Search results are visible');

    // Search result title is visible and is equal to search query
    browser
      .assert
      .containsText('.doc-search-results__title__query', '"' + stepOptions.searchQuery + '"', 'Search result title is visible and is equal to search query');
  },

  'Search result items and their details(score, title, summary) are displayed': function (browser){
    const stepOptions = getStepOptions('gettingStarted', browser);

    if (!stepOptions) {
      return;
    }

    browser
      .url(path.join(browser.launchUrl, stepOptions.path))
      .useCss()
      .waitForElementVisible('.doc-sidebar__search-form input.doc-search-form__input', 500)
      .setValue('.doc-sidebar__search-form input.doc-search-form__input', stepOptions.searchQuery);


    // Search result item is visible
    browser
      .assert
      .visible('.doc-search-results__list__item', 'Search result item is visible');

    // Search title is visible and contains some text
    browser
      .expect
      .element('.doc-search-results__list__link')
      .text
      .to
      .match(new RegExp(stepOptions.searchQuery, 'i'));

    // Search item's score is visible and contains some decimal score
    browser
      .expect
      .element('.doc-search-results__list__score')
      .text
      .to
      .match(/score: {0,1}.\d+/);


    // Search item summary's highlight contains search query
    browser
      .assert
      .containsText('.doc-search-results__list__item .doc-highlight', stepOptions.searchQuery, 'Search item summary\'s highlight contains search query');



    // Search items summary is visible and contains some text
    browser
      .expect
      .element('.doc-search-results__list__item > p')
      .text
      .to
      .match(/\w/);
  },
  'Clicking on logo should open corresponding link': function (browser){
    const stepOptions = getStepOptions('logoLink', browser);
    const hexoData = hexo.locals.get('data');
    const { navigation } = hexoData;


    browser
      .url(path.join(browser.launchUrl, stepOptions.path))
      .useCss()
      .click('.doc-navbar__logo')
      .waitForElementVisible(rootTag, 500)
      .assert
      .urlEquals(browser.launchUrl + navigation.logo.path, 'Clicking on logo should open corresponding link.');
  },
  'page should scroll to heading, when clicking on toc': function (browser){
    const stepOptions = getStepOptions('scrollToAnchor', browser);

    const eHeader = `${stepOptions.element}#${stepOptions.id}`;

    browser
      .url(path.join(browser.launchUrl, stepOptions.path))
      .waitForElementVisible(rootTag, 500)
      .click('.doc-sidebar a[href="#Quick-Start"')
      .pause(500)
      .getLocationInView(eHeader, (result) => {
        browser.assert.equal(typeof result, 'object');
        browser.assert.equal(result.status, 0);
        browser.assert.equal(result.value.y, 0, 'anchor header should be at the top of the page view');
      });

  },
  'when resizing window to mobile view, sidebar should collapse': function (browser){
    const stepOptions = getStepOptions('scrollToAnchor', browser);
    const mobileSize = getStepOptions('deviceSizes', browser).mobile;
    const layout = getStepOptions('layout', browser);

    browser
      .url(path.join(browser.launchUrl, stepOptions.path))
      .waitForElementVisible(rootTag, 500)
      .resizeWindow(mobileSize.x, mobileSize.y)
      .getLocationInView('.doc-sidebar', (result) => {
        browser.assert.equal(typeof result, 'object');
        browser.assert.equal(result.status, 0);
        browser.assert.equal(result.value.x, -layout.sideNavWidth, 'side nav should not be visible');
      });
  },
  'when resizing window to mobile view, burger menu icon is displayed': function (browser){
    const stepOptions = getStepOptions('scrollToAnchor', browser);
    const deviceSizes = getStepOptions('deviceSizes', browser);
    const mobileSize = deviceSizes.mobile;
    const desktopSize = deviceSizes.desktop;

    browser
      .resizeWindow(desktopSize.x, desktopSize.y)
      .url(path.join(browser.launchUrl, stepOptions.path))
      .waitForElementVisible(rootTag, 500)
      .assert
      .hidden('.doc-navbar .doc-sidebar-toggle', 'burger menu shoud be hidden in desktop' );


    browser
      .resizeWindow(mobileSize.x, mobileSize.y)
      .assert
      .visible('.doc-navbar .doc-sidebar-toggle', 'burger menu icon should be visible on mobile');
  },
  'when resizing window to mobile view, clicking on burger menu should open sidebar': function (browser){
    const stepOptions = getStepOptions('scrollToAnchor', browser);
    const mobileSize = getStepOptions('deviceSizes', browser).mobile;

    browser
      .url(path.join(browser.launchUrl, stepOptions.path))
      .waitForElementVisible(rootTag, 500)
      .resizeWindow(mobileSize.x, mobileSize.y)
      .click('.doc-navbar .doc-sidebar-toggle')
      .pause(500)
      .getLocationInView('.doc-sidebar', (result) => {
        browser.assert.equal(typeof result, 'object');
        browser.assert.equal(result.status, 0);
        browser.assert.equal(result.value.x, 0, 'side nav should be visible');
      });
  },
  'search results page should display total number of results': function (browser){
    const stepOptions = getStepOptions('gettingStarted', browser);
    const desktopSize = getStepOptions('deviceSizes', browser).desktop;

    browser
      .resizeWindow(desktopSize.x, desktopSize.y)
      .url(path.join(browser.launchUrl, stepOptions.path))
      .waitForElementVisible(rootTag, 500)
      .setValue('.doc-sidebar__search-form input.doc-search-form__input', stepOptions.searchQuery)
      .elements('css selector', '.doc-search-results__list__item', function (results){
        browser
          .expect
          .element('.doc-search-results__title')
          .text
          .to
          .match(new RegExp('^' + results.value.length));
      });
  },
  'search results display message for 0 results': function (browser){
    const stepOptions = getStepOptions('gettingStarted', browser);
    const searchQuery = stepOptions.searchQuery + 'q1z2v4b2n6m3';
    const expectedSearchTitle = `There are no results for "${searchQuery}". Why not try typing another keyword?`;

    browser
      .url(path.join(browser.launchUrl, stepOptions.path))
      .waitForElementVisible(rootTag, 500)
      .setValue('.doc-sidebar__search-form input.doc-search-form__input', searchQuery)
      .expect
      .element('.doc-search-results__title + p')
      .text
      .to
      .match(new RegExp(expectedSearchTitle));
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
