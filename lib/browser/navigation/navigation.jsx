const React = require('react');
const {url_for} = require('../utils');
const {Sidebar} = require('./sidebar.jsx');
const {SearchForm} = require('../search/search-form.jsx');
const {Navbar, Logo, SidebarToogle} = require('./navbar.jsx');
const searchLoad = require('../search/load');


class Navigation extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      search: null
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
          <SidebarToogle />
          <SearchForm search={this.state.search} />
        </Navbar>

        <Sidebar
          url_for={this.url_for}
          items={navigation.main || []}
          page={this.props.page}
          config={this.props.config} />
      </div>
    );
  }
}

module.exports = {Navigation};
