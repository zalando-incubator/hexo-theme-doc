'use strict';

const Hexo = require('hexo');
const tests = require('../tests');
const Nightwatch = require('./Nightwatch');


const hexo = new Hexo(process.cwd());

const nightwatch = new Nightwatch(tests, hexo);

module.exports = nightwatch.exports();
