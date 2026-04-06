export default defineEventHandler(async (event) => {
    const urlObj = getRequestURL(event)
    const runtimeConfig = useRuntimeConfig()
    const rootDomain = runtimeConfig.public.ROOT_SITE_URL

    const isErrorPage = urlObj.pathname === '/__nuxt_error'
    if (isErrorPage) return

    const OLD_DOMAINS = [rootDomain]

    const newDomain = runtimeConfig.public.SITE_URL.split('https://')[1]

    const currentHost = event.node.req.headers.host
    const oldDomain = OLD_DOMAINS.find((oldDomain) => oldDomain === currentHost)

    if (oldDomain) {
        urlObj.protocol = 'https'
        const newUrl = urlObj.href.replace(oldDomain, newDomain)

        await sendRedirect(event, newUrl, 301)
    }
})