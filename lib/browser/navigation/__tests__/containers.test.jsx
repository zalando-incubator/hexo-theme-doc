const React = require('react');
const {shallow} = require('enzyme');
const {Navigation} = require('../containers.jsx');

const mockSearchLoad = jest.fn()
  .mockImplementation(() => {
    return Promise.resolve(() => {
      return () => {};
    });
  });

jest.mock('../../search/load', () => mockSearchLoad);

describe('Navigation', () => {
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
          main: []
        }
      },
      page: {}
    }, props));
  };

  it('should shallow render without any error', () => {
    const navigation = shallow(createComponent());
    expect(navigation.length).toEqual(1);
  });
});
