---
title: Static Comments in Nuxt using Staticman
description: An important part of incorporating content delivery into your site is a system for readers to leave their comments.  If you're using a static site generator such as Nuxt, you may think your only option is to use something such as Disqus-- but that's not so.
created: 2018-03-02T06:00:00.000Z
badge: JS
color: F7DF1E
---

If you're like me, then chances are you ended up on this page because you want to implement a commenting system on your static generate website without handing over all the control and data to a third-party service.  The very idea of a static generated site mean that once your site is generated, you can basically pick it up and deploy on any hosting service.  Using a third-party service for commenting (such as Disqus) creates a rift between your site content and the discussion revolving around that content.

I got to thinking about this after reading an [article](https://davidwalsh.name/introduction-static-site-generators) by [Eduardo Boucas](https://eduardoboucas.com/) on David Walsh's blog.  He links a post on his own website that details his exploration into integrating commenting into a Jekyll static site hosted on Github Pages.

Turns out that he turned it into a project called [Staticman](https://staticman.net/).

From the README: "Staticman is a Node.js application that receives user-generated content and uploads it as data files to a GitHub repository. In practice, this allows you to have dynamic content (e.g. blog post comments) as part of a fully static website, as long as your site automatically deploys on every push to GitHub, as seen on GitHub Pages, Netlify and others."

Now, Staticman does more than just commenting, but since I had set up my own static content delivery for blog posts (similar, but different-- I'll cover in another post), I was primarily interested in the commenting.  That being said, it appears that the primary focus of Staticman is on sites created using Jekyll.  After thumbing through the documentation, I decided I could adapt it to my needs.

So, without further ado, here is how I used Staticman to create a commenting system for my Nuxt Vue.js static generated site:

## Setup and Configuration of Staticman
I recommend a preliminary reading of the [Staticman documentation](https://staticman.net/docs/) to get a feel for what's about to happen.

Staticman gives you two options for using the service: add the official Staticman application as a collaborator on the Github project for your site (easiest, fastest) or clone the Staticman repository and spin up your own Staticman server.

I personally went the easy route for the time being.  For one, I wanted to make sure all of this was going to work out for me.  Two, I don't mind using this proxy to accomplish my purpose because ultimately, the content ends up strictly coupled to my repository, not Staticman.

If you too choose to go this route, then it's as simple as adding "staticmanapp" as a collaborator on the repository that houses your site.  No OAuth flow and it only has access to what you want it to.

The next thing you'll need to do is create a configuration file in the root directory of your site.  Staticman will look at this and decide how to behave.

That documentation has an example, but here's what my `staticman.yml` looks like:
``` yml
# Name of the property. You can have multiple properties with completely
# different config blocks for different sections of your site.
# For example, you can have one property to handle comment submission and
# another one to handle posts.
comments:
  # (*) REQUIRED
  #
  # Names of the fields the form is allowed to submit. If a field that is
  # not here is part of the request, an error will be thrown.
  allowedFields: ["name", "email", "url", "message"]

  # (*) REQUIRED
  #
  # Name of the branch being used. Must match the one sent in the URL of the
  # request.
  branch: "master"

  # Text to use as the commit message or pull request title. Accepts placeholders.
  commitMessage: "Added comment to {options.slug}"

  # (*) REQUIRED
  #
  # Destination path (filename) for the data files. Accepts placeholders.
  filename: "entry{@timestamp}"

  # The format of the generated data files. Accepted values are "json", "yaml"
  # or "frontmatter"
  format: "yaml"

  # List of fields to be populated automatically by Staticman and included in
  # the data file. Keys are the name of the field. The value can be an object
  # with a `type` property, which configures the generated field, or any value
  # to be used directly (e.g. a string, number or array)
  generatedFields:
    date:
      type: date
      options:
        format: "iso8601"

  # Whether entries need to be appproved before they are published to the main
  # branch. If set to `true`, a pull request will be created for your approval.
  # Otherwise, entries will be published to the main branch automatically.
  moderation: true

  # Name of the site. Used in notification emails.
  name: "samuelcoe.com"

  # Notification settings. When enabled, users can choose to receive notifications
  # via email when someone adds a reply or a new comment. This requires an account
  # with Mailgun, which you can get for free at http://mailgun.com.
  #notifications:
    # Enable notifications
    #enabled: true

    # (!) ENCRYPTED
    #
    # Mailgun API key
    #apiKey: "1q2w3e4r"

    # (!) ENCRYPTED
    #
    # Mailgun domain (encrypted)
    #domain: "4r3e2w1q"

  # (*) REQUIRED
  #
  # Destination path (directory) for the data files. Accepts placeholders.
  path: "pages/blog/comments/{options.slug}"

  # Names of required fields. If any of these isn't in the request or is empty,
  # an error will be thrown.
  requiredFields: ["name", "email", "message"]

  # List of transformations to apply to any of the fields supplied. Keys are
  # the name of the field and values are possible transformation types.
  transforms:
    email: md5
```

Setting up static man is really just as easy as that.  It's a very straightforward service.  Once you have created your config file, you can POST form data to 'https://api.staticman.net/v2/entry/{GITHUB USERNAME}/{GITHUB REPOSITORY}/{BRANCH}/{PROPERTY (optional)}' where `GITHUB USERNAME` is the owner or your site's repository, `GITHUB RESPOSITORY` is the name of the repository, `BRANCH` is the branch you want the comments merged into, and `PROPERTY` corresponds to the static content you're updating (note the `comments` property that all my configuration is under in `staticman.yml`-- I would use 'comments' as my property here to access that configuration).

## Sending Comments to Staticman
I mentioned the URL that you can use to POST your comment data to Staticman, but you will need to set up a form to send the specific data that Staticman is looking for.

From the docs:
"All fields should be nested under a fields array. Optionally, a options array can be used to pass along additional information, such as the title of a post.

You can specify a redirect URL in a options[redirect] field. When the form is submitted, users will be redirected to this URL automatically."

and here's the example on the Staticman site:
``` html
<form method="POST" action="https://api.staticman.net/v2/entry/eduardoboucas/staticman/gh-pages/comments">
  <input name="options[redirect]" type="hidden" value="https://my-site.com">
  <!-- e.g. "2016-01-02-this-is-a-post" -->
  <input name="options[slug]" type="hidden" value="{{ page.slug }}">
  <label><input name="fields[name]" type="text">Name</label>
  <label><input name="fields[email]" type="email">E-mail</label>
  <label><textarea name="fields[message]"></textarea>Message</label>
  
  <button type="submit">Go!</button>
</form>
```

This likely isn't the route you want to take if you're using Vue, but it's still perfectly viable.  I took a different route.

I created a new `Comments` Vue component and added this form to it:
``` html
<form @submit.prevent="'onSubmit'">
      <div class="field">
        <p class="control has-icons-left has-icons-right">
          <input
            v-model="comment.name"
            class="input"
            type="text"
            placeholder="Name">
          <span class="icon is-small is-left">
            <fa :icon="['fas', 'user']"/>
          </span>
        </p>
      </div>
      <div class="field">
        <p class="control has-icons-left has-icons-right">
          <input
            v-model="comment.email"
            class="input"
            type="email"
            placeholder="Email">
          <span class="icon is-small is-left">
            <fa :icon="['fas', 'envelope']"/>
          </span>
        </p>
      </div>
      <div class="field">
        <div class="control">
          <textarea
            v-model="comment.message"
            class="textarea"
            placeholder="Comment"/>
        </div>
      </div>
      <div class="control">
        <button
          :class="['button', 'is-link', { 'is-loading': loading }]"
          @click="submitComment()">Submit</button>
      </div>
    </form>
```
Functionally, there isn't much going on here.  Most of this is style and spice-- so, things to note:

1. `<form @submit.prevent="'onSubmit'">` - Vue gives us some nice options for hijacking events.  I want to handle the submission to Staticman, not through the form, but on my own terms in a component method.  This allows me to stop the redirection of the page and instead check the status of the request and display a notification to the user without any reload.

2. Notice the input model bindings `comment.name`, `comment.email`, `comment.message` these are capturing our input as Vue data elements.

3. The Submit button `@click="submitComment()"` -- `submitComment` is the function in my component that will gather and submit the form.

And now, here's the `submitComment()` function that's doing the work, using my own site again as an example:
``` js
submitComment() {
      // Set a component data value for 'loading' to true, to be used in the UI
      this.loading = true
  	  // Axios supports the 'URLSearchParams' method for sending 'application/www-x-form-urlencoded' data
      let formData = new URLSearchParams();
  
      /* 'slug' is passed into the component as a prop.  Since the comments will
      	  be viewed through a post, the post is passing in its own url slug--
          something like 'my-new-post' or 'how-to-do-something'
      */
      formData.append('options[slug]', this.slug);
  
      // From our form input bindings
      formData.append('fields[name]', this.comment.name);
      formData.append('fields[email]', this.comment.email);
      formData.append('fields[message]', this.comment.message);
	  
      // You will need to import axios for this-- or use your preferred library
      axios.post('https://api.staticman.net/v2/entry/sammcoe/samuelcoe.com/master/comments', formData).then((response) => {
        this.loading = false;
      }).catch((err) => {
        console.log(err);
        this.loading = false;
      })
    }
```

Having added this form and function to a Vue component template, you should now be able to render it on your page, throw some test info in, and send it off to your site.

You will notice, if you used the `moderation: true` option in your config, that your repository has now received a pull request for a new yaml (or the format you've specified in the config) file containing the comment info you just submitted.  You can either close this out and delete the fork to be rid of the comment, or merge the pull request to allow it on through into your repository.

Pretty slick, right? Sure is-- now onto the fun part: baking these comments into your static site during generation.

## Using the Comments
