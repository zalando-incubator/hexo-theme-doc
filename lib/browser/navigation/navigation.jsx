const React = require('react');
const {url_for} = require('../utils');
const {Sidebar, SidebarToggle, SidebarClose} = require('./sidebar.jsx');
const {SearchForm} = require('../search/search-form.jsx');
const {Navbar, Logo} = require('./navbar.jsx');
const searchLoad = require('../search/load');

class Navigation extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      search: null,
      collapsed: false
    };

    this.url_for = url_for(this.props);
  }

  componentDidMount () {
    const route = this.props.config.theme_config.search.route || '/lunr.json';

    searchLoad(this.url_for(route))
      .then((search) => {
        this.setState({
          search
        });
      });

    $('.dc-page').on('click', () => {
      if ( $('body').hasClass('doc-sidebar--is-visible') ) {
        this.toggleSidebar();
      }
    });
  }

  collapseSidebar () {
    $('body').addClass('doc-navigation--is-collapsed');
  }

  uncollapseSidebar () {
    $('body').removeClass('doc-navigation--is-collapsed');
  }

  toggleSidebar () {
    $('body').toggleClass('doc-sidebar--is-visible');
  }

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
          <SearchForm search={this.state.search} onSearch={this.hideSidebar.bind(this)} />
        </Navbar>

        <Sidebar
          url_for={this.url_for}
          items={navigation.main || []}
          page={this.props.page}
          config={this.props.config}
          uncollapse={this.uncollapseSidebar.bind(this)}/>
      </div>
    );
  }
}

module.exports = {Navigation};
