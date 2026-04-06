import withNuxt from './.nuxt/eslint.config.mjs'
import js from '@eslint/js'
import globals from 'globals'
import pluginVue from 'eslint-plugin-vue'
import jsRules from './config/js.rules.config.js'
import vueRules from './config/vue.rules.config.js'

export default withNuxt(
    js.configs.recommended,
    ...pluginVue.configs['flat/recommended'],
    {
        ignores: ['.nuxt/', '**/node_modules/', '.git/']
    },
    {
        name: 'IM-config',
        files: ['**/*.js', '**/*.vue'],
        languageOptions: {
            globals: globals.browser
        },
        rules: { 
            ...jsRules, 
            ...vueRules 
        }
    },
    // Disabled layouts, pages
    {
        files: ['src/pages/**/*.vue', 'src/layouts/*.vue'],
        rules: {
            'vue/multi-word-component-names': 0,
        },
    },
)
