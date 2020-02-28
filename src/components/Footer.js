import React from "react";

import twitter from "../img/social/twitter.svg";
import github from "../img/github-icon.svg";

const Footer = class extends React.Component {
  render() {
    return (
      <footer className="footer">
        <div className="content">
          <div className="container">
            <div className="columns">
              <div className="column is-4 vcenter">
                <h1>samuelcoe.com</h1>
              </div>
              <div className="column is-4 vcenter">
                &copy; 2012 - {new Date().getFullYear()} | Samuel Coe | All
                Rights Reserved
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
};

export default Footer;
