const React = require('react');
const {SearchForm} = require('../search/components.jsx');

function Navbar (props) {
  return (
    <nav className="doc-navbar">
      {props.children}
    </nav>
  );
}

function Logo ({url_for, navigation}) {
  return (
    <a href={url_for(navigation.logo.path)} className="doc-navbar__logo">
      <img src={url_for('images/logo.png')} className="doc-navbar__logo__img"/>
      <span className="doc-navbar__logo__text">{navigation.logo.text}</span>
    </a>
  );
}

function Sidebar ({items, page, url_for, config, search, uncollapse}) {

  const itemsJsx = items.map((item, i) => {
    return (<SidebarItem
      key={i + 'sidebar-item' }
      item={item}
      page={page}
      config={config}
      url_for={url_for} />
    );
  });

  return (
    <nav className="doc-sidebar">
      <div className="doc-sidebar__vertical-menu">
        <SidebarToggle
          className="doc-sidebar-toggle--primary doc-sidebar__vertical-menu__item"
          onClick={uncollapse} />
        <i className="dc-icon
            dc-icon--search
            dc-icon--interactive
            doc-sidebar__vertical-menu__item
            doc-sidebar__vertical-menu__item--primary"
          onClick={uncollapse}>
        </i>
      </div>
      <div className="doc-sidebar-content">
        <div className="doc-sidebar__search-form">
          <SearchForm search={search} autoFocus={true} />
        </div>
        <ul className="doc-sidebar-list">
          { itemsJsx }
        </ul>
      </div>
    </nav>
  );
}

function SidebarItem ({item, page, url_for}) {
  const isCurrent = item.path === page.path;
  const isLabel = item.type === 'label';

  return (
    <li className={`doc-sidebar-list__item ${isLabel ? 'doc-sidebar-list__item--label' : 'doc-sidebar-list__item--link'} ${isCurrent ? 'doc-sidebar-list__item--current' : ''}`}>
      {
        isLabel ? item.text :
          <a href={url_for(item.path)}>
            { item.text }
          </a>
      }
    </li>
  );
}

function SidebarToggle ({className, onClick}) {
  return (
    <i className={'dc-icon dc-icon--menu dc-icon--interactive doc-sidebar-toggle ' + (className || '')}
      onClick={onClick}>
    </i> );
}

function SidebarClose ({className, onClick}) {
  return (
    <i className={'dc-icon dc-icon--close dc-icon--interactive doc-sidebar-close ' + (className || '')}
      onClick={onClick}>
    </i>
  );
}

module.exports = {Navbar, Logo, Sidebar, SidebarItem, SidebarToggle, SidebarClose};
