jest.mock('../logger', () => mockLogger);
jest.mock('../../hexo-util', () => mockHexoUtil)

const {mockCb, mockLogger, mockHexo, mockHexoUtil} = require('./mocks');
const generator = require('../generator');

describe('generator', () => {
  let generate;

  beforeEach(() => {
    generate = generator({
      hexo: mockHexo
    });
  });

  it('should return a generate function', () => {
    expect(typeof generate).toBe('function')
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
});
