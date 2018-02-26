---
title: Using Font Awesome 5 SVG Icons with Nuxt
description: If you've used Font Awesome with any project in the past, you may be tempted to implement it the same way you're used to.  With Font Awesome 5, there's a better way to do it, and if you're using Nuxt it's a must.
created: 2018-02-23T20:46:00.000Z
badge: JS
color: F7DF1E
---

If you've used Font Awesome with any project in the past, you may be tempted to implement it the same way you're used to.  Whether that's using Web Fonts with CSS or (for other Vue projects) using the Vue component that's featured on the Font Awesome website.

There's a new way to go about using Font Awesome in your projects these days.  With the bump to version 5 of the library, Font Awesome has included new SVG icons that can be implemented very easily in any project, look better at any but the tiniest scale, and lend more versatility to developers.

For those unfamiliar with SVG's (Scalable Vector Graphics), they define vector-based graphic rendering in an XML format.  Once of the greatest benefits of SVG's is that they do **not** lose any quality when they are zoomed or resized.  Additionally, any element or attribute in an SVG is able to be animated.

With the new SVG implementation of Font Awesome, it is now possilbe to use SSR (Server-Side Rendering) to render the icons on the server, saving load-time on the client side.  This is an awesome step forward and makes implementation using Nuxt, which specializes in SSR and static-generated content, better than ever.

Now, the reason SSR is an issue with traditional FA implementation is that  the virtual DOM that's renderd on the server doesn't match the DOM that is rendered on the client.  The reason this occurs is because the `<i/>` tag gets replaced on the client with the actual `<svg/>`, rather than getting pre-build on the server. Thankfully, Font Awesome 5 provides an API to programmatically render the SVG's during SSR.

Onto the good bits.

## 1. Decide Which Style Packs You Want
Another change that came along with Font Awesome 5 is the seperation of different icon styles into individual sets: Font Awesome Brands, Font Awesome Solid, Font Awesome Regular, Font Awesome Light. You can find a good representation of all the the changes [here](https://fontawesome.com/how-to-use/upgrading-from-4).  Make a note of the packages that you want to include in your project.

## 2. Install the Packages
For this example, I'll install Font Awesome with the Solid and Brand packs.
``` bash
npm i --save @fortawesome/fontawesome
npm i --save @fortawesome/fontawesome-free-brands
npm i --save @fortawesome/fontawesome-free-solid
```

## 3. Add the Packages to Your nuxt.config.js
Next, you will need to include the packages you just installed in the `vendor` config portion of your Nuxt config.  This imports them into the project globally and allows them to be used throughout the application without duplicating code.
``` js
module.exports = {
  ...
  build: {
    vendor: [
      '@fortawesome/fontawesome',
      '@fortawesome/fontawesome-free-solid',
      '@fortawesome/fontawesome-free-brands'
    ]
  }
}
```

## 4. Use the Icons
This is where things take a bit of an unfamiliar turn.  I recommend also reading about SSR and FA5 directly from the [Font Awesome website](https://fontawesome.com/how-to-use/server-side-rendering)

You won't be able to use the icons like this without having an error thrown at you in your browser:
``` html
<i class="fab fa-github"/>
<i class="fab fa-twitter"/>
```

Instead, you will need to use the FA API to retrive the SVG HTML for the icon you want to use and inject it into the DOM programmatically.
For example:
``` html
<!-- A simple span tag, using Vue's HTML injection via v-html -->
<span v-html="htmlForYourIcon"/>
```
``` js
import fontawesome from '@fortawesome/fontawesome'
import yourIcon from '@fortawesome/fontawesome-free-solid/yourIcon'

export default {
  data: () => ({
    htmlForYourIcon: fontawesome.icon(yourIcon).html[0];
  })
}
```
You can even take this and expound upon it to dynamically require the icon you want to use and render it with a little more abstraction. Using `fa-twitter` as an example:
``` html
<!-- A simple span tag, using Vue's HTML injection via v-html -->
<span v-html="renderIcon('fab', 'faTwitter'"/>
```
``` js
import fontawesome from '@fortawesome/fontawesome'

export default {
  methods: {
    renderIcon(prefix, icon) {
      if (this.prefix === 'fab') {
        return fontawesome.icon(require(`@fortawesome/fontawesome-free-brands/${this.icon}`)).html[0];
      } else if (this.prefix === 'fas') {
        return fontawesome.icon(require(`@fortawesome/fontawesome-free-solid/${this.icon}`)).html[0];
      } else if (this.prefix === 'far') {
        return fontawesome.icon(require(`@fortawesome/fontawesome-free-regular/${this.icon}`)).html[0];
      }
    }
  }
}
```

I didn't like this at all so, using the ideas I just went over, I created a [Vue plugin called fontawesome-vue](https://github.com/sammcoe/fontawesome-vue) that works nicely with Nuxt--or any Vue application--for doing just this, far more simply.

The problem with this is in how Nuxt bundles with Webpack.  I couldn't get the dynamic importing, which is relatively new functionality, to properly chunk the bundles and instead ended up with the entire icon libraries in my Nuxt vendor bundle.  

I'll easily admit that I don't know enough and couldn't find enough on the subject to even prove to myself that I wanted work through the problem, so that's when I went for the [Nuxt Fontawesome](https://github.com/vaso2/nuxt-fontawesome) module.

## 5. Nuxt Fontawesome
This module requires a little more configuration than I had in mind for the plugin I created, but it gets the job accomplished with a fairly effecient final result.

### Installation
``` bash
npm i nuxt-fontawesome
```

### Configuration
Add the `nuxt-fontawesome` module to your `nuxt.config.js` file as follows:

``` js
{
  modules: [
    'nuxt-fontawesome',
    //OR like this
    ['nuxt-fontawesome', {
      component: 'fa', 
      imports: [
        //import whole set
        {
          set: '@fortawesome/fontawesome-free-solid'
        },
        //import 2 icons from set 
        // please note this is PRO set in this example, 
        // you must have it in your node_modules to actually import
        {
          set: '@fortawesome/fontawesome-free-brands',
          icons: ['faTwitter', 'faGithub']
        }
      ]
    }]
  ],
  //alternative place for config
  fontawesome: {
    imports: [
      ...
    ]
  }
  //Tree shaking, you can omit this, but then webpack will include whole package  
  build: {
    extend (config) {
      config.resolve.alias['@fortawesome/fontawesome-free-brands$'] = '@fortawesome/fontawesome-free-brands/shakable.es.js'
      config.resolve.alias['@fortawesome/fontawesome-free-solid$'] = '@fortawesome/fontawesome-free-solid/shakable.es.js'
    }
  }
}
```

Two things I would make special note of:
1. The compponent naming option (`component: 'fa'`).  This allows you to succinctly use the component in this fashion, given the example config:
``` html 
<fa :icon="['fab', 'twitter']"/>
```
2.  Corresponding back to the first point, take notice that the icon name is 'twitter' rather than 'faTwitter' as you might expect.
3.  I highly recommend not to skip the the tree shaking portion.  This is the entire reason I used this module over the plugin I created and it reduces your bundle size dramatically.

That's it-- you will now be able to use the `fa` component throughout your application.


Thanks for taking the time to read this-- I hope it helps save somebody a lot of time and headache.  Please feel free to comment below if you have any thoughts or ideas that I may have missed.