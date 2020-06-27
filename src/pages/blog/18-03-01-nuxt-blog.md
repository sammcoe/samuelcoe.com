---
templateKey: blog-post
title: Creating a System for Content Delivery (Blog) Using Nuxt
date: 2018-03-01T06:00:00.000Z
featuredpost: false
description: The good news is that it is possible to put together a quick and easy system for adding content to your static generated Nuxt site.  The great news is that it's recommended-- for a number of reasons.
tags:
  - javascript
  - nuxt
---

So, you find yourself building a static generated website powered by Nuxt and in the process decide that you want be able to quickly and easily create new content, such as a blog post or an article. Is that really feasible? You start considering alternatives to tack onto your static site.

Or maybe you were aware that you wanted to serve up loads of content on the fly from the beginning and had some ideas for handling it.

The good news is that it is possible to put together a quick and easy system for adding content to your static generated Nuxt site. The great news is that it's recommended-- for a number of reasons-- one of which being that your entire website will reside in one clean bundle that can be deployed from **any** static hosting site.

There are several good articles out there on the topic and you probably didn't make it here looking for all that info, so let's move on to the _how_.

Before I get too far into this, let me just say that what you're reading right now is the end product of this process. If you're the squirrely or confident type and want to jump straight off the cliff-- check out the repository on my Github profile, it's all public.

## The Beginnings -- Where Does Stuff Go?

Let's start with finding a nice home in your project for all this great content to live.

Go ahead and create a subdirectory of your `pages` directory called `blog`-- or whatever else you want to call it. `stuff-i-want-to-share` or `things-to-fill-my-site` or... `stuff`. You get it. I went with `blog` so follow with me.

Right now, your blog directory is going to house two things:

1. A template for your blog post or article... or stuff.
2. Your blog posts or articles-- or stuff.

## Project Overview

Let me go ahead and fill you in on everything you're going to need to create or update. You can prepare yourself.

- /pages/blog
  - \_post.vue
  - my-first-post.md
- /store
  - index.js
  - posts.js
- nuxt.config.js

It's really not that hard and thankfully for you, I've already worked through a lot of kinks. Let's get started at the bottom.

## The Content

### pages/blog/my-first-post.md

It makes sense to first create some content that you want to serve up-- whether it's something real or just a test.

You're going to be using `front-matter` for picking metadata out of the post and `markdownit` for parsing the markdown file.
What that means is that all of your posts will have a format that contains two things:

1. Valid yml that feeds metadata into frontmatter. This will be things such as the title, description, and date.
2. Valid markdown that comprises the meat of your post.

For example:

```md
---
title: The Title of Your Post
description: A new post.
created: 2018-03-01T06:00:00.000Z
---

# This is a header

This is the content of my post.
It's valid markdown-- use any markdown functionality.
```

I wrote a post on using `markdownit` in this very situation, along with `highlight.js`, so I won't go into the detail here. If you're unsure-- check out [the article.](https://samuelcoe.com/blog/nuxt-markdownit-highlight). You will want to get that set up as a corrolary to this.

Now that you have some content, let us move on to the template that it will be fitting into.

### pages/blog/\_post.vue

This file is a simple vue component that each of your markdown files will programmatically be plugged into for rendering. It can be as simple or complex as you want, but for now, lets make it fairly straightforward.

Here's a very, very basic Vue template:

```html
<template>
  <!-- The post 'title' attribute directly from the md file -->
  <h1>{{ post.attributes.title }}</h1>
  <!-- This is the 'created' date with some formatting done on it in the following script -->
  <h2>{{ createdAt }}</h2>
  <!-- The body of the post rendered using 'markdownit' -->
  <div v-html="$md.render(post.body)" />
</template>
```

and the script:

```js
import { format } from "date-fns";
// This makes accessing Vuex store value much easier in the component
import { mapMutations } from "vuex";

export default {
  // fetch is a special Nuxt method that is called every time before
  // loading the component (only for page components). It can be called
  // from the server-side or before navigating to the corresponding route.
  fetch({ store, params }) {
    // This dispatches a Vuex mutation which loads the requested post into
    // the application state
    store.dispatch("posts/loadPost", params.post);
  },
  // Here, we're setting the browser page title
  head() {
    return {
      title: this.postTitle
    };
  },
  computed: {
    post() {
      // Retrieving the current post from the Vuex store
      return this.$store.state.posts.post;
    },
    createdAt() {
      // Formatting the date
      return format(new Date(this.post.attributes.created), "MMMM Do[,] YYYY");
    },
    postTitle() {
      if (this.post) {
        // Adding some standard verbage to the specific post title
        return `Your Blog :: ${this.post.attributes.title}`;
      }
    }
  }
};
```

That's pretty straight-forward, right? We're using the attributes from the markdown to populate the component. How though?
Notice the `fetch()` function and the computed `post` property. This is where Vuex, the state management tool for Vue comes into play. It's included with Nuxt, so if you aren't already using it in your application, there's virtually no setup required.

We have our content built out, so let's look at configuring Vuex to manage it.

## Vuex

You've made some small preparations for what you're about to do in your post template and it's time to wire them up.

### Preparation

Lets install a couple things first:

`npm i --save front-matter slugify`

### store/index.js

If you aren't already using Vuex, you will need to create `index.js` inside the `store` directory.

This is going to do a lot of heavy lifting. It's responsible for taking a look into your new `blog` directory and loading the posts files into the application state.

```js
// For parsing the post metadata
import fm from "front-matter";
// For creting the post url slug
import slugify from "slugify";

export const actions = {
  // Useful when we have some data on the server we want to give directly to the client-side.
  nuxtServerInit() {
    if (process.server) {
      // We'll use Node fs to read the files
      const fs = require("fs");
      // Get all the markdown files in the blog directory
      const files = fs
        .readdirSync("pages/blog")
        .filter(file => file.includes(".md"));

      // For each of the post files...
      const posts = files.map(file => {
        // Parse with front matter
        let post = fm(fs.readFileSync(`pages/blog/${file}`, "utf8"));
        // Give it a filename property
        post.filename = file;
        // Give it a created property
        post.created = new Date(fs.statSync(`pages/blog/${file}`).ctime);
        // Give it a slug property based off the file name
        post.slug = slugify(file.replace(/\.md$/, ""), { lower: true });
        // Give it an endpoint URL
        post.url = `/blog/${post.slug}`;

        return post;
      });
      // This actually loads the posts into the Vuex store, which will be covered next
      this.dispatch("posts/loadPosts", posts);
    }
  }
};
```

There are two options for using Vuex with Nuxt: Classic mode where `store/index.js` returns a store instance, or Module mode where every `.js` file in `store` is transformed into a namespaced module. You can read more about it in the [Nuxt documentation](https://nuxtjs.org/guide/vuex-store/).

I chose to use the module mode and I think there's very little reason not to unless you know your application isn't going to grow in complexity and don't want to do deal with it. The modules really help seperate individual components of the store when things get complicated.

That said, if you do choose the module method as I did, you will need one more store file.

### store/posts.js

Here you will see the `loadPosts` action that we're dispatching from `index.js` as well as some other functions to manage the state of the list of posts and the currently rendered post.

```js
// This is the state-- where all the post data will live in the application
export const state = () => ({
  // All the posts
  posts: [],
  // Currently selected post for rendering
  post: {}
});

export const mutations = {
  // Adds a post to the list
  add(state, name) {
    state.posts.push({
      name: name
    });
  },
  // Replaces the current list of posts with a new list
  updatePosts(state, posts) {
    state.posts = posts;
  },
  // Replace the currently selected post
  updatePost(state, post) {
    state.post = post;
  }
};

export const actions = {
  // This just sorts the posts based on creation date and calls the 'updatePosts'
  // mutation to replace the current list
  loadPosts({ commit }, posts) {
    const sorted = posts.sort((a, b) => {
      if (a === b) {
        return 0;
      }
      return a.attributes.created < b.attributes.created ? 1 : -1;
    });
    commit("updatePosts", sorted);
  },
  // This is an action used to find a post in the list of posts that
  // matches the url slug that was navigated to
  loadPost({ commit }, slug) {
    const post = this.state.posts.posts.find(post => {
      return post.slug === slug;
    });
    commit("updatePost", post);
  }
};
```

That's just about everything. We have content to display, a way to display it, and a way to keep track of its data.
There one more thing we need to do.

## Nuxt Config

An update needs to be made to your `nuxt.config.js` file, because there's currently no way to actually navigate to these posts; we need to tell Nuxt what routes to generate.

Add this bad boy to your `nuxt.config.js` `module.exports`:

```js
// Generate routes based of top-level file names for blog posts
  generate: {
    routes: function () {
      return require('fs').readdirSync('pages/blog').map(function (file) {
        return '/blog/' + require('slugify')(file.replace(/\.md$/, ''));
      });
    }
  }
```

This makes use of Nuxt's route generation while also mimicking the logic we used in the store for generating unique route URL's with their slugs.

### That's it!

Assuming you've gone through the steps mentioned here (and have markdownit configured) you will now be able to create new markdown files in your blog directory to quickly add new content to your site.

I have already begun work on a post detailing adding a static commenting system to these posts, so stick around for that!
