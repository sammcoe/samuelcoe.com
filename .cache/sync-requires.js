const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---src-templates-product-page-js": hot(preferDefault(require("/Users/samuel.coe/Git/samuelcoe.com/src/templates/product-page.js"))),
  "component---src-templates-about-page-js": hot(preferDefault(require("/Users/samuel.coe/Git/samuelcoe.com/src/templates/about-page.js"))),
  "component---src-templates-blog-post-js": hot(preferDefault(require("/Users/samuel.coe/Git/samuelcoe.com/src/templates/blog-post.js"))),
  "component---src-templates-index-page-js": hot(preferDefault(require("/Users/samuel.coe/Git/samuelcoe.com/src/templates/index-page.js"))),
  "component---src-templates-tags-js": hot(preferDefault(require("/Users/samuel.coe/Git/samuelcoe.com/src/templates/tags.js"))),
  "component---cache-dev-404-page-js": hot(preferDefault(require("/Users/samuel.coe/Git/samuelcoe.com/.cache/dev-404-page.js"))),
  "component---src-pages-404-js": hot(preferDefault(require("/Users/samuel.coe/Git/samuelcoe.com/src/pages/404.js"))),
  "component---src-pages-blog-index-js": hot(preferDefault(require("/Users/samuel.coe/Git/samuelcoe.com/src/pages/blog/index.js"))),
  "component---src-pages-contact-examples-js": hot(preferDefault(require("/Users/samuel.coe/Git/samuelcoe.com/src/pages/contact/examples.js"))),
  "component---src-pages-contact-file-upload-js": hot(preferDefault(require("/Users/samuel.coe/Git/samuelcoe.com/src/pages/contact/file-upload.js"))),
  "component---src-pages-contact-index-js": hot(preferDefault(require("/Users/samuel.coe/Git/samuelcoe.com/src/pages/contact/index.js"))),
  "component---src-pages-contact-thanks-js": hot(preferDefault(require("/Users/samuel.coe/Git/samuelcoe.com/src/pages/contact/thanks.js"))),
  "component---src-pages-tags-index-js": hot(preferDefault(require("/Users/samuel.coe/Git/samuelcoe.com/src/pages/tags/index.js")))
}

