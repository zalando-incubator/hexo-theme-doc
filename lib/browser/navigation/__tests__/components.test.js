const React = require('react');
const {mount, shallow} = require('enzyme');

const itShouldAppendClasses = (Component) => {
  it('should append classes if any', () => {
    const className = 'custom-class';
    const component = shallow(React.createFactory(Component)({
      className
    }));
    expect(component.hasClass(className)).toBe(true);
  });
};

describe('navigation.components', () => {

  describe('Navbar', () => {
    const {Navbar} = require('../components.jsx');
    it('should wrap children', () => {
      const navbar = mount(
        <Navbar>
          <div id="foobar"></div>
        </Navbar>
      );
      expect(navbar.find('#foobar').length).toBe(1);
    });
  });

  describe('Logo', () => {
    const {Logo} = require('../components.jsx');
    it('should not render anything if props.navigation.logo is not set', () => {
      const logo = shallow(<Logo navigation={{}}/>);
      expect(logo.getNode()).toEqual(null);
    });

    it('should render if props.navigation.logo is set', () => {
      const logo = shallow(<Logo url_for={() => {}} navigation={{logo: {}}} />);
      expect(logo.find('a').length).toBe(1);
    });
  });

  describe('SidebarItem', () => {
    const {SidebarItem} = require('../components.jsx');

    const createComponent = (props = {}) => {
      return React.createFactory(SidebarItem)(Object.assign({
        item: {
          path: '/bar',
          type: 'link'
        },
        page: {
          path: '/foo'
        },
        url_for: () => {},
      }, props));
    };

    it('shouldn\'t add TOC items if the item  doesn\'t represent the current page', () => {
      const sidebarItem = mount(createComponent());
      expect(sidebarItem.find('.doc-sidebar-list__toc-list').length).toBe(0);
    });

    it('should add TOC items if the item represents the current page', () => {
      const sidebarItem = mount(createComponent({
        item: {
          path: '/foo',
          type: 'link'
        },
        page: {
          path: '/foo'
        }
      }));
      expect(sidebarItem.find('.doc-sidebar-list__toc-list').length).toBe(1);
    });

    it('should render a label if the item type is "label"', () => {
      const sidebarItem = mount(createComponent({
        item: {
          type: 'label'
        }
      }));
      expect(sidebarItem.find('.doc-sidebar-list__item--label').length).toBe(1);
    });
  });

  describe('SidebarToggle', () => {
    const {SidebarToggle} = require('../components.jsx');

    it('should shallow render without any error', () => {
      const toggle = shallow(<SidebarToggle />);
      expect(toggle.length).toEqual(1);
    });

    itShouldAppendClasses(SidebarToggle);
  });

  describe('SidebarClose', () => {
    const {SidebarClose} = require('../components.jsx');

    it('should shallow render without any error', () => {
      const close = shallow(<SidebarClose />);
      expect(close.length).toEqual(1);
    });

    itShouldAppendClasses(SidebarClose);
  });
});
