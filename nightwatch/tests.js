const path = require('path');

module.exports = {
  async before(browser, done, hexo){
    await hexo.init();
    await hexo.load();
    done();
  },
  'openHomePage': function (browser) {
    const page = browser.page.getDefault();

    page
      .navigate()
      .waitForElementVisible('@root', 1000);
  },
  'scrollToAnchor': function (browser) {
    const page = browser.page.getDefault();

    page
      .navigate()
      .waitForElementVisible('@root', 1000)
      .assert
      .visible('@anchor');

    page
      .getLocationInView('@anchor', (result) => {
        page.assert.equal(typeof result, 'object');
        page.assert.equal(result.status, 0);
        page.assert.equal(result.value.y, 0, 'anchor header should be at the top of the page view');
      });
  },
  'currTocParentsHighlighted': function (browser){
    const page = browser.page.getDefault();

    page
      .navigate()
      .waitForElementVisible('@root', 1000);

    const currAncestor = page.section.currAncestor;
    page.expect.section('@currAncestor').to.be.visible ;

    const currLi = currAncestor.section.currLi;

    currAncestor.expect.section('@currLi').to.be.visible;

    currLi.expect.element('@toc').to.be.visible;

  },
  after(browser, done){
    browser.end();
    done();
  }
};
