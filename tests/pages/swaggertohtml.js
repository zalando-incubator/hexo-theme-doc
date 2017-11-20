'use strict';

module.exports = {
  url: function () {
    return this.api.launchUrl + '/usage-and-configuration/swagger/swagger-to-html.html';
  },
  elements: {
    root: {
      selector: '.dc-page',
    }
  },
  sections: {
    currAncestor:{
      selector: '.doc-sidebar-list__item--current-ancestor',
      sections: {
        currLi: {
          selector: '.doc-sidebar-list__item--current',
          elements: {
            toc: {
              selector: '.doc-sidebar-list__toc-item--current'
            }
          }
        }
      }
    },
    swaggerHtml: {
      selector: '.doc-swagger-to-html',
      elements: {
        download: {
          selector: '.download-btn'
        },
        head: {
          selector: '.head'
        },
        security: {
          selector: '.security'
        },
        operation: {
          selector: '.operation'
        },
        request: {
          selector: '.request'
        },
        response: {
          selector: '.response'
        }
      }
    }
  }
};
