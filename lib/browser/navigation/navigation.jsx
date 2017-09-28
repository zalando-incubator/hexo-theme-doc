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
      if ( $('body').hasClass('sidebar--is-visible') ) {
        this.toggleSidebar();
      }
    });
  }

  collapseSidebar () {
    $('body').addClass('navigation--is-collapsed');
  }

  uncollapseSidebar () {
    $('body').removeClass('navigation--is-collapsed');
  }

  toggleSidebar () {
    $('body').toggleClass('sidebar--is-visible');
  }

  hideSidebar () {
    $('body').removeClass('sidebar--is-visible');
  }

  render () {
    const {navigation} = this.props.data;
    return (
      <div className="navigation">
        <Navbar
          config={this.props.config}
          data={this.props.data}
          url_for={this.url_for}>
          <Logo url_for={this.url_for} navigation={navigation} />
          <SidebarClose
            className="navbar__sidebar-close navbar__sidebar-close--desktop"
            onClick={this.collapseSidebar.bind(this)} />
          <SidebarToggle
            className="navbar__sidebar-toggle"
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
