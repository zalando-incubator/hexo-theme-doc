const React = require('react');
const ReactDOM = require('react-dom');
const {Sidebar} = require('./sidebar/index.jsx');

require('./search/index');

ReactDOM.render(
  React.createFactory(Sidebar)(),
  document.getElementById('react-sidebar-root')
);
