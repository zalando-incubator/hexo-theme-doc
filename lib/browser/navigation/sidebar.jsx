const React = require('react');

function Sidebar ({items, page, url_for, config}) {

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

module.exports = {Sidebar, SidebarItem};
