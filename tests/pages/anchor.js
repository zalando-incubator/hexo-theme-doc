'use strict';

const anchorId = 'Long-Start';

module.exports = {
  url: function () {
    return this.api.launchUrl + '/get-started.html';
  },
  elements: {
    anchor: {
      selector: `h2#${anchorId}`
    },
    root: {
      selector: '.dc-page'
    },
    toc: {
      selector: `.doc-sidebar-list__toc-item a[href="#${anchorId}"]`
    }
  },
  sections: {
    footerSupport: {
      selector: '.doc-support-footer',
      elements: {
        supportLink: {
          selector: '.doc-support-footer__link'
        }
      }
    }
  },
  props:{
    anchorId
  }
};
