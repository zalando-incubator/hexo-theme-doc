const React = require('react');


function Navbar (props) {
  return (
    <nav className="navbar">
      {props.children}
    </nav>
  );
}

function Logo ({url_for, navigation}) {
  return (
    <a href={url_for(navigation.logo.path)} className="navbar__logo">
      <img src={url_for('images/logo.png')} className="navbar__logo__img"/>
      <span className="navbar__logo__text">{navigation.logo.text}</span>
    </a>
  );
}

module.exports = {Navbar, Logo};
