---
title: How to Use Markdown-It with Highlight.js in a Nuxt Project
description: If you're using Nuxt to create a static generated site to serve up dynamic content-- such as a blog-- the chances are that you're going to be looking for an engine to handle markdown documents with syntax highlighting.
badge: JS
color: F7DF1E
---

If you're using Nuxt to create a static generated site to serve up dynamic content-- such as a blog-- the chances are that you're going to be looking for an engine to handle markdown documents.

If this situation applies to you, then the chances are also that you will be including code snippets in your writing.  If you're including code snippets, then syntax highlighting is a must have.

Now, there is a package out there called Markdown-It for handling the markdown rendering; there is also a package called Highlight.js for handling the syntax highlighting.  I'll be using these two packages for my explanation.

These two packages could be wired up to your Nuxt application manually, but someone has already done the majority of the work for us in the form of a Nuxt plugin *and* and a Highlight.js plugin for Markdown-It.

## 1. Install the Packages
``` bash
npm i --save @nuxtjs/markdownit
npm i --save markdown-it-highlightjs
```

## 2. Add markdown-it to nuxt.config.js as a Module
Here we simply tell Nuxt to use the markdown-it module in the application.
``` js
module.exports = {
  ...
  modules: [
    '@nuxtjs/markdownit'
  ],
  ...
}
```

## 3. Add Config for markdown-it to nuxt.config.js
Now, we need to tell the markdown-it module how to behave, and that we want it to use the Highlight.js plugin we installed for it.
``` js
module.exports = {
  ...
  modules: [
    '@nuxtjs/markdownit'
  ],
  markdownit: {
    injected: true,
    use: [
      'markdown-it-highlightjs'
    ]
  }
}
```

This should be all that is necessary but there's one big "gotcha' that had me scratching my head.  Apparently the CSS for the actual highlighting theme is ommitted, meaning the HTML code elements get the proper classes, but the classes don't actually do anything.

## 4. Importing the CSS for Your Desired Theme
The last step will be to import the CSS for a theme directly from the `~/node_modules/highlight.js/styles` directory.
Your `nuxt.config.js` will look like this (I used the 'hopscotch' theme ):
``` js
module.exports = {
  ...
  css: [
    { src: '~/node_modules/highlight.js/styles/hopscotch.css', lang: 'css' }
  ],
  modules: [
    '@nuxtjs/markdownit'
  ],
  markdownit: {
    injected: true,
    use: [
      'markdown-it-highlightjs'
    ]
  }
}
```

That's it! Your application is now configured to use markdown-it with code syntax highlighting.  All that's left to do is parse some markdown files.

Please feel free to comment below if you have any thoughts or ideas that I may have missed.