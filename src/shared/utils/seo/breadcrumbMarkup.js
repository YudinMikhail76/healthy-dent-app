export function returnBreadcrumbMarkup(metatags, path) {
    const config = useRuntimeConfig()
    const siteUrl = config.public.SITE_URL

    const isRu = path.startsWith('/ru/')
    const homePath = isRu ? '/ru' : '/'

    const title = metatags.head_title
        ? metatags.head_title.split(' | ')[0].split(' — ')[0].split(' - ')[0].trim()
        : ''

    const items = [
        {
            '@type': 'ListItem',
            position: 1,
            name: 'Healthy Dent',
            item: siteUrl + homePath
        }
    ]

    if (title) {
        items.push({
            '@type': 'ListItem',
            position: 2,
            name: title
        })
    }

    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items
    }
}
