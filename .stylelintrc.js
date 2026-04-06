import styleRules from './config/style.rules.config.js'

export default {
    extends: [
        'stylelint-config-standard-scss',
        'stylelint-config-recommended-vue'
    ],
    plugins: [
        'stylelint-order',
        '@stylistic/stylelint-plugin'
    ],
    rules: { ...styleRules }
}