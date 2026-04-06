export function returnOpenGraph(metatags) {
    const config = useRuntimeConfig()

    return [
        { property: 'og:title', content: metatags.og_title },
        { property: 'og:description', content: metatags.og_description },
        { property: 'og:type', content: metatags.og_type },
        { property: 'og:image', content: `${ config.public.SITE_URL }/logo-og.png` },
        { property: 'og:url', content: config.public.SITE_URL + metatags.og_url },
        { property: 'og:locale', content: metatags.og_locale },
        { property: 'og:site_name', content: metatags.og_site_name }
    ]
}