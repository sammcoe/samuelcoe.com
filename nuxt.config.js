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
    },
    vendor: [
      'github-vue'
    ]
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
    '@nuxtjs/dotenv',
    '@nuxtjs/markdownit',
    [ 'nuxt-fontawesome', {
      component: 'fa',
      imports: [
        {
          set: '@fortawesome/fontawesome-free-brands',
          icons: ['faTwitter', 'faGithub']
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
