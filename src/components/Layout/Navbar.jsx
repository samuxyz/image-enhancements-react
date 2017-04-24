import React from 'react';

const Navbar = () => (
  <nav className="navbar navbar-inverse navbar-fixed-top">
    <div className="container">
      <div className="navbar-header">
        <button
          type="button"
          className="navbar-toggle collapsed"
        >
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar" />
          <span className="icon-bar" />
          <span className="icon-bar" />
        </button>
        <a className="navbar-brand" href="#">Filestack | <span className="second-title">Enhancements</span></a>
      </div>
      <div id="navbar" className="navbar-collapse collapse">
        <ul className="nav navbar-nav navbar-right">
          <li><a href="/">Home</a></li>
          <li>
            <a
              href="https://blog.filestack.com/"
              target="_blank"
            >
              Blog
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Navbar;
