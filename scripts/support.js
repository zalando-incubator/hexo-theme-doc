'use strict';

/* global hexo */

const {filter} = require('../lib/nodejs/support');

hexo.extend.filter.register('template_locals', filter);
