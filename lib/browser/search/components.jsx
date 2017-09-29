const React = require('react');
const $ = require('jquery');

class SearchForm extends React.Component {

  constructor (props) {
    super(props);
  }

  handleKeyUp (e) {
    const $results = $('#search-results');
    const $page = $('#page-content');
    const query = (e.target.value || '').trim();

    if (!query) {
      $page.show();
      $results.hide();
      return;
    }

    if (query.length < 3) { return; }

    const results = this.props.search(query);
    $page.hide();
    $results.show();
    $results.html(renderResults(results));

    if (typeof this.props.onSearch === 'function') {
      this.props.onSearch();
    }

    $results.find('.doc-search-result-link').on('click', () => {
      $page.show();
      $results.hide();
      e.target.value = '';
    });
  }

  render () {

    if (!this.props.search) { return null; }

    return (
      <div className={'dc-search-form doc-search-form'}>
        <input type="search"
          className="dc-input dc-search-form__input"
          placeholder="Search..."
          onKeyUp={this.handleKeyUp.bind(this)}
          autoFocus={this.props.autoFocus} />
        <button className="dc-btn dc-search-form__btn">
          <i className="dc-icon dc-icon--search"></i>
        </button>
      </div>
    );
  }
}

function renderResults (results) {
  const resultsHTML  = results.map(renderResult).join('\n');

  return `<h1>Search Results <small>(${results.length} results)</small></h1>
      ${(results.length ? '<ul>' + resultsHTML + '</ul>' : 'Your search did not match any documents.')}`;
}

function renderResult (result) {
  return `<li>
    <h4><a href="${result.path}" class="doc-search-result-link">${result.title} <small>(score: ${result.score.toFixed(2)})</small></a></h4>
    <p>${result.body}</a></p>
  </li>`;
}

module.exports = {SearchForm};
