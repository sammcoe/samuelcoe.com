import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import Layout from "../components/Layout";
import carteIcon from "../img/Carte.png";
import relateIcon from "../img/Relate.png";

export const AppsPageTemplate = ({}) => (
  <div className="content">
    <section className="section section--gradient">
      <div className="container">
        <div className="content">
          <h3 className="has-text-weight-semibold is-size-2">Apps</h3>
          <div className="columns is-multiline">
            <div className="is-parent column is-6">
              <div className="is-child tile box">
                <div className="columns">
                  <div className="icon-container">
                    <img src={relateIcon} className="app-icon" />
                  </div>
                  <div className="is-parent column">
                    <h1>Relate</h1>
                    <h4>Relationship Assistant</h4>
                    <p>
                      If you feel the desire to be a better friend, daughter, or
                      brother, but feel frustrated at your ability to keep in
                      touch— Relate is for you.
                    </p>
                    <p>
                      Relate helps you remember to reach out to that old
                      childhood friend, to wish your nephew a happy birthday, or
                      to keep building that new friendship.
                    </p>
                    <a className="button custom" href="https://relateios.app">
                      More info →
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="is-parent column is-6">
              <div className="is-child tile box">
                <div className="columns">
                  <div className="icon-container">
                    <img src={carteIcon} className="app-icon" />
                  </div>
                  <div className="is-parent column">
                    <h1>Carte</h1>
                    <h4>Easy Meal Plans</h4>
                    <p>
                      Never struggle with the headache of meal planning again!
                    </p>
                    <p>
                      Carte is a shared meal planning app that lets you save any
                      meals that you eat— or want to eat— and each week a highly
                      personalized, flexible meal plan and grocery list are
                      created for you.
                    </p>
                    <a
                      className="button custom"
                      href="https://apps.apple.com/us/app/carte-easy-meal-plans/id1464478828"
                    >
                      More info →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

AppsPageTemplate.propTypes = {};

const AppsPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <AppsPageTemplate />
    </Layout>
  );
};

AppsPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    })
  })
};

export default AppsPage;

export const workPageQuery = graphql`
  query AppsPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
      }
    }
  }
`;
