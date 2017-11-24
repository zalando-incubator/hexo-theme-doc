module.exports = {
  url: function() {
    return this.api.launchUrl + this.api.globals.page.search.path;
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
    }
  }
};
