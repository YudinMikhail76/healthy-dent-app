// import { defineEventHandler } from 'h3'

export default defineEventHandler((event) => {
    event.node.res.setHeader('content-type', 'text/xml')

    const config = useRuntimeConfig()

    return `
        <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            <sitemap>
                <loc>${ config.public.SITE_URL }/sitemap-uk.xml</loc>
            </sitemap>
            <sitemap>
                <loc>${ config.public.SITE_URL }/sitemap-ru.xml</loc>
            </sitemap>
            <sitemap>
                <loc>${ config.public.SITE_URL }/sitemap-en.xml</loc>
            </sitemap>
        </sitemapindex>
    `
})
