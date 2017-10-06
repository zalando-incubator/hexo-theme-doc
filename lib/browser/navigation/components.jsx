const React = require('react');
const {dispatch} = require('../utils');
const {HIDE_SEARCH_RESULTS} = require('../search/actions');
const {SearchForm} = require('../search/components.jsx');

function Navbar (props) {
  return (
    <nav className="doc-navbar">
      {props.children}
    </nav>
  );
}

function Logo ({url_for, navigation}) {
  if (!navigation.logo) { return null; }

  return (
    <a href={url_for(navigation.logo.path)} className="doc-navbar__logo">
      <img src={url_for('images/logo.png')} className="doc-navbar__logo__img"/>
      <span className="doc-navbar__logo__text">{navigation.logo.text}</span>
    </a>
  );
}

function Sidebar ({items, page, url_for, config, search, uncollapse, tocItems, visibleHeaderId, support}) {

  const renderItems = () => {
    const supportItems = support && support.navigation === true ? [{
      type: 'label',
      text: support.navigation_label
    }, {
      type: 'link',
      path: support.link_url,
      text: support.link_text,
      target: '_blank'
    }] : [];

    return (items || []).concat(supportItems).map((item, i) => {
      return (<SidebarItem
        key={i + 'sidebar-item' }
        item={item}
        page={page}
        config={config}
        tocItems={tocItems}
        visibleHeaderId={visibleHeaderId}
        url_for={url_for} />
      );
    });
  };

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
          { renderItems() }
        </ul>
      </div>
    </nav>
  );
}

function SidebarItem ({item, page, url_for, tocItems, visibleHeaderId}) {
  const isCurrent = item.path === page.path;
  const isLabel = item.type === 'label';

  let toc = null;

  if (isCurrent) {
    toc = (
      <ul className="doc-sidebar-list__toc-list">
        {
          (tocItems || []).map(function (i, tocItem) {
            return (<SidebarTocItem
              key={i + 'sidebar-toc-item'}
              visibleHeaderId={visibleHeaderId}
              item={tocItem}
            />);
          })
        }
      </ul>
    );
  }

  return (
    <li className={`doc-sidebar-list__item ${isLabel ? 'doc-sidebar-list__item--label' : 'doc-sidebar-list__item--link'} ${isCurrent ? 'doc-sidebar-list__item--current' : ''}`}>
      {
        isLabel ? item.text :
          <a href={url_for(item.path)} target={item.target ? item.target : '_self'}>
            { item.text }
          </a>
      }
      { toc }
    </li>
  );
}

function SidebarTocItem ({item, visibleHeaderId}) {
  const handleOnClick = () => dispatch(HIDE_SEARCH_RESULTS);

  return (
    <li className={`doc-sidebar-list__toc-item ${item.id === visibleHeaderId ? 'doc-sidebar-list__toc-item--current' : '' }`}>
      <a href={ '#' + item.id } data-scroll onClick={handleOnClick}>
        <span>{ item.text }</span>
      </a>
    </li>);
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
