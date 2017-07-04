/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
__webpack_require__(2);



/***/ }),
/* 1 */
/***/ (function(module, exports) {

//
//
// inherited code from hexo meteor theme
//
// -------------------------------------------

(function (options) {
  var scrolling = false;
  var scrollTimeout;
  var activeLink = document.querySelector('.sidebar-link.current');
  var allLinks = [];

  // create sub links for h2s
  var h2s = options.selectors.indexOf('h2') > -1 ? document.querySelectorAll('h2') : [];

  // find all h3s and nest them under their h2s
  var h3s = options.selectors.indexOf('h3') > -1 ? document.querySelectorAll('h3') : [];

  var isAfter = function(e1, e2) {
    return e1.compareDocumentPosition(e2) & Node.DOCUMENT_POSITION_FOLLOWING;
  };

  var h2sWithH3s = [];
  var j = 0;
  for (var i = 0; i < h2s.length; i++) {
    var h2 = h2s[i];
    var nextH2 = h2s[i+1];
    var ourH3s = [];
    while (h3s[j] && isAfter(h2, h3s[j]) && (!nextH2 || !isAfter(nextH2, h3s[j]))) {
      ourH3s.push({ header: h3s[j] });
      j++;
    }

    h2sWithH3s.push({
      header: h2,
      subHeaders: ourH3s
    });
  }

  if (h2sWithH3s.length) {
    createSubMenu(activeLink.parentNode, h2sWithH3s);
    smoothScroll.init({
      speed: 400,
      callback: function () {
        scrolling = false
      }
    })
  }

  function createSubMenu (container, headers) {
    var subMenu = document.createElement('ul');
    subMenu.className = 'sub-menu';
    container.appendChild(subMenu)
    Array.prototype.forEach.call(headers, function (h) {
      var link = createSubMenuLink(h.header);
      subMenu.appendChild(link);
      if (h.subHeaders) {
        createSubMenu(link, h.subHeaders)
      }
      makeHeaderLinkable(h.header)
    })
  }

  function createSubMenuLink (h) {
    allLinks.push(h);
    var headerLink = document.createElement('li');
    headerLink.innerHTML =
      '<a href="#' + h.id + '" data-scroll class="' + h.tagName + '"><span>' + (h.title || h.textContent) + '</span></a>';
    headerLink.firstChild.addEventListener('click', onLinkClick);
    return headerLink;
  }

  function makeHeaderLinkable (h) {
    var anchor = document.createElement('a');
    anchor.className = 'anchor';
    anchor.href = '#' + h.id;
    anchor.setAttribute('aria-hidden', true);
    anchor.setAttribute('data-scroll', '');
    anchor.innerHTML = '<span class="icon-link"></span>';
    anchor.addEventListener('click', onLinkClick);
    h.insertBefore(anchor, h.firstChild);

    var anchorOffset = document.createElement('div');
    anchorOffset.id = h.id;
    anchorOffset.className = 'anchor-offset';
    h.insertBefore(anchorOffset, h.firstChild);

    h.removeAttribute("id");
  }

  function onLinkClick (e) {
    if (document.querySelector('.sub-menu').contains(e.target)) {
      setActive(e.target)
    }
    scrolling = true
    document.body.classList.remove('sidebar-open')
  }

  // setup active h3 update
  window.addEventListener('scroll', updateSidebar);
  window.addEventListener('resize', updateSidebar);

  function updateSidebar () {
    if (scrolling) return;
    var doc = document.documentElement;
    var top = doc && doc.scrollTop || document.body.scrollTop;
    var last;
    for (var i = 0; i < allLinks.length; i++) {
      var link = allLinks[i];
      if (link.offsetTop - 120 > top) {
        if (!last) last = link;
        break
      } else {
        last = link;
      }
    }
    if (last) {
      setActive(last);
    }
  }

  function setActive (link) {
    var previousActive = document.querySelector('.sub-menu .active');

    var hash = link.hash;
    if (!hash) {
      if (link.parentNode.tagName === 'A') {
        hash = link.parentNode.hash;
      } else {
        hash = link.getElementsByTagName('a')[0].hash;
      }
    }
    var id = hash.slice(1);
    var currentActive = document.querySelector('.sub-menu a[href="#' + id + '"]');
    if (currentActive !== previousActive) {
      if (previousActive) previousActive.classList.remove('active');
      currentActive.classList.add('active');
    }
  }


  // scroll sidebar page link into view on page load (except for the top link)
  var atRoot = location.pathname === '/' || location.pathname === '/index.html';
  if (!atRoot || location.hash !== '') {
    try{
      // hexo rewrites the URLs to be relative, so the current page has href="".
      document.querySelector('.item-toc a[href=""]').scrollIntoView();
    }catch(err) {
      console.warn(err);
    }
  }

  // version select
  var currentVersion = location.pathname.match(/^\/(v\d[^\/]+)/);
  ;[].forEach.call(document.querySelectorAll('.version-select'), function (select) {
    if (currentVersion) {
      [].some.call(select.options, function (o) {
        if (o.value === currentVersion[1]) {
          o.selected = true;
          return true;
        }
      })
    }
    select.addEventListener('change', function () {
      var targetPath = '/';
      if (select.selectedIndex !== 0) {
        targetPath = '/' + select.value + '/';
      }
      location.assign(targetPath);
    })
  });

  // fastclick to remove click delay in mobile browsers
  if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
      FastClick.attach(document.body);
    }, false);
  }

  // mobile
  document.querySelector('.js-sidebar-toggle')
    .addEventListener('click', function () {
      document.body.classList.toggle('sidebar-visible')
    });

  document.querySelector('.content')
    .addEventListener('click', function() {
      document.body.classList.remove('sidebar-visible')
    })
})({
  selectors: ['h2']
});


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

//
//
// SEARCH with lunr
//
// -------------------------------------------
const searcher = __webpack_require__(3);

const $searchInput = $('#search-input');
const $searchResults = $('#search-results');
const $pageContent = $('#page-content');

load($searchInput.data('url'))
  .then(function (data) {
    const search = searcher({
      index: data.index,
      store: data.store
    });
    $searchInput.on('keyup', onKeyUp({
      search,
      $el: {
        input: $searchInput,
        page: $pageContent,
        results: $searchResults
      }
    }));
  });

function load(url) {
  return fetch(url || '/lunr.json', {
    credentials: 'include'
  })
  .then(function (res) {
    return res.json()
  })
  .then(function(json) {
    var index = lunr.Index.load(json.index);
    var store = json.store;
    return { index: index, store: store}
  });
}

function onKeyUp(options) {

  return function () {
    const query = $(this).val().trim();

    if(!query) {
      options.$el.page.show();
      options.$el.results.hide(); return;
    }

    const results = options.search(query);
    options.$el.page.hide();
    options.$el.results.show();
    options.$el.results.html(resultsHTML(results));

    options.$el.results.find('.search-result-link').on('click', () => {
      options.$el.page.show();
      options.$el.results.hide();
      options.$el.input.val('');
    });
  }
}

function resultsHTML(results) {
  const resultsHTML  = results.map(resultHTML).join('\n');

  return `<h1>Search Results <small>(${results.length} results)</small></h1>
      ${(results.length ? '<ul>' + resultsHTML + '</ul>' : 'Your search did not match any documents.')}`;
}

function resultHTML(result) {
  return `<li>
    <h4><a href="${result.path}" class="search-result-link">${result.title} <small>(score: ${result.score.toFixed(2)})</small></a></h4>
    <p>${result.body}</a></p>
  </li>`;
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {


const escapeStringRegexp = __webpack_require__(4);

module.exports = function searcher({index, store}) {
  return function search(query) {
    var matches = index.search(query + '*');
    return matches.reduce((results, match) => {
      // transform search match entries into actual results
      // by reconnecting them to store entry and enhance with useful properties
      // from search results
      if(store[match.ref]) {
        results.push(Object.assign({}, store[match.ref], {
          ref: match.ref,
          score: match.score,
          matchMetadata: match.matchData.metadata
        }))
      }
      return results;
    }, []).map((result) => {
      // enhance entry with highlight property representing
      // the actual matched tokens and the fields where those where found
      const highlight = Object.keys(result.matchMetadata).map((text) => {
        const fields = Object.keys(result.matchMetadata[text]);
        return { text, fields };
      });
      return Object.assign({}, result, { highlight });

    }).map((entry) => {

      // truncate `body` where "center" is the first matched text to highlight
      if(entry.body && entry.highlight.length) {
        let text = entry.highlight[0].text;
        let firstHighlightIndex = entry.body.indexOf(text);
        entry.body = '...' + entry.body.substring(firstHighlightIndex - 100, firstHighlightIndex + 200) + '...'
      }

      // add highlight markup
      entry.highlight.forEach((h) => {
        h.fields.forEach((f) => {
          if(f === 'body') {
            entry[f] = entry[f].replace(new RegExp(escapeStringRegexp(h.text), 'gi'), `<span class="highlight">${h.text}</span>`);
          }
        });
      });
      return entry
    });
  }
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;

module.exports = function (str) {
	if (typeof str !== 'string') {
		throw new TypeError('Expected a string');
	}

	return str.replace(matchOperatorsRe, '\\$&');
};


/***/ })
/******/ ]);