//
//
// SEARCH with lunr
//
// -------------------------------------------
const searcher = require('./searcher');

const $searchInput = $('#search-input');
const $searchResults = $('#search-results');
const $pageContent = $('#page-content');

load($searchInput.data('url'))
  .then(function (data) {
    const search = searcher({
      index: data.index,
      store: data.store
    });
    $searchInput.on('keyup', onKeyUp({
      search,
      $el: {
        input: $searchInput,
        page: $pageContent,
        results: $searchResults
      }
    }));
  });

function load(url) {
  return fetch(url || '/lunr.json', {
    credentials: 'include'
  })
  .then(function (res) {
    return res.json()
  })
  .then(function(json) {
    var index = lunr.Index.load(json.index);
    var store = json.store;
    return { index: index, store: store}
  });
}

function onKeyUp(options) {

  return function () {
    const query = $(this).val().trim();

    if(!query) {
      options.$el.page.show();
      options.$el.results.hide(); return;
    }

    const results = options.search(query);
    options.$el.page.hide();
    options.$el.results.show();
    options.$el.results.html(resultsHTML(results));

    options.$el.results.find('.search-result-link').on('click', () => {
      options.$el.page.show();
      options.$el.results.hide();
      options.$el.input.val('');
    });
  }
}

function resultsHTML(results) {
  const resultsHTML  = results.map(resultHTML).join('\n');

  return `<h1>Search Results <small>(${results.length} results)</small></h1>
      ${(results.length ? '<ul>' + resultsHTML + '</ul>' : 'Your search did not match any documents.')}`;
}

function resultHTML(result) {
  return `<li>
    <h4><a href="${result.path}" class="search-result-link">${result.title} <small>(score: ${result.score.toFixed(2)})</small></a></h4>
    <p>${result.body}</a></p>
  </li>`;
}
