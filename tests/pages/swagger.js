'use strict';

module.exports = {
  url: function () {
    return this.api.launchUrl + '/usage-and-configuration/swagger/introduction.html';
  },
  elements: {
    root: {
      selector: '.dc-page',
    },
    tocBeforeChildren: {
      selector: '.doc-sidebar-list__item--current .doc-sidebar-list__toc-list+.doc-sidebar-list__children-list'
    }
  },
  sections: {
    current:{
      selector: '.doc-sidebar-list__item--current',
      elements: {
        tocList: {
          selector: '.doc-sidebar-list__toc-list',
        },
        childrenList: {
          selector: '.doc-sidebar-list__children-list',
        }
      }
    }
  }
};
