'use strict';

/* global hexo */

require('babel-register')({
  'presets': ['react', 'es2015'],
  extensions: ['.jsx']
});

const React = require('react');
const ReactDOM = require('react-dom/server');
const {Navigation} = require('../lib/browser/navigation/containers.jsx');
const components = {
  Navigation
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
