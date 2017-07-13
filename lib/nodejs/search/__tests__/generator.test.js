'use strict';

jest.mock('../logger', () => mockLogger);
jest.mock('../../hexo-util', () => mockHexoUtil);

const mockSend = jest.fn();
const mockFork = jest.fn()
  .mockImplementation(() => ({
    on: () => {},
    send: mockSend
  }));

jest.mock('child_process', () => ({
  fork: mockFork
}));

const {mockCb, mockLogger, mockHexo, mockHexoUtil} = require('./mocks');
const generator = require('../generator');

describe('generator', () => {
  let generate;

  beforeAll(() => {
    generate = generator({
      hexo: mockHexo
    });
  });

  it('should return a generate function', () => {
    expect(typeof generate).toBe('function');
  });

  describe('generate', () => {
    let result;
    beforeAll(() => {
      result = generate({
        pages: [
          {title: 'foo', content: '', path: '/foo', source: 'foo.md'},
          {title: 'bar', content: 'bar', path: '/bar', source: 'bar.md'}
        ]
      }, mockCb);
    });

    it('should return search `index` and `store` from pages', () => {
      expect(result.index).not.toBeUndefined();
      expect(result.store).not.toBeUndefined();
    });

    describe('index.search', () => {
      it('should return the expected results', () => {
        const results = result.index.search('b*');
        expect(results.length).toBeGreaterThan(0);
      });
    });
  });

  describe('when skip is true', () => {
    beforeAll(() => {
      mockHexo.config.theme_config.search = {
        skip: true
      };
      generate = generator({
        hexo: mockHexo
      });
    });

    test('should return an empty function', () => {
      const result = generate();
      expect(result).toBeUndefined();
    });
  });

  describe('when background is true', () => {
    beforeAll(() => {
      mockHexo.config.theme_config.search = {
        background: true
      };
    });

    test('should run task in background', () => {
      generate = generator({
        hexo: mockHexo
      });

      generate({pages: 'testPages'}, () => {});
      expect(mockSend).toHaveBeenCalled();
      expect(mockFork).toHaveBeenCalled();
    });
  });
});
