const React = require('react');
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

    const {Navigation} = require('../containers.jsx');

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

    it('should smoothScroll if $headers are found in the page', () => {
      const html = `
        <h2>Foo</h2>
        <h2>Bar</h2>
      `;
      document.documentElement.innerHTML = html;
      const navigation = mount(createComponent());
      expect(navigation.length).toEqual(1);
      expect(mockSmoothScrollInit).toBeCalled();
    });
  });
});
