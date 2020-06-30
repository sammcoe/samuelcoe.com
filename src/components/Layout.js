import React from "react";
import { Helmet } from "react-helmet";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "./all.sass";
import useSiteMetadata from "./SiteMetadata";
import { withPrefix } from "gatsby";

const TemplateWrapper = ({ children }) => {
  const { title, description } = useSiteMetadata();
  return (
    <div>
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${withPrefix("/")}img/apple-touch-icon.png`}
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix("/")}img/favicon-32x32.png`}
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix("/")}img/favicon-16x16.png`}
          sizes="16x16"
        />

        <link
          rel="mask-icon"
          href={`${withPrefix("/")}img/safari-pinned-tab.svg`}
          color="#ff4400"
        />
        <meta name="theme-color" content="#fff" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:url" content="https://samuelcoe.com" />
        <meta
          property="og:image"
          content={`${withPrefix("/")}img/social-image.png`}
        />
        <meta name="og:image:alt" content="samuelcoe.com website logo"></meta>
        <meta name="og:image:type" content="image/png"></meta>
        <meta name="og:image:width" content="1024"></meta>
        <meta name="og:image:height" content="512"></meta>

        <meta name="twitter:card" content="summary_large_image"></meta>
        <meta name="twitter:creator" content="@thesamcoe"></meta>
        <meta
          name="twitter:image"
          content={`${withPrefix("/")}img/social-image.png`}
        ></meta>
        <meta
          name="twitter:image:alt"
          content="samuelcoe.com website logo"
        ></meta>
      </Helmet>
      <Navbar />
      <div style={{ minHeight: "calc(100vh - 200px)" }}>{children}</div>
      <Footer />
    </div>
  );
};

export default TemplateWrapper;
