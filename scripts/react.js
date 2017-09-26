'use strict';

/* global hexo */

require('node-jsx').install();

const React = require('react');
const ReactDOM = require('react-dom/server');
const {Sidebar} = require('../lib/browser/sidebar/index.jsx');
const components = {
  Sidebar
};

/**
 * "Server-side render" a React component
 * @param  {String} componentName - The componentName
 * @param  {Object} [props={}] - injected props
 * @return {string}
 */
function reactComponent (componentName, props = {}) {
  const Component = components[componentName];
  const componentFactory = React.createFactory(Component);
  return ReactDOM.renderToString(componentFactory(props));
}

hexo.extend.helper.register('react_component', reactComponent);
