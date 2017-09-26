const React = require('react');
const {shallow} = require('enzyme');
const {SearchForm} = require('../search-form.jsx');
const $ = require('jquery');

describe('browser.search', () => {
  const $getElements = () => {
    return {
      $results: $('#search-results'),
      $page: $('#page-content')
    };
  };

  beforeEach(() => {
    const html = `
      <div id="search-results"></div>
      <div id="page-content"></div>
    `;
    document.documentElement.innerHTML = html;
  });

  it('should not render anything if search props is null', () => {
    const searchForm = shallow(<SearchForm search={null} />);
    expect(searchForm.getNode()).toEqual(null);
  });

  it('should render the input if search props is a function', () => {
    const searchForm = shallow(<SearchForm search={() => {}} />);
    expect(searchForm.find('input').length).toEqual(1);
  });

  it('should hide results and show the page content if search query is empty', () => {
    const searchForm = shallow(<SearchForm search={() => {}} />);
    searchForm.find('input').simulate('keyup', { target: { value: '' } } );

    const {$results, $page} = $getElements();
    expect($results.css('display')).toEqual('none');
    expect($page.css('display')).toEqual('block');
  });

  it('should show results and hide the page content if search query is not empty', () => {
    const searchForm = shallow(<SearchForm search={() => []} />);
    searchForm.find('input').simulate('keyup', { target: { value: 'foobar' } } );

    const {$results, $page} = $getElements();
    expect($results.css('display')).toEqual('block');
    expect($page.css('display')).toEqual('none');
  });

  it('should show the expected number of results', () => {
    const searchForm = shallow(<SearchForm search={() => [{
      score: 0.4,
      title: 'foobar',
      body: 'foobar'
    }]} />);
    searchForm.find('input').simulate('keyup', { target: { value: 'foobar' } } );

    const {$results} = $getElements();
    expect($results.find('ul').children('li').length).toBe(1);
  });

  it('should hide results, show the page content and reset input when a link is clicked', () => {
    const searchForm = shallow(<SearchForm search={() => [{
      score: 0.4,
      title: 'foobar',
      body: 'foobar'
    }]} />);
    const e = { target: { value: 'foobar' } };
    searchForm.find('input').simulate('keyup', e);
    const {$results, $page} = $getElements();

    $results.find('.search-result-link').trigger('click');
    expect($results.css('display')).toEqual('none');
    expect($page.css('display')).toEqual('block');

    expect(e.target.value).toEqual('');
  });
});
