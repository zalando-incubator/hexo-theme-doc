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
    <nav className="sidebar">
      <div className="sidebar-content">
        <div className="sidebar__vertical-menu">
          <SidebarToggle className="sidebar__vertical-menu__sidebar-toggle" onClick={uncollapse} />
        </div>
        <ul className="sidebar-list">
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
    <li className={`sidebar-list__item ${isLabel ? 'sidebar-list__item--label' : 'sidebar-list__item--link'} ${isCurrent ? 'sidebar-list__item--current' : ''}`}>
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
    <i className={'dc-icon dc-icon--menu dc-icon--interactive sidebar-toggle ' + (className || '')}
      onClick={onClick}>
    </i> );
}

function SidebarClose ({className, onClick}) {
  return (
    <i className={'dc-icon dc-icon--close dc-icon--interactive ' + (className || '')}
      onClick={onClick}>
    </i>
  );
}

module.exports = {Sidebar, SidebarToggle, SidebarClose};
