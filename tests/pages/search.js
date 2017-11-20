'use strict';

module.exports = {
  url: function () {
    return this.api.launchUrl;
  },
  elements: {
    root: {
      selector: '.dc-page'
    },
    searchInputDesktop: {
      selector: '.doc-sidebar__search-form input.doc-search-form__input'
    },
    searchInputMobile: {
      selector: '.doc-navigation input.doc-search-form__input'
    }
  },
  sections: {
    searchResults: {
      selector: '.doc-search-results',
      elements: {
        title: {
          selector: '.doc-search-results__title'
        },
        titleMessage: {
          selector: '.doc-search-results__title + p'
        },
        titleQuery: {
          selector: '.doc-search-results__title__query'
        },
        resultsList: {
          selector: '.doc-search-results__list'
        }
      },
      sections: {
        searchResultsList: {
          selector: '.doc-search-results__list',
          elements: {
            resultItem: {
              selector: '.doc-search-results__list__item'
            },
            resultLink: {
              selector: '.doc-search-results__list__link'
            },
            resultScore: {
              selector: '.doc-search-results__list__score'
            },
            resultSummary: {
              selector: '.doc-search-results__list__item > p'
            },
            resultHighlight: {
              selector: '.doc-search-results__list__item .doc-highlight'
            }
          }
        }
      }
    }
  },
  props: {
    searchQuery: 'hexo'
  }
};
