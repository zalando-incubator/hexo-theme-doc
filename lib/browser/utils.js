const urljoin = require('urljoin');
const $ = require('jquery');

function url_for (props) {
  return function (path) {
    return urljoin(props.config.root, path);
  };
}

function getTOCHeaders () {
  return $('h2');
}

module.exports = {url_for, getTOCHeaders};
