const urljoin = require('urljoin');

function url_for (props) {
  return function (path) {
    return urljoin(props.config.root, path);
  };
}

module.exports = {url_for};
