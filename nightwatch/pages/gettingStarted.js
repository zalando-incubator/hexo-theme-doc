
const anchorId = 'Quick-Start';

module.exports = {
  url: function() {
    return this.api.launchUrl + `/get-started.html#${anchorId}`;
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
