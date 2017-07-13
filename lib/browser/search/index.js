//
//
// SEARCH with lunr
//
// -------------------------------------------

const load = require('./load');
const $input = $('#search-input');
const $results = $('#search-results');
const $page = $('#page-content');

module.exports = {
  $input,
  $page,
  $results
};

load($input.data('url'))
  .then(function (search) {
    $input.on('keyup', onKeyUp({
      search,
      $input,
      $page,
      $results
    }));
  });

function onKeyUp (options) {
  return function () {
    const query = $(this).val().trim();

    if (!query) {
      options.$page.show();
      options.$results.hide(); return;
    }

    const results = options.search(query);
    options.$page.hide();
    options.$results.show();
    options.$results.html(resultsHTML(results));

    options.$results.find('.search-result-link').on('click', () => {
      options.$page.show();
      options.$results.hide();
      options.$input.val('');
    });
  };
}

function resultsHTML (results) {
  const resultsHTML  = results.map(resultHTML).join('\n');

  return `<h1>Search Results <small>(${results.length} results)</small></h1>
      ${(results.length ? '<ul>' + resultsHTML + '</ul>' : 'Your search did not match any documents.')}`;
}

function resultHTML (result) {
  return `<li>
    <h4><a href="${result.path}" class="search-result-link">${result.title} <small>(score: ${result.score.toFixed(2)})</small></a></h4>
    <p>${result.body}</a></p>
  </li>`;
}
