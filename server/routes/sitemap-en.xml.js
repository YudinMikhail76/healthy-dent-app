import { apiService } from '~/app/api'
import { returnSitemapByLangKey } from '~/shared/utils/seo/sitemapByLangKey.js'
import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
    event.node.res.setHeader('content-type', 'text/xml')

    const data = await apiService.getSitemap()

    return returnSitemapByLangKey(data, 'en')
})
