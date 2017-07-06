'use strict';

const Hexo = require('hexo');
const hexo = new Hexo();
const hexoUtil = require('../hexo-util');
const mockRoute = 'mockRoute';
const mockUrlFor = jest.fn().mockImplementation(route => '/' + route);


hexo.config = {
  relative_link: 'relative_link'
};
hexo.extend.helper.store['url_for'] = mockUrlFor;

describe('hexo-util', () => {

  const {url_for} = hexoUtil({hexo});

  describe('url_for', () => {
    const url = url_for(mockRoute);
    test('should call native url_for method', () => {
      expect(url).toEqual('/' + mockRoute);
    });
  });
});
