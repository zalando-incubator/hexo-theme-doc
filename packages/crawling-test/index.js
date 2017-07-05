'use strict';

const Crawler = require('js-crawler');

const crawl = (options) => {
  const crawler = new Crawler().configure({
    shouldCrawl: function (url) {
      // just "internal" urls
      return url.indexOf(options.url) > -1;
    }
  });

  return new Promise((resolve, reject) => {
    const errored = [];
    const succeded = [];
    crawler.crawl({
      url: options.url,
      success: function (page) {
        console.log(`success - url: ${page.url}, referer: ${page.referer}, status code: ${page.status}`);  // eslint-disable-line no-console

        succeded.push(page);
      },
      failure: function (page) {
        console.error(`failure - broken url: ${page.url}, referer: ${page.referer || 'undefined'}, status code: ${page.status || 'undefined'}`); // eslint-disable-line no-console

        if (page.url === options.url) {
          console.error(`failure - failed on starting url: Are you sure that the site is running at "${options.url}"?`); // eslint-disable-line no-console

        }
        errored.push(page);
      },
      finished: function () {
        if (errored.length > 0) { return reject({succeded, errored}); }
        return resolve({succeded, errored});
      }
    });
  });
};

module.exports = crawl;
