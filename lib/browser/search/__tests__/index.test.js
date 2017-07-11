/**
 * @jest-environment jsdom
 */

/* global global */

const mockLoad = jest.fn()
  .mockImplementation(() => {
    return Promise.resolve(() => {
      return [
        { title: 'foo', body: '', score: 0.9292828, path: '/foo' }
      ];
    });
  });

jest.mock('../load', () => mockLoad);

global.$ = require('jquery');

describe('browser.search', () => {
  let $input, $results, $page;
  beforeEach(() => {
    const html = `
      <input type="text" id="search-input" />
      <div id="search-results"></div>
      <div id="page-content"></div>
    `;
    document.documentElement.innerHTML = html;
    const index = require('../index');
    $input = index.$input;
    $results = index.$results;
    $page = index.$page;
  });

  it('should hide results and show the page content if search query is empty', () => {
    $input.trigger('keyup');
    expect($results.css('display')).toEqual('none');
    expect($page.css('display')).toEqual('block');
  });

  it('should show results and hide the page content if search query is not empty', () => {
    $input.val('foo');
    $input.trigger('keyup');
    expect($results.css('display')).toEqual('block');
    expect($page.css('display')).toEqual('none');
  });

  it('should show the expected number of results', () => {
    $input.val('foo');
    $input.trigger('keyup');
    expect($results.find('ul').children('li').length).toBe(1);
  });

  it('should hide results, show the page content and reset input when a link is clicked', () => {
    $input.val('foo');
    $input.trigger('keyup');
    $results.find('.search-result-link').trigger('click');
    expect($results.css('display')).toEqual('none');
    expect($page.css('display')).toEqual('block');
    expect($input.val()).toEqual('');
  });
});
