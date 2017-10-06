const urljoin = require('url-join');
const $ = require('jquery');

function url_for (props) {
  return function (path) {
    if (/^(f|ht)tps?:\/\//i.test(path)) {
      return path;
    }
    const url = urljoin(
      props.config.root,
      path
    );
    return url.replace(/\/{2,}/g, '/'); // removes double slashes
  };
}

function getTOCHeaders () {
  return $('h2');
}

function dispatch (eventType, payload = {}) {
  const evt = new CustomEvent(eventType, { detail: payload });
  window.dispatchEvent(evt);
}

function subscribeOn (eventType, cb) {
  return window.addEventListener(eventType, (e) => {
    cb(Object.assign({}, {type: e.type}, e.detail));
  });
}

module.exports = {url_for, getTOCHeaders, dispatch, subscribeOn};
