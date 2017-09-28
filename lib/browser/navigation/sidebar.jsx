const React = require('react');

function Sidebar ({items, page, url_for, config, uncollapse}) {

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
      <div className="doc-sidebar-content">
        <div className="doc-sidebar__vertical-menu">
          <SidebarToggle className="doc-sidebar__vertical-menu__sidebar-toggle" onClick={uncollapse} />
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

module.exports = {Sidebar, SidebarToggle, SidebarClose};
