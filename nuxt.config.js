require('dotenv').config()
const client = require('./plugins/contentful')
module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'SiR MaRY - We Decomplex Digital',
    meta: [
      // TODO: Change these URL's to the images and the OG info!!
      { charset: 'UTF-8' },
      { hid: 'description', name: 'description', content: 'SiR MaRY ist eine Kreativagentur, die Marken durch die Komplexität der vernetzten Welt führt.' },
      { 'http-equiv': 'Content-Type', content: 'text/html; charset: utf-8' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge, chrome=1' },
      { name: 'viewport', content: 'width: device-width, initial-scale: 1.0, maximum-scale: 1.0, user-scalable: no'  },
      { content: 'True', name: 'HandheldFriendly' },
      { content: '320', name: 'MobileOptimized' },
      { itemprop: 'name', content: 'SiR MaRY – We Decomplex Digital' },
      { name: 'keywords', content: 'Sir Mary, Digital, Kommunikation, Digital Business Consulting, Creative Campaigning, Media Distribution, Zurich, Switzerland' },
      { name: 'twitter:title', content: 'SiR MaRY – We Decomplex Digital' },
      { name: 'twitter:url', content: 'http://www.sirmary.com/' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:image:src', content: 'http://sirmarybotai-clean.dev/img/share.jpg' },
      { name: 'twitter:domain', content: 'http://sirmarybotai-clean.dev' },
      { property: 'og:site_name', content: 'SiR MaRY – We Decomplex Digital' },
      { property: 'og:title', content: 'SiR MaRY – We Decomplex Digital' },
      { property: 'og:description', content: 'SiR MaRY ist eine Kreativagentur, die Marken durch die Komplexität der vernetzten Welt führt.' },
      { property: 'og:url', content: 'http://sirmarybotai-clean.dev' },
      { property: 'og:type', content: 'website' },
      { itemprop: 'name', content: 'Content' },
      { property: 'og:image', content: 'http://sirmarybotai-clean.dev/img/share.jpg' },
      { property: 'og:image:type', content: 'image/png' },
      { property: 'og:image:width', content: '1920' },
      { property: 'og:image:height', content: '1135' }
    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:700' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicons/favicon.ico' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicons/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicons/favicon-16x16.png' },
      { rel: 'apple-touch-icon-precomposed', sizes: '57x57', href: '/favicons/apple-touch-icon-57x57.png' },
      { rel: 'apple-touch-icon-precomposed', sizes: '114x114', href: '/favicons/apple-touch-icon-114x114.png' },
      { rel: 'apple-touch-icon-precomposed', sizes: '72x72', href: '/favicons/apple-touch-icon-72x72.png' },
      { rel: 'apple-touch-icon-precomposed', sizes: '144x144', href: '/favicons/apple-touch-icon-144x144.png' },
      { rel: 'apple-touch-icon-precomposed', sizes: '120x120', href: '/favicons/apple-touch-icon-120x120.png' },
      { rel: 'apple-touch-icon-precomposed', sizes: '152x152', href: '/favicons/apple-touch-icon-152x152.png' }
    ]
  },
  css: [
    '@/assets/css/main.scss'
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#000000' },
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
    }
  },
  plugins: [
    '~plugins/contentful',
    '~plugins/marked',
    { src: '~plugins/ga.js', ssr: false }
  ],
  modules: ['@nuxtjs/dotenv'],
  generate: {
    routes() {
      return client.getEntries({ content_type: 'job' }).then(entries => {
        return entries.items.map(entry => {
          return {
            route: entry.fields.slug,
            payload: entry
          }
        })
      })
    }
  }
}
