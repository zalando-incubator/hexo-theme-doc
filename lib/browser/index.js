const React = require('react');
const ReactDOM = require('react-dom');
const {Navigation} = require('./navigation/containers.jsx');

ReactDOM.render(
  React.createFactory(Navigation)(
    Object.assign({}, window.__INITIAL_STATE__, {log: console})
  ),
  document.getElementById('react-navigation-root')
);
