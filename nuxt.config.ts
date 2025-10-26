// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  app: {
    baseURL: '/sadamitsu82/',
    head: {
      title: 'Nuxt3 Website Template',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Nuxt3で構築されたモダンなWebサイトテンプレート' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/sadamitsu82/favicon.ico' }
      ]
    }
  },

  css: ['~/assets/css/main.css'],

  modules: [],

  // GitHub Pages用の静的サイト生成設定
  ssr: false,

  nitro: {
    preset: 'static'
  },
})
