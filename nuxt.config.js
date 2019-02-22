if (process.env.NODE_ENV !== 'production') require('dotenv').config()

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'samuelcoe.com',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Personal website for Samuel Coe' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  env: {
    gitToken: process.env.GIT_TOKEN
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      } else {
        config.resolve.alias['vue'] = 'vue/dist/vue.min'
      }
      config.resolve.alias['@fortawesome/fontawesome-free-brands$'] = '@fortawesome/fontawesome-free-brands/shakable.es.js'
      config.resolve.alias['@fortawesome/fontawesome-free-solid$'] = '@fortawesome/fontawesome-free-solid/shakable.es.js'
    }
  },
  layoutTransition: {
    name: 'layout',
    mode: 'out-in',
    duration: '1000'
  },
  router: {
    scrollBehavior: function (to, from, savedPosition) {
      // if the returned position is falsy or an empty object,
      // will retain current scroll position.
      let position = false;
        
      // if no children detected
      if (to.matched.length < 2) {
        // scroll to the top of the page
        position = { x: 0, y: 0 };
      } else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
        // if one of the children has scrollToTop option set to true
        position = { x: 0, y: 0 };
      }
    
      // savedPosition is only available for popstate navigations (back button)
      if (savedPosition) {
        position = savedPosition;
      }
    
      return new Promise(resolve => {
        // wait for the out transition to complete (if necessary)
        setTimeout(() => {
          // coords will be used if no selector is provided,
          // or if the selector didn't match any element.
          if (to.hash && document.querySelector(to.hash)) {
            // scroll to anchor by returning the selector
            position = { selector: to.hash };
          }
          resolve(position)
        }, 500);
      });
    }
  },
  css: [
    { src: '~/assets/mystyles.scss', lang: 'scss' },
    { src: '~/assets/main.css', lang: 'css' },
    { src: '~/node_modules/highlight.js/styles/hopscotch.css', lang: 'css' }
  ],
  plugins: [
    { src: '~/plugins/github-vue', ssr: false },
    // { src: '~/plugins/fontawesome-vue', ssr: false }
  ],
  modules: [
    [ '@nuxtjs/google-analytics', {
      id: 'UA-115082949-1'
    }],
    '@nuxtjs/markdownit',
    '@nuxtjs/pwa',
    [ 'nuxt-fontawesome', {
      component: 'fa',
      imports: [
        {
          set: '@fortawesome/fontawesome-free-brands',
          icons: ['faTwitter', 'faTwitterSquare', 'faGithub', 'faFacebook', 'faRedditSquare', 'faGooglePlusSquare', 'faLinkedin']
        },
        {
          set: '@fortawesome/fontawesome-free-solid',
          icons: ['faEnvelope', 'faUser', 'faReply']
        }
      ]
    }]
  ],
  // Generate routes based of top-level file names for blog posts
  generate: {
    routes: function () {
      return require('fs').readdirSync('pages/blog').map(function (file) {
        return '/blog/' + require('slugify')(file.replace(/\.md$/, ''));
      });
    }
  },
  markdownit: {
    injected: true,
    use: [
      'markdown-it-highlightjs'
    ]
  }
}
