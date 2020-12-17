/* eslint-disable global-require */
// Configuration for your app
// https://quasar.dev/quasar-cli/quasar-conf-js


// eslint-disable-next-line
module.exports = function (ctx) {
  return {
    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    boot: [
      // 'i18n',
      'logger',
      'sentry',
      'firebase',
    ],

    css: [
      'app.styl',
    ],

    extras: [
      // 'ionicons-v4',
      // 'mdi-v3',
      // 'fontawesome-v5',
      // 'eva-icons',
      // 'themify',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

      'roboto-font', // optional, you are not bound to it
      'material-icons', // optional, you are not bound to it
    ],

    framework: {
      // iconSet: 'ionicons-v4',
      // lang: 'de', // Quasar language

      // Possible values for "all":
      // * 'auto' - Auto-import needed Quasar components & directives
      //            (slightly higher compile time; next to minimum bundle size; most convenient)
      // * false  - Manually specify what to import
      //            (fastest compile time; minimum bundle size; most tedious)
      // * true   - Import everything from Quasar
      //            (not treeshaking Quasar; biggest bundle size; convenient)

      importStrategy: 'auto',

      directives: [
        'Ripple',
      ],

      // Quasar plugins
      plugins: [
        'Notify',
        'Dialog',
      ],

      config: {
        notify: {
          position: 'bottom',
          color: 'negative',
          timeout: 1500,
          textColor: 'white',
          actions: [{ icon: 'close', color: 'white' }],
        },
      },

      lang: 'pt-br',
    },

    build: {
      scopeHoisting: true,
      vueRouterMode: 'history',
      // vueCompiler: true,
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      extendWebpack(cfg) {
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/,
          options: {
            formatter: require('eslint').CLIEngine.getFormatter('stylish'),
          },
        });
      },
      env: {
        VERSION: require('./package.json').version,
      },
    },

    devServer: {
      // https: true,
      // port: 8080,
      open: true, // opens browser window automatically
    },

    // animations: 'all', // --- includes all animations
    animations: [
      'fadeIn',
    ],

    ssr: {
      pwa: false,
    },

    pwa: {
      workboxPluginMode: 'InjectManifest',
      workboxOptions: {
        exclude: [
          /\/icons\//,
          'manifest.json',
        ],
      },
      manifest: {
        name: 'Diabeto',
        short_name: 'Diabeto',
        // description: 'A Quasar Framework app',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#5889D6',
        icons: [
          {
            src: 'icons/icon-72x72.png',
            sizes: '72x72',
            type: 'image/png',
          },
          {
            src: 'icons/icon-96x96.png',
            sizes: '96x96',
            type: 'image/png',
          },
          {
            src: 'icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png',
          },
          {
            src: 'icons/icon-144x144.png',
            sizes: '144x144',
            type: 'image/png',
          },
          {
            src: 'icons/icon-152x152.png',
            sizes: '152x152',
            type: 'image/png',
          },
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png',
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
        shortcuts: [
          {
            name: 'Criar novo',
            short_name: 'Criar',
            description: 'Criar novo registo de log',
            url: '/records/new?utm_source=homescreen',
            icons: [{ src: 'icons/shortcuts/add-192x192.png', sizes: '192x192' }],
          },
          {
            name: 'Registros',
            short_name: 'Registros',
            description: 'Listar todos os regsitros',
            url: '/records?utm_source=homescreen',
            icons: [{ src: 'icons/shortcuts/list-192x192.png', sizes: '192x192' }],
          },
        ],
      },
    },
  };
};
