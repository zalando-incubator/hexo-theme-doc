const React = require('react');
const ReactDOM = require('react-dom');
const {Navigation} = require('./navigation/navigation.jsx');

ReactDOM.render(
  React.createFactory(Navigation)(window.__INITIAL_STATE__),
  document.getElementById('react-navigation-root')
);
