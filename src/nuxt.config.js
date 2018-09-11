module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'dragoon-login',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'OAuth2 Logon Portal for Office365, Facebook and Google integration' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
   * Customize the progress bar color
   */
  loading: { color: '#3B8070' },
  /*
   * enabled plug-ins
   */
  plugins: [
    { src: '~/plugins/hellojs-plugin', ssr: false },
  ],
  /*
   * Build configuration
   */
  build: {
    /*
     * Make sure dependencies are added to 
     * the vendor bundle (for better caching apparently!)
     */
    vendor: ['vue-hellojs', 'hellojs'],
    /*
     * Run ESLint on save
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
    }
  }
}
