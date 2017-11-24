
const anchorId = 'Quick-Start';

module.exports = {
  url: function() {
    return this.api.launchUrl + this.api.globals.pages.search.path;
  },
  elements: {
    anchor: {
      selector: `h2#${anchorId}`
    },
    root: {
      selector: '.dc-page'
    }
  }
};
