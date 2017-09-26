const React = require('react');
const $ = require('jquery');

function SearchForm ({search}) {

  const handleKeyUp = (e) => {
    const $results = $('#search-results');
    const $page = $('#page-content');
    const query = (e.target.value || '').trim();

    if (!query) {
      $page.show();
      $results.hide();
      return;
    }

    const results = search(query);
    $page.hide();
    $results.show();
    $results.html(resultsHTML(results));

    $results.find('.search-result-link').on('click', () => {
      $page.show();
      $results.hide();
      e.target.value = '';
    });
  };

  if (!search) { return null; }

  return (
    <div className={'dc-search-form search-form'}>
      <input type="search"
        className="dc-input dc-search-form__input"
        placeholder="Search..."
        onKeyUp={handleKeyUp} />
      <button className="dc-btn dc-search-form__btn">
        <i className="dc-icon dc-icon--search dc-icon--interactive"></i>
      </button>
    </div>
  );
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

module.exports = {
  SearchForm
};
