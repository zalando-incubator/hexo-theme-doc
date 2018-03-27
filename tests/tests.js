'use strict';

module.exports = (hexo) => ({
  async before (browser, done){
    await hexo.init();
    await hexo.load();
    done();
  },
  /**
   *
   * Home Page
   *
   */
  'Open home page': function (browser) {
    const page = browser.page.home();

    page
      .navigate()
      .waitForElementVisible('@root', 500);
  },
  /**
   *
   * TOC and Anchor
   *
   */
  'Scroll to anchor': function (browser) {
    const page = browser.page.anchor();

    page
      .api
      .url(page.url() + `#${page.props.anchorId}`);

    page
      .waitForElementVisible('@root', 500)
      .assert
      .visible('@anchor');

    page
      .getLocationInView('@anchor', (result) => {
        page.assert.equal(typeof result, 'object');
        page.assert.equal(result.status, 0);
        page.assert.equal(result.value.y, 0, 'anchor header should be at the top of the page view');
      });
  },
  'Current item in TOC and its ancestors are highlighted': function (browser){
    const page = browser.page.swaggertohtml();

    page
      .navigate()
      .waitForElementVisible('@root', 500);

    const currAncestor = page.section.currAncestor;
    page.expect.section('@currAncestor').to.be.visible ;

    const currLi = currAncestor.section.currLi;

    currAncestor.expect.section('@currLi').to.be.visible;

    currLi.expect.element('@toc').to.be.visible;
  },
  'TOC are generated': function (browser){
    const page = browser.page.anchor();

    page
      .navigate()
      .waitForElementVisible('@root', 500);

    page
      .assert
      .visible('@anchor')
      .assert
      .visible('@toc');

    page
      .getText('@anchor', function (results){
        page.assert.containsText('@toc', results.value, 'Text of toc is same as h2.');
      });
  },
  'Page should scroll to heading, when clicking on TOC': function (browser){
    const page = browser.page.anchor();

    page
      .navigate()
      .waitForElementVisible('@root', 500)
      .click('@toc')
      .api
      .pause(500);

    page
      .getLocationInView('@anchor', (result) => {
        browser.assert.equal(typeof result, 'object');
        browser.assert.equal(result.status, 0);
        browser.assert.equal(result.value.y, 0, 'anchor header should be at the top of the page view');
      });

  },
  'When both TOC and children are present, TOC comes before children in sidebar': function (browser){
    const page = browser.page.swagger();
    const currentSection = page.section.current;

    page
      .navigate()
      .waitForElementVisible('@root', 500)
      .assert
      .elementPresent('@tocBeforeChildren', 'TOC should come before children in sidebar, if both exist.');

    currentSection
      .assert
      .cssProperty('@tocList', 'padding-left', '24px', 'TOC list should be alligned, when childrens are present');

    currentSection
      .assert
      .cssProperty('@childrenList', 'padding-left', '10px', 'Children list should be alligned when TOC is present');
  },
  /**
   *
   * Search
   *
   */
  'Search input is visible in mobile': function (browser){
    const page = browser.page.search();

    page
      .navigate()
      .waitForElementVisible('@root', 500)
      .api
      .resizeWindow(browser.globals.deviceSizes.mobile.x, browser.globals.deviceSizes.mobile.y);

    page
      .assert
      .visible('@searchInputMobile', 'Search input is visible in mobile.');
  },
  'Search input is visible in desktop': function (browser){
    const page = browser.page.search();

    page
      .navigate()
      .waitForElementVisible('@root', 500)
      .api
      .resizeWindow(browser.globals.deviceSizes.desktop.x, browser.globals.deviceSizes.desktop.y);

    page
      .assert
      .visible('@searchInputDesktop', 'Search input is visible in desktop.');
  },
  'Search results are displayed on search input in mobile': function (browser){
    const page = browser.page.search();

    page
      .navigate()
      .waitForElementVisible('@root', 500)
      .api
      .resizeWindow(browser.globals.deviceSizes.mobile.x, browser.globals.deviceSizes.mobile.y);

    page
      .setValue('@searchInputMobile', page.props.searchQuery);

    page.expect.section('@searchResults').to.be.visible;

    const searchResults = page.section.searchResults;

    searchResults
      .assert
      .containsText('@titleQuery', page.props.searchQuery, 'Search result title is visible and is equal to search query');
  },
  'Search results are displayed on search input in desktop': function (browser){
    const page = browser.page.search();

    page
      .navigate()
      .waitForElementVisible('@root', 500)
      .api
      .resizeWindow(browser.globals.deviceSizes.desktop.x, browser.globals.deviceSizes.desktop.y);

    page
      .setValue('@searchInputDesktop', page.props.searchQuery);

    page.expect.section('@searchResults').to.be.visible;

    const searchResults = page.section.searchResults;

    searchResults
      .assert
      .containsText('@titleQuery', page.props.searchQuery, 'Search result title is visible and is equal to search query');
  },
  'Search result items and their details (score, title, summary) are displayed in mobile': function (browser) {
    const page = browser.page.search();

    page
      .navigate()
      .waitForElementVisible('@root', 500)
      .api
      .resizeWindow(browser.globals.deviceSizes.mobile.x, browser.globals.deviceSizes.mobile.y);


    page
      .setValue('@searchInputMobile', page.props.searchQuery);

    const searchResults = page.section.searchResults;
    const searchResultsList = searchResults.section.searchResultsList;

    searchResultsList
      .assert
      .visible('@resultItem', 'Search result item is visible');

    searchResultsList
      .expect
      .element('@resultLink')
      .text
      .to
      .match(new RegExp(page.props.searchQuery, 'i'));

    searchResultsList
      .expect
      .element('@resultScore')
      .text
      .to
      .match(/score: {0,1}.\d+/);

    searchResultsList
      .assert
      .containsText('@resultHighlight', page.props.searchQuery, 'Search item summary\'s highlight contains search query');

    searchResultsList
      .expect
      .element('@resultSummary')
      .text
      .to
      .match(/\w/);

  },
  'Search result items and their details (score, title, summary) are displayed in desktop': function (browser) {
    const page = browser.page.search();

    page
      .navigate()
      .waitForElementVisible('@root', 500)
      .api
      .resizeWindow(browser.globals.deviceSizes.desktop.x, browser.globals.deviceSizes.desktop.y);

    page
      .setValue('@searchInputDesktop', page.props.searchQuery);

    const searchResults = page.section.searchResults;
    const searchResultsList = searchResults.section.searchResultsList;

    searchResultsList
      .assert
      .visible('@resultItem', 'Search result item is visible');

    searchResultsList
      .expect
      .element('@resultLink')
      .text
      .to
      .match(new RegExp(page.props.searchQuery, 'i'));

    searchResultsList
      .expect
      .element('@resultScore')
      .text
      .to
      .match(/score: {0,1}.\d+/);

    searchResultsList
      .assert
      .containsText('@resultHighlight', page.props.searchQuery, 'Search item summary\'s highlight contains search query');

    searchResultsList
      .expect
      .element('@resultSummary')
      .text
      .to
      .match(/\w/);

  },
  'Search results page should display total number of results in mobile': function (browser){
    const page = browser.page.search();

    const searchResults = page.section.searchResults;

    page
      .navigate()
      .waitForElementVisible('@root', 500)
      .api
      .resizeWindow(browser.globals.deviceSizes.desktop.x, browser.globals.deviceSizes.desktop.y);

    page
      .setValue('@searchInputDesktop', page.props.searchQuery);


    page
      .api
      .elements('css selector', '.doc-search-results__list__item',  function (results){
        searchResults
          .expect
          .element('@title')
          .text
          .to
          .match(new RegExp('^' + results.value.length));
      });
  },
  'Search results page should display total number of results in desktop': function (browser){
    const page = browser.page.search();

    const searchResults = page.section.searchResults;

    page
      .navigate()
      .waitForElementVisible('@root', 500)
      .api
      .resizeWindow(browser.globals.deviceSizes.desktop.x, browser.globals.deviceSizes.desktop.y);

    page
      .setValue('@searchInputDesktop', page.props.searchQuery);


    page
      .api
      .elements('css selector', '.doc-search-results__list__item',  function (results){
        searchResults
          .expect
          .element('@title')
          .text
          .to
          .match(new RegExp('^' + results.value.length));
      });
  },
  'Search results display message for 0 results in mobile': function (browser){
    const page = browser.page.search();
    const searchQuery = page.props.searchQuery + 'q1z2v4b2n6m3';

    const searchResults = page.section.searchResults;
    const expectedSearchTitle = `There are no results for "${searchQuery}". Why not try typing another keyword?`;


    page
      .navigate()
      .waitForElementVisible('@root', 500)
      .api
      .resizeWindow(browser.globals.deviceSizes.mobile.x, browser.globals.deviceSizes.mobile.y);

    page
      .setValue('@searchInputMobile', searchQuery);

    searchResults
      .expect
      .element('@titleMessage')
      .text
      .to
      .match(new RegExp(expectedSearchTitle));

  },
  'Search results display message for 0 results in desktop': function (browser){
    const page = browser.page.search();
    const searchQuery = page.props.searchQuery + 'q1z2v4b2n6m3';

    const searchResults = page.section.searchResults;
    const expectedSearchTitle = `There are no results for "${searchQuery}". Why not try typing another keyword?`;


    page
      .navigate()
      .waitForElementVisible('@root', 500)
      .api
      .resizeWindow(browser.globals.deviceSizes.desktop.x, browser.globals.deviceSizes.desktop.y);

    page
      .setValue('@searchInputDesktop', searchQuery);

    searchResults
      .expect
      .element('@titleMessage')
      .text
      .to
      .match(new RegExp(expectedSearchTitle));

  },
  'Clicking on search result should open a result page': function (browser){
    const page = browser.page.search();
    const searchQuery = page.props.searchQuery;

    const searchResults = page.section.searchResults;
    const searchResultsList = searchResults.section.searchResultsList;

    page
      .navigate()
      .waitForElementVisible('@root', 500);

    page
      .setValue('@searchInputDesktop', searchQuery);

    searchResultsList
      .click('@resultLink');

    page
      .waitForElementVisible('@root', 500);

  },
  /**
   *
   * Logo
   *
   */
  'Clicking on logo should open corresponding link': function (browser){
    const page = browser.page.home();
    const hexoData = hexo.locals.get('data');
    const { navigation } = hexoData;

    page
      .navigate()
      .waitForElementVisible('@root', 500);

    page
      .click('@logo')
      .waitForElementVisible('@root', 500)
      .assert
      .urlEquals(browser.launchUrl + '/' + navigation.logo.path, 'Clicking on logo should open corresponding link.');
  },
  'Expected logo text is displayed': function (browser) {
    const page = browser.page.home();
    const hexoData = hexo.locals.get('data');
    const { navigation } = hexoData;

    page
      .navigate()
      .assert.visible('@logoText')
      .assert.containsText('@logoText', navigation.logo.text.toUpperCase());
  },
  /**
   * Navigation
   */
  'When resizing window to mobile view, sidebar should collapse': function (browser){

    const page = browser.page.home();

    page
      .navigate()
      .waitForElementVisible('@root', 500)
      .api
      .resizeWindow(browser.globals.deviceSizes.mobile.x, browser.globals.deviceSizes.mobile.y);

    page
      .getLocationInView('@sidebar', (result) => {
        browser.assert.equal(typeof result, 'object');
        browser.assert.equal(result.status, 0);
        browser.assert.equal(result.value.x, -browser.globals.layout.sideNavWidth, 'side nav should not be visible');
      });

  },
  'When resizing to mobile view, burger menu icon is displayed': function (browser){

    const page = browser.page.home();

    page
      .navigate()
      .waitForElementVisible('@root', 500)
      .api
      .resizeWindow(browser.globals.deviceSizes.desktop.x, browser.globals.deviceSizes.desktop.y);

    page
      .assert
      .hidden('@burgerIcon', 'burger menu shoud be hidden in desktop')
      .api
      .resizeWindow(browser.globals.deviceSizes.mobile.x, browser.globals.deviceSizes.mobile.y);

    page
      .assert
      .visible('@burgerIcon', 'burger menu icon should be visible on mobile');
  },
  'When resizing to mobile view, clicking on burger menu should open sidebar': function (browser){

    const page = browser.page.home();

    page
      .navigate()
      .waitForElementVisible('@root', 500)
      .api
      .resizeWindow(browser.globals.deviceSizes.mobile.x, browser.globals.deviceSizes.mobile.y);

    page
      .click('@burgerIcon')
      .api
      .pause(500);

    page
      .getLocationInView('@sidebar', (result) => {
        browser.assert.equal(typeof result, 'object');
        browser.assert.equal(result.status, 0);
        browser.assert.equal(result.value.x, 0, 'side nav should be visible');
      });
  },
  'Support should be present in navigation if its not turned off in configuration': function (browser){
    const page = browser.page.home();
    const sidebarSection = page.section.sidebar;

    const hexoConfig = hexo.config;
    const themeConfig = hexoConfig.theme_config;
    const supportConfig = themeConfig.support;

    page
      .navigate()
      .waitForElementVisible('@root', 500)
      .api
      .resizeWindow(browser.globals.deviceSizes.desktop.x, browser.globals.deviceSizes.desktop.y);


    const supportLinkSection = sidebarSection.section.supportLink;

    if (supportConfig.navigation){
      sidebarSection
        .assert
        .elementPresent('@supportLabel', 'Support label should be present in sidebar');

      sidebarSection
        .assert
        .containsText('@supportLabel', supportConfig.navigation_label, 'Support label should contain configured text');

      supportLinkSection
        .assert
        .attributeEquals('@url', 'href', supportConfig.link_url, 'Support link should contain configured url');

      supportLinkSection
        .assert
        .containsText('@text', supportConfig.link_text, 'Support link should contain configured text');

    } else {
      sidebarSection
        .expect
        .element('@supportLabel')
        .text
        .to
        .not
        .equal(supportConfig.navigation_label);
    }
  },
  'Support should be present in pages, if not turned off in front matter': function (browser){
    // Page with support turned off  - home
    // Page with support - getting started

    const hexoConfig = hexo.config;
    const themeConfig = hexoConfig.theme_config;
    const supportConfig = themeConfig.support;

    const pageWithSupport = browser.page.anchor();
    const pageWithoutSupport = browser.page.home();


    pageWithoutSupport
      .navigate()
      .waitForElementVisible('@root', 500)
      .assert
      .elementNotPresent('@footerSupport', 'Support footer should not be present, if turned off in front-matter');

    const footerSection = pageWithSupport.section.footerSupport;

    pageWithSupport
      .navigate()
      .waitForElementVisible('@root', 500)
      .expect
      .section('@footerSupport')
      .to
      .be
      .visible;

    footerSection
      .assert
      .elementPresent('@supportLink', 'Support link should be present in support footer.');

    footerSection
      .assert
      .attributeEquals('@supportLink', 'href', supportConfig.link_url);


  },
  /**
   *
   * Favicon
   *
   */
  'Favicon should be present if configured': function (browser){
    const pageWithoutSupport = browser.page.home();

    const hexoConfig = hexo.config;
    const themeConfig = hexoConfig.theme_config;

    const favIconLink = themeConfig.favicon;

    if (themeConfig.favicon){
      const relativePath = browser.launchUrl + favIconLink;

      pageWithoutSupport
        .navigate()
        .waitForElementVisible('@root', 500)
        .assert
        .attributeEquals('@favicon', 'href', relativePath);
    }

  },
  /**
   *
   * Google analytics
   *
   */
  'Google analytics script is present if tracking id is provided ': function (browser){
    const page = browser.page.home();
    const themeConfig = hexo.config.theme_config;
    const trackingId =  themeConfig.google_analytics;

    page
      .navigate()
      .waitForElementVisible('@root', 500);

    browser
      .execute(function (trackingId){
        const scripts = $('script:not([src])');   // eslint-disable-line no-undef
        const scriptsArray = scripts.toArray();
        const gaRegexp = new RegExp(`ga\\(\\'create\\',\\s*\\'${trackingId}\\',\\s*\\'auto\\'\\)`);

        return scriptsArray
          .reduce((acc, curr) => {
            const scriptText = $(curr).text();   // eslint-disable-line no-undef
            return curr && !!scriptText.match(gaRegexp);
          }, false);
      },
      [trackingId],
      function (result){
        browser.assert.ok(result.value, 'GA script should be present with trakcing id.');
      });

  },
  /**
   *
   * Swagger UI
   *
   */
  'SwaggerUI should be generated': function (browser){
    const page = browser.page.swaggerui();

    page
      .navigate()
      .waitForElementVisible('@root', 500);

    const swaggerui = page.section.swaggerui;

    swaggerui
      .assert
      .elementPresent('@apiname', 'Api name should be present in swaggerui');

    swaggerui
      .assert
      .elementPresent('@endpoints', 'Endpoints should be present in swaggerui');

    swaggerui
      .click('@listOperations');

    swaggerui
      .assert
      .elementPresent('@operation', 'operation should be present in swaggerui');
  },
  /**
   *
   * SwaggerHtml
   *
   */
  'SwaggerHTML is generated': function (browser){
    const page = browser.page.swaggertohtml();

    page
      .navigate()
      .waitForElementVisible('@root', 500);

    const swaggerHtml = page.section.swaggerHtml;

    swaggerHtml
      .assert
      .elementPresent('@download', 'Download button should be present in swaggerhtml');

    swaggerHtml
      .assert
      .elementPresent('@head', 'Head should be present in swaggerhtml');

    swaggerHtml
      .assert
      .elementPresent('@security', 'Security should be present in swaggerhtml');

    swaggerHtml
      .assert
      .elementPresent('@operation', 'Operation should be present in swaggerhtml');

    swaggerHtml
      .assert
      .elementPresent('@request', 'Request should be present in swaggerhtml');

    swaggerHtml
      .assert
      .elementPresent('@response', 'Response should be present in swaggerhtml');

  },
  async after (browser, done){
    await hexo.exit();
    browser.end();
    done();
  }
});
