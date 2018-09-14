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
    script: [
      {
        src: "https://code.jquery.com/jquery-3.3.1.slim.min.js",
			  integrity: "sha256-3edrmyuQ0w65f8gfBsqowzjJe2iM6n0nKciPUp8y+7E=",
			  crossorigin: "anonymous"
      },
      { 
        src: "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js", 
        integrity: "sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa",
        crossorigin: "anonymous"
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
   * Customize the progress bar color
   */
  loading: { color: '#3B8070', height: '6px' },
  /*
   * enabled plug-ins
   */
  plugins: [
    { src: '~/plugins/hellojs-plugin', ssr: false },
    '~/plugins/dragoon-account-api',
  ],
  /*
   * Css
   */
  css: [
    '@/assets/css/main.scss',
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
