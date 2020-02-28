import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";

import Layout from "../components/Layout";
import BlogRoll from "../components/BlogRoll";

export const IndexPageTemplate = () => (
  <div>
    <section className="section section--gradient">
      <div className="container">
        <div className="content">
          <h3 className="has-text-weight-semibold is-size-2">Latest posts</h3>
          <BlogRoll maxPosts={4} />
          <div className="column is-12 has-text-centered">
            <Link className="btn" to="/blog">
              Read more
            </Link>
          </div>
        </div>
      </div>
    </section>
  </div>
);

IndexPageTemplate.propTypes = {
  title: PropTypes.string
};

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <IndexPageTemplate title={frontmatter.title} />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    })
  })
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
      }
    }
  }
`;
