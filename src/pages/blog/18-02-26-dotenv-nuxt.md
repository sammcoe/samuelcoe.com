---
templateKey: blog-post
title: Using dotenv with Nuxt
date: 2018-02-26T14:44:00.000Z
featuredpost: false
description: A quick and straightforward explanation of using dotenv to handle development environment variables while honoring production environments.
tags:
  - javascript
  - web development
  - nuxt
---

If you're using Nuxt to create a static generated site to serve up dynamic content-- such as a blog-- the chances are that you're going to be looking for an engine to handle markdown documents.

If this situation applies to you, then the chances are also that you will be including code snippets in your writing. If you're including code snippets, then syntax highlighting is a must have.

Now, there is a package out there called Markdown-It for handling the markdown rendering; there is also a package called Highlight.js for handling the syntax highlighting. I'll be using these two packages for my explanation.

These two packages could be wired up to your Nuxt application manually, but someone has already done the majority of the work for us in the form of a Nuxt plugin _and_ and a Highlight.js plugin for Markdown-It.
A quick search of the Googles for using `dotenv` with Nuxt will almost certainly lead you to the Nuxt community module called `nuxt-community`.
The problem with this is that it unnecessarily complicates something that's already easy AND will cause problems for you should you be deploying to a production environment where the environment variables are already set-- which they should be.

Maybe you already chose to go this route and you're looking for a little help because your production build is failing. Let me save you a few minutes.

## 1. Install dotenv

```bash
npm i --save-dev dotenv
```

## 2. Prepend to Your nuxt.config.js

At the top of your nuxt.config.js file, just add this simple line of code:

```js
if (process.env.NODE_ENV !== "production") require("dotenv").config();
```

This checks the environment before requiring the dotenv package, because **most** of the time, dotenv shouldn't be used in production and having this present unless you explcitly plan for doing so will cause your build to fail.

Note: This line goes _before_ your normal config, so your nuxt.config.js will look like so:

```js
if (process.env.NODE_ENV !== "production") require("dotenv").config();

module.exports = {
  // Nuxt config
};
```

## 3. Add the .env File to the Root of Your Project

Create a file named `.env` in the root directory of your project and add your environment variables in this manner:

```bash
VARIABLE_NAME=value
```

## 4. Add Environment Variable to nuxt.config.js

Now that you have your environment variables established in, well, the environment, you will need to tell Nuxt to use them.

Add an `env` config to your nuxt.config.js like so:

```js
module.exports = {
  env: {
    variable: process.env.VARIABLE_NAME
  }
  // More config
};
```

This will register your environment variable to the Nuxt context and will also tell Webpack to replace occurances of the variable `variable` with your environment variable value. For more information, read about the env property on the Nuxt (offical websie)[https://nuxtjs.org/api/configuration-env].

## 5. Use the Variable

Referencing the environment variable is now easy. For example, in a Vue component:

```js
export default {
  data: () => ({
    someVar: process.env.variable
  })
};
```

Note that you will need to reference `process.env.variable` in this example, rather than `process.env.VARIABLE_NAME`.

That's it! You can now add and use all the environment variable you need and seemlessly move between environments.
