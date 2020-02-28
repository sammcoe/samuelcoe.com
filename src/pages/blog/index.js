import React from "react";

import Layout from "../../components/Layout";
import BlogRoll from "../../components/BlogRoll";
import "../../styles/synthwave-prism.css";

export default class BlogIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <section className="section">
          <div className="container">
            <div className="content">
              <h3 className="has-text-weight-semibold is-size-2">All posts</h3>
              <BlogRoll />
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}
