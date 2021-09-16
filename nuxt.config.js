import colors from 'vuetify/es5/util/colors';
import { resolve } from 'path';

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
<<<<<<< HEAD
  head: {
    title: 'Thịnh Gia',
=======
  ssr: false,
  head: {
    title: 'Kho Bất Động Sản Việt',
>>>>>>> main
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
<<<<<<< HEAD
      { rel: 'icon', type: 'image/x-icon', href: '/thinhgia_logo_1.png' },
=======
      { rel: 'icon', type: 'image/x-icon', href: '/batdongsanviet.png' },
    ],
    script: [
      { type: 'text/javascript', src: 'https://sp.zalo.me/plugins/sdk.js' },
>>>>>>> main
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/scss/main.scss'
  ],
<<<<<<< HEAD
  loading: true,
  loading: {
    color: 'blue',
    height: '5px',
=======
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },

  apps: [
    {
      name: 'NuxtAppName',
      exec_mode: 'cluster',
      instances: 'max', // Or a number of instances
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start'
    }
  ],
  // target: 'static',
  loading: true,
  loading: {
    color: 'teal',
    height: '3px',
>>>>>>> main
    duration: 500,
  },
  // loading: '~/components/LoadingBar.vue',

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
<<<<<<< HEAD
    { src: "@/plugins/bootstrap_icon.js", mode: "client"},
    { src: "@/plugins/vue-select.js", mode: "client"},
    { src: "@/plugins/element-ui.js", mode: "client"},
=======
    { src: "@/plugins/bootstrap_icon.js", mode: "client" },
    // { src: "@/plugins/vue-select.js",  ssr: false},
    { src: "@/plugins/element-ui.js", mode: "client" },
    { src: "@/plugins/socket-io.js", mode: "client" },

>>>>>>> main
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
<<<<<<< HEAD
    'bootstrap-vue/nuxt'
=======
    'bootstrap-vue/nuxt',
    'nuxt-vue-select',
    'vue-social-sharing/nuxt',
>>>>>>> main
  ],

  // bootstrapVue: {
  //   bootstrapCSS: false, // Or `css: false`
  //   bootstrapVueCSS: false // Or `bvCSS: false`
  // },
<<<<<<< HEAD

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},
=======
  // io: {
  //   // module options
  //   sockets: [{
  //     name: 'main',
  //     url: 'https://thinhgiacore.demo.fit/socket.io'
  //   }]
  // },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'https://thinhgiacore.demo.fit/api',
    requestInterceptor: (config, { store }) => {
      config.headers.common['access-token'] = store.state.user.headers.access_token
      config.headers.common['token-type'] = store.state.user.headers.token_type
      config.headers.common['client'] = store.state.user.headers.client
      config.headers.common['expiry'] = store.state.user.headers.expiry
      config.headers.common['uid'] = store.state.user.headers.uid
      return config
    },
  },
>>>>>>> main

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: false,
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
<<<<<<< HEAD
    '@lib': resolve(__dirname, './library')
=======
    '@lib': resolve(__dirname, './library'),
    '@utils': resolve(__dirname, './utils')
>>>>>>> main
  },
  server: {
    host: '0',
    port: 3001
  },
  extensions: ['*', '.js', '.vue', '.json']
}
