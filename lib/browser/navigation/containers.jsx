const React = require('react');
const $ = require('jquery');
const {url_for} = require('../utils');
const {Sidebar, SidebarToggle, SidebarClose, Navbar, Logo} = require('./components.jsx');
const {SearchForm} = require('../search/components.jsx');
const searchLoad = require('../search/load');

class Navigation extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      search: null,
      collapsed: false,
    };

    this.url_for = url_for(this.props);
  }

  componentDidMount () {
    this.loadSearchIndex();

    // on click content action
    // FIXME: remove Jquery, .dc-page doesn't cover all the area outside the sidebar
    $('.dc-page').on('click', this.onClickContent.bind(this));
  }

  // loading search index action
  loadSearchIndex () {
    const route = this.props.config.theme_config.search.route || '/lunr.json';
    searchLoad(this.url_for(route))
      .then((search) => this.setState({ search }));
  }

  // onClickContent handler
  onClickContent () {
    if ( $('body').hasClass('doc-sidebar--is-visible') ) {
      this.toggleSidebar();
    }
  }

  // collapse sidebar action
  collapseSidebar () {
    $('body').addClass('doc-navigation--is-collapsed');
  }

  // uncollapse sidebar action
  uncollapseSidebar () {
    $('body').removeClass('doc-navigation--is-collapsed');
    $('.dc-search-form__input').focus();
  }

  // toggle sidebar action
  toggleSidebar () {
    $('body').toggleClass('doc-sidebar--is-visible');
  }

  // hide sidebar action
  hideSidebar () {
    $('body').removeClass('doc-sidebar--is-visible');
  }

  render () {
    const {navigation} = this.props.data;
    return (
      <div className="doc-navigation">
        <Navbar
          config={this.props.config}
          data={this.props.data}
          url_for={this.url_for}>
          <Logo url_for={this.url_for} navigation={navigation} />
          <SidebarClose
            className="doc-navbar__sidebar-close doc-navbar__sidebar-close--desktop"
            onClick={this.collapseSidebar.bind(this)} />
          <SidebarToggle
            className="doc-navbar__sidebar-toggle"
            onClick={this.toggleSidebar.bind(this)} />
          <SearchForm
            search={this.state.search}
            onSearch={this.hideSidebar.bind(this)} />
        </Navbar>

        <Sidebar
          url_for={this.url_for}
          items={navigation.main || []}
          page={this.props.page}
          config={this.props.config}
          search={this.state.search}
          hide={this.hideSidebar.bind(this)}
          uncollapse={this.uncollapseSidebar.bind(this)} />
      </div>
    );
  }
}

module.exports = {Navigation};
