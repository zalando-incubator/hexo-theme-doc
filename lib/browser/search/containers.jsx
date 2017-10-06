const React = require('react');
const $ = require('jquery');
const {SHOW_SEARCH_RESULTS, HIDE_SEARCH_RESULTS} = require('./actions');
const {subscribeOn} = require('../utils');
const {SearchResultsTitle, SearchResultsList} = require('./components.jsx');
const {SupportFooter} = require('../support/components.jsx');

class SearchResults extends React.Component {
  constructor (props) {
    super(props);
    this.$page = $('#page-content');
    this.state = {
      query: null,
      visible: false,
      results: []
    };
  }

  componentDidMount () {

    subscribeOn(SHOW_SEARCH_RESULTS, (e) => {
      this.$page.hide();
      this.setState({
        query: e.query,
        visible: true,
        results: e.results
      });
      window.scrollTo(0,0);
    });

    subscribeOn(HIDE_SEARCH_RESULTS, () => {
      this.$page.show();
      this.setState({
        query: null,
        visible: false,
        results: []
      });
    });
  }

  render () {
    if (!this.state.visible) { return null; }

    return (
      <div className="doc-search-results">
        <SearchResultsTitle results={this.state.results} query={this.state.query} />
        <SearchResultsList results={this.state.results} />
        <SupportFooter support={this.props.config.theme_config.support} />
      </div>
    );
  }
}

module.exports = {SearchResults};
