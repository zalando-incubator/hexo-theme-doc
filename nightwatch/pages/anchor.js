const util = require('util');

module.exports = {
  url: function() {
    return this.api.launchUrl + `${this.api.globals.pages.anchor.path}#${this.api.globals.pages.anchor.anchorId}`;
  },
  elements: {
    anchor: {
      selector: 'h2#%s'
    },
    root: {
      selector: '.dc-page'
    }
  },
  commands: [{
    getAnchor: function(){
      const anchor = this.elements.anchor;
      return util.format(anchor.selector, this.api.globals.pages.anchor.anchorId);
    }
  }]
};
