import colors from 'vuetify/es5/util/colors';
import { resolve } from 'path';

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  ssr: false,
  head: {
    title: 'Kho Bất Động Sản Việt',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/thinhgia_logo_1.png' },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/scss/main.scss'
  ],
  loading: true,
  loading: {
    color: 'blue',
    height: '5px',
    duration: 500,
  },
  // loading: '~/components/LoadingBar.vue',

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "@/plugins/bootstrap_icon.js", mode: "client"},
    // { src: "@/plugins/vue-select.js",  ssr: false},
    { src: "@/plugins/element-ui.js", mode: "client"},
    // { src: "@/plugins/vue-lazyloading.js", mode: "client"},
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    // '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'bootstrap-vue/nuxt',
    'nuxt-vue-select',
  ],

  // bootstrapVue: {
  //   bootstrapCSS: false, // Or `css: false`
  //   bootstrapVueCSS: false // Or `bvCSS: false`
  // },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      // dark: false,
      themes: {
        light: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  alias: {
    '@image': resolve(__dirname, './assets/images'),
    '@component': resolve(__dirname, './components'),
    '@lang': resolve(__dirname, './lang'),
    '@scss': resolve(__dirname, './assets/scss'),
    '@asset': resolve(__dirname, './assets'),
    '@lib': resolve(__dirname, './library')
  },

  extensions: ['*', '.js', '.vue', '.json']
}
