/* global lunr */
const searcher = require('../../nodejs/search/searcher');

module.exports = function load (url) {
  return fetchIndex(url)
    .then(function (data) {
      const search = searcher({
        index: data.index,
        store: data.store
      });
      return search;
    });
};

function fetchIndex (url) {
  return fetch(url || '/lunr.json', { credentials: 'include' })
    .then(function (res) {
      return res.json();
    })
    .then(function (json) {
      const index = lunr.Index.load(json.index);
      const store = json.store;
      return { index: index, store: store };
    });
}
