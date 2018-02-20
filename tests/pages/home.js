'use strict';

module.exports = {
  url: function () {
    return this.api.launchUrl;
  },
  elements: {
    root: {
      selector: '.dc-page'
    },
    logo: {
      selector: '.doc-navbar__logo'
    },
    logoText: {
      selector: '.doc-navbar__logo__text'
    },
    sidebar: {
      selector: '.doc-sidebar'
    },
    burgerIcon: {
      selector: '.doc-navbar .doc-sidebar-toggle'
    },
    footerSupport: {
      selector: '.doc-support-footer'
    },
    favicon: {
      selector: 'link[rel="icon"]'
    }
  },
  sections: {
    sidebar: {
      selector: '.doc-sidebar-list',
      elements: {
        supportLabel: {
          selector: '(//*[contains(@class, "doc-sidebar-list__item--label")])[last()]',
          locateStrategy: 'xpath'
        }
      },
      sections: {
        supportLink: {
          selector: '(//*[contains(@class, "doc-sidebar-list__item--link")])[last()]',
          locateStrategy: 'xpath',
          elements: {
            url: {
              selector: 'a'
            },
            text: {
              selector: 'span'
            }
          }
        }
      }
    }
  }
};
