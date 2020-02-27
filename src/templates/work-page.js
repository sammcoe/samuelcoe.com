import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";

export const WorkPageTemplate = ({}) => (
  <div className="content">
    <section className="section section--gradient">
      <div className="container">
        <div className="section has-text-centered">
          <h1>Under Construction</h1>
          <h2>
            Check out <a href="https://cartemeals.com">Carte Meal Plans</a>
          </h2>
        </div>
      </div>
    </section>
  </div>
);

WorkPageTemplate.propTypes = {};

const WorkPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <WorkPageTemplate />
    </Layout>
  );
};

WorkPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    })
  })
};

export default WorkPage;

export const workPageQuery = graphql`
  query WorkPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
      }
    }
  }
`;
