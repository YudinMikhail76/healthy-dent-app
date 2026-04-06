export default defineNitroPlugin((nitroApp) => {
    nitroApp.hooks.hook('render:html', (html) => {
        const { head } = html
        const headReplacement = head.map((h) => {
            // optimize css load, avoid blocking render
            // Keep first stylesheet as render-blocking for FCP, defer the rest
            let firstStylesheetKept = false
            return h.replace(/<link rel="stylesheet"/g, (match) => {
                if (!firstStylesheetKept) {
                    firstStylesheetKept = true
                    return match // keep first CSS render-blocking for fast FCP
                }
                return '<link rel="preload" as="style" onload="this.rel=\'stylesheet\'"'
            })
        })

        html.head.length = 0
        html.head = headReplacement
    })
})