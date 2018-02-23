---
title: Using Font Awesome 5 SVG Icons with Nuxt
description: If you've used Font Awesome with any project in the past, you may be tempted to implement it the same way you're used to.  With Font Awesome 5, there's a better way to do it, and if you're using Nuxt it's a must.
badge: JS
---

If you've used Font Awesome with any project in the past, you may be tempted to implement it the same way you're used to.  Whether that's using Web Fonts with CSS or (for other Vue projects) using the Vue component that's featured on the Font Awesome website.

There's a new way to go about using Font Awesome in your projects these days.  With the bump to version 5 of the library, Font Awesome has included new SVG icons that can be implemented very easily in any project, look better at any but the tiniest scale, and lend more versatility to developers.

For those unfamiliar with SVG's (Scalable Vector Graphics), they define vector-based graphic rendering in an XML format.  Once of the greatest benefits of SVG's is that they do **not** lose any quality when they are zoomed or resized.  Additionally, any element or attribute in an SVG is able to be animated.

With the new SVG implementation of Font Awesome, it is now possilbe to use SSR (Server-Side Rendering) to render the icons on the server, saving load-time on the client side.  This is an awesome step forward and makes implementation using Nuxt, which specializes in SSR and static-generated content, better than ever.

Onto the good bits:

# 1. Decide Which Style Packs You Want
Another change that came along with Font Awesome 5 is the seperation of different icon styles into individual sets: Font Awesome Brands, Font Awesome Solid, Font Awesome Regular, Font Awesome Light. You can find a good representation of all the the changes [here](https://fontawesome.com/how-to-use/upgrading-from-4).  Make a note of the packages that you want to include in your project.

# 2. Install the Packages
For this example, I'll install Font Awesome with the Solid and Brand packs.
``` sh
npm i --save @fortawesome/fontawesome
npm i --save @fortawesome/fontawesome-free-brands
npm i --save @fortawesome/fontawesome-free-solid
```

# 3. Add the Packages to Your nuxt.config.js
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

# 4. Use the Icons
Icon usage is exactly how you would expect, unless you're coming from older versions of Font Awesome.  Once again, I recommend you review the changes.  Using the icons now requires a prefix that denotes the package where the icon is found.
``` html
<i class="fab fa-github"/>
<i class="fab fa-twitter"/>
```

