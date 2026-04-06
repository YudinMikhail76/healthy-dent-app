function getRedirectConfig(event) {
    const urlObj = getRequestURL(event)

    const { 
        isHttp,
        isHomePage,
        isUpperCaseUrl,
        hasEndSlash,
        hasWWWPrefix,
        shouldRedirect 
    } = getRedirectConstants(urlObj)

    if (hasWWWPrefix) {
        urlObj.host = urlObj.host.replace('www.', '')
    }

    if (isHttp) {
        urlObj.protocol = 'https'
    }

    if (isUpperCaseUrl) {
        urlObj.pathname = urlObj.pathname.toLowerCase()
    }

    if (hasEndSlash && !isHomePage) {
        urlObj.pathname = urlObj.pathname.slice(0, -1)
    }

    return {
        shouldRedirect,
        newFullUrl: urlObj.href
    }
}

function getRedirectConstants(urlObj) {
    const isHttp = urlObj.protocol === 'http'
    const isHomePage = urlObj.pathname === '/'
    const hasEndSlash = urlObj.pathname.endsWith('/') 
    const isUpperCaseUrl = urlObj.pathname.match(/[A-Z]/)
    const hasWWWPrefix = urlObj.host.startsWith('www.')
    const shouldRedirect = isHttp 
        || isUpperCaseUrl 
        || hasEndSlash && !isHomePage 
        || hasWWWPrefix

    return {
        isHttp,
        isHomePage,
        isUpperCaseUrl,
        hasEndSlash,
        hasWWWPrefix,
        shouldRedirect
    }
}
  
export default defineEventHandler(async (event) => {
    const urlObj = getRequestURL(event)
    // don't touch error routes
    const isErrorPage = urlObj.pathname === '/__nuxt_error'
    const isIncorrectUrls = urlObj.pathname.startsWith('/misc') || urlObj.pathname.startsWith('/sites')
    if (isErrorPage) return

    if (isIncorrectUrls) {
        await sendRedirect(event, '/', 301)
    }

    // redirect from /ru duplicates
    if (urlObj.pathname.startsWith('/ru/ru/')) {
        urlObj.pathname = urlObj.pathname.replace('/ru/ru/', '/ru/')

        return sendRedirect(event, urlObj.href, 301)
    }

    const { shouldRedirect, newFullUrl } = getRedirectConfig(event)

    if (shouldRedirect) {
        await sendRedirect(event, newFullUrl, 301)
    }
})