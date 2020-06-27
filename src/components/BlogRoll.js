import React from "react";
import PropTypes from "prop-types";
import { Link, graphql, StaticQuery } from "gatsby";
import PreviewCompatibleImage from "./PreviewCompatibleImage";

class BlogRoll extends React.Component {
  render() {
    const { data, maxPosts } = this.props;
    const { edges: posts } = data.allMarkdownRemark;

    return (
      <div className="columns is-multiline">
        {posts &&
          posts.map(({ node: post }, idx) => {
            if (!maxPosts || idx < maxPosts) {
              return (
                <div className="is-parent column is-6" key={post.id}>
                  <article
                    className={`blog-list-item tile is-child box notification ${
                      post.frontmatter.featuredpost ? "is-featured" : ""
                    }`}
                  >
                    <header>
                      {/* {post.frontmatter.featuredimage ? (
                        <div className="featured-thumbnail">
                          <PreviewCompatibleImage
                            imageInfo={{
                              image: post.frontmatter.featuredimage,
                              alt: `featured image thumbnail for post ${post.frontmatter.title}`
                            }}
                          />
                        </div>
                      ) : null} */}
                      <p className="post-meta">
                        <Link
                          className="title has-text-primary is-size-4"
                          to={post.fields.slug}
                        >
                          {post.frontmatter.title}
                        </Link>
                        <span> &bull; </span>
                        <div className="content-tags">
                          {post.frontmatter.tags.map(tag => {
                            switch (tag) {
                              case "javascript":
                                return (
                                  <span className="content-tag javascript">
                                    {tag}
                                  </span>
                                );
                              case "swift":
                                return (
                                  <span className="content-tag swift">
                                    {tag}
                                  </span>
                                );
                              default:
                                return (
                                  <span className="content-tag">{tag}</span>
                                );
                            }
                          })}
                        </div>
                        <span className="subtitle is-size-5 is-block">
                          {post.frontmatter.date}
                        </span>
                      </p>
                    </header>
                    <p>
                      {post.excerpt}
                      <br />
                      <br />
                      <Link className="button custom" to={post.fields.slug}>
                        Keep Reading →
                      </Link>
                    </p>
                  </article>
                </div>
              );
            }
          })}
      </div>
    );
  }
}

BlogRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array
    })
  }),
  maxPosts: PropTypes.number
};

export default ({ maxPosts }) => (
  <StaticQuery
    query={graphql`
      query BlogRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                date(formatString: "MMMM DD, YYYY")
                tags
                featuredpost
              }
            }
          }
        }
      }
    `}
    render={data => <BlogRoll data={data} maxPosts={maxPosts} />}
  />
);
