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
      }
    },
    vendor: [
      'github-vue',
      'fontawesome-vue'
    ]
  },
  css: [
    { src: '~/assets/mystyles.scss', lang: 'scss' },
    '~/assets/main.css'
  ],
  plugins: [
    { src: '~/plugins/github-vue', ssr: false },
    { src: '~/plugins/fontawesome-vue', ssr: true }
  ],
  modules: [
    '@nuxtjs/markdownit'
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
