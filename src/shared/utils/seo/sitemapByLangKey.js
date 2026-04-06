export function returnSitemapByLangKey(response, langKey) {
    const config = useRuntimeConfig()

    const generatedXML = response.urls[langKey].map((url) => {
        return `
            <url>
                <loc>${ config.public.SITE_URL + url.loc }</loc>
                <lastmod>${ url.lastmod }</lastmod>
            </url>
        `
    }).join('')

    return `<urlset xmlns = "http://www.sitemaps.org/schemas/sitemap/0.9">${ generatedXML }</urlset>`
}