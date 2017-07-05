#!/usr/bin/env node
'use strict';

const crawl = require('../index');
const args = process.argv.slice(2);
const url = args[0];

const finalHandler = ({succeded, errored}) => {
  const exitCode = errored.length > 0 ? 1 : 0;
  console.log(`results - (${exitCode > 0 ? 'FAILURE' : 'SUCCESS'}) succeded: ${succeded.length}, errored: ${errored.length}`); // eslint-disable-line no-console
  process.exit(exitCode);
};

const options = { url: url };

if (!options.url) {
  throw new Error('you should provide the starting url as the first argument');
}

crawl(options).then(finalHandler).catch(finalHandler);
