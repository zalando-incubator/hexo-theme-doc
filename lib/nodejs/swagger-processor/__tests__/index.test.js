'use strict';

const path = require('path');

// NOTE: consolidate autoload "installed template engines",
// but it doesn't work while running test suites with jest,
// so we should load them manually
const consolidate = require('consolidate');
consolidate.requires.ejs = require('ejs');

describe('swagger-processor', () => {
  const swaggerToMd = require('../index');

  it('shouldn\'t emit any error', (done) => {
    const data = [];
    swaggerToMd(path.resolve(__dirname, './_petstore.yaml'))
      .on('error', (err) => {
        expect(err).toBeUndefined();
        done(err);
      })
      .on('data', (chunk) => {
        data.push(chunk);
      }) // the stream will never fire "end" event if nobody is consuming it, that's why we consume it
      .on('end', () => {
        expect(data.length > 0).toBe(true);
        done();
      });
  });
});
