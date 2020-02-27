import React from "react";

import twitter from "../img/social/twitter.svg";
import github from "../img/github-icon.svg";

const Footer = class extends React.Component {
  render() {
    return (
      <footer className="footer">
        <div className="content has-text-centered">
          <div className="container">
            <div className="columns">
              <div className="column is-4">
                <section>
                  <h1>samuelcoe.com</h1>
                </section>
              </div>
              <div className="column is-4">
                <section className="attribution">
                  &copy; 2012 - {new Date().getFullYear()} | Samuel Coe | All
                  Rights Reserved
                </section>
              </div>
              <div className="column is-4 social">
                <a
                  title="github"
                  href="https://github.com/sammcoe"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    className="fas fa-lg"
                    src={github}
                    alt="Github"
                    style={{ width: "1em", height: "1em" }}
                  />
                </a>
                <a
                  title="twitter"
                  href="https://twitter.com/thesamcoe"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    className="fas fa-lg"
                    src={twitter}
                    alt="Twitter"
                    style={{ width: "1em", height: "1em" }}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
};

export default Footer;
