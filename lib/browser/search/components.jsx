const React = require('react');
const {SHOW_SEARCH_RESULTS, HIDE_SEARCH_RESULTS} = require('./actions');
const {dispatch} = require('../utils');

class SearchForm extends React.Component {

  constructor (props) {
    super(props);
  }

  handleKeyUp (e) {
    const query = (e.target.value || '').trim();

    if (!query) {
      dispatch(HIDE_SEARCH_RESULTS);
      return;
    }

    if (query.length < 3) { return; }

    const results = this.props.search(query);

    dispatch(SHOW_SEARCH_RESULTS, {results});

    if (typeof this.props.onSearch === 'function') {
      this.props.onSearch();
    }
  }

  render () {

    if (!this.props.search) { return null; }

    return (
      <div className="dc-search-form doc-search-form">
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

function SearchResultsTitle ({results}) {
  return (
    <div className="doc-search-results__title">
      <h1>Search Results <small>({results.length} results)</small></h1>
    </div>
  );
}

function SearchResultsList ({results}) {
  if (!results.length) {
    return null;
  }

  const handleSearchResultLinkClick = () => dispatch(HIDE_SEARCH_RESULTS);

  const createMarkup = (html) => ({ __html: html });

  return (
    <ul className="doc-search-results__list">
      { results.map((result, i) => {
        return (
          <li key={'doc-search-results__list__item-' + i } className="doc-search-results__list__item">
            <h4>
              <a
                href={result.path}
                className="doc-search-results__list__link doc-search-result-link"
                onClick={handleSearchResultLinkClick}>
                {result.title} <small>(score: {result.score.toFixed(2)})</small>
              </a>
            </h4>
            <p dangerouslySetInnerHTML={createMarkup(result.body)}></p>
          </li>
        );
      })}
    </ul>
  );
}

module.exports = {SearchForm, SearchResultsTitle, SearchResultsList};
