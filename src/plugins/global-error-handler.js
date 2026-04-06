export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.hook('vue:error', (err, context) => {
        console.error('[Vue error]', err)
        // eslint-disable-next-line
        console.log('context', context)
    })
    
    nuxtApp.hook('app:error', (err) => {
        console.error('[App error]', err)
    })
})