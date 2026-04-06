// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'
import svgLoader from 'vite-svg-loader'
import { routeRedirects } from './src/shared/utils/seo/routeRedirects'
const isDevelopment = process.env.APP_ENV === 'development'

export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    srcDir: 'src/',
    serverDir: 'server/',
    devtools: { enabled: false },
    modules: ['@kgierke/nuxt-basic-auth', '@nuxtjs/i18n', '@pinia/nuxt', '@nuxt/eslint', '@nuxtjs/device'],
    hooks: {
        'build:manifest'(manifest) {
            for (const item of Object.values(manifest)) {
                item.dynamicImports = []
                item.prefetch = false
                item.preload = false

                // find the app entry and remove it
                if (item.isEntry && item.css) {
                    // Start from the end of the array and work backwards
                    for (let i = item.css.length - 1; i >= 0; i--) {
                        // eslint-disable-next-line
                        if (item.css[i].startsWith('entry')) {
                            item.css.splice(i, 1)
                        }
                    }
                }
            }
        }
    },
    nitro: {
        minify: true,
        compressPublicAssets: {
            brotli: true
        }
    },
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@use "@/app/styles/variables/index.scss" as *; @use "@/app/styles/utils/mixins.scss" as *;',
                    api: 'modern',
                    silenceDeprecations: ['import']
                }
            }
        },
        plugins: [
            svgLoader()
        ],
        optimizeDeps: {
            include: [
                '@fawmi/vue-google-maps',
                'fast-deep-equal'
            ]
        }
    },
    basicAuth: {
        enabled: isDevelopment,
        users: [
            {
                username: 'healthydent',
                password: 'NCxhNc4n5EV2p44'
            }
        ]
    },
    i18n: {
        lazy: true,
        langDir: 'app/lang',
        defaultLocale: 'uk',
        strategy: 'prefix_except_default',
        locales: [
            { code: 'uk', name: 'UA', file: 'uk.js' },
            { code: 'ru', name: 'RU', file: 'ru.js' },
            { code: 'en', name: 'EN', file: 'en.js' }
        ],
        experimental: {
            jsTsFormatResource: true
        },
        detectBrowserLanguage: false
    },
    runtimeConfig: {
        public: {
            API_BASE: process.env.API_BASE,
            SITE_URL: process.env.SITE_URL,
            APP_ENV: process.env.APP_ENV,
            ROOT_SITE_URL: process.env.ROOT_SITE_URL
        }
    },
    experimental: {
        defaults: {
            nuxtLink: {
                prefetchOn: {
                    interaction: true,
                    visibility: false
                }
            }
        }
    },
    routeRules: routeRedirects
})