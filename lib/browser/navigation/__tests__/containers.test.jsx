const React = require('react');
const $ = require('jquery');
const {shallow, mount} = require('enzyme');

describe('navigation.containers', () => {

  describe('Navigation', () => {
    let mockSmoothScrollInit;

    const mockSearchLoad = jest.fn()
      .mockImplementation(() => {
        return Promise.resolve(() => {
          return () => {};
        });
      });

    jest.mock('../../search/load', () => mockSearchLoad);

    beforeEach(() => {
      mockSmoothScrollInit = jest.fn();
      global.smoothScroll = { init: mockSmoothScrollInit };
    });

    const {SidebarClose, SidebarToggle} = require('../components.jsx');
    const {Navigation, NAVIGATION_IS_COLLASPED_CLASS} = require('../containers.jsx');

    const createComponent = (props) => {
      return React.createFactory(Navigation)(Object.assign({
        config: {
          root: '/',
          theme_config: {
            search: {}
          }
        },
        data: {
          navigation: {
            main: [],
            logo: {
              path: 'logo-path'
            }
          }
        },
        page: {}
      }, props));
    };



    it('should shallow render without any error', () => {
      const navigation = shallow(createComponent());
      expect(navigation.length).toEqual(1);
    });

    it('should mount without any error', () => {
      const navigation = mount(createComponent());
      expect(navigation.length).toEqual(1);
    });

    it('should init smoothScroll if $headers are found in the page', () => {
      const html = `
        <h2>Foo</h2>
        <h2>Bar</h2>
      `;
      document.documentElement.innerHTML = html;
      const navigation = mount(createComponent());
      expect(navigation.length).toEqual(1);
      expect(mockSmoothScrollInit).toBeCalled();
    });

    it('should collapse navigation on SidebarClose click and uncollapse on SidebarToggle click', () => {
      const navigation = mount(createComponent());
      navigation.find(SidebarClose).last().simulate('click');
      expect($('body').attr('class')).toContain(NAVIGATION_IS_COLLASPED_CLASS);

      navigation.find(SidebarToggle).last().simulate('click');
      expect($('body').attr('class')).not.toContain(NAVIGATION_IS_COLLASPED_CLASS);
    });


    it('should listen to scroll events and update the state accordingly', () => {
      const html = `
        <div style="height: 2000px;">
          <h2 id="foo">Foo</h2>
          <h2 id="bar">Bar</h2>
        </div>
      `;
      document.documentElement.innerHTML = html;

      const navigation = mount(createComponent());

      window.dispatchEvent(new Event('scroll'));

      expect(navigation.state().visibleHeaderId).toBe('bar');
    });
  });
});
