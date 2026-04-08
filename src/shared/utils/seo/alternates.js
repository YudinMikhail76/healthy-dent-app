export function returnAlternates(metatags) {
    if (metatags.alternate && metatags.alternate.length > 0) {
        return metatags.alternate.map((el) => {
            return { ...el, rel: 'alternate' }
        })
    }

    const config = useRuntimeConfig()
    const siteUrl = config.public.SITE_URL
    const canonical = metatags.canonical || ''

    let ukPath, ruPath
    if (canonical.startsWith('/ru/') || canonical === '/ru') {
        ruPath = canonical
        ukPath = canonical.replace(/^\/ru(\/|$)/, '/')
    } else {
        ukPath = canonical.startsWith('/') ? canonical : '/' + canonical
        ruPath = '/ru' + ukPath
    }

    if (ukPath !== '/' && ukPath.endsWith('/')) {
        ukPath = ukPath.slice(0, -1)
    }

    return [
        { hreflang: 'x-default', href: siteUrl + ukPath, rel: 'alternate' },
        { hreflang: 'uk-UA', href: siteUrl + ukPath, rel: 'alternate' },
        { hreflang: 'ru-UA', href: siteUrl + ruPath, rel: 'alternate' }
    ]
}