import { getCurrentLocale } from '~/shared/utils/helpers'
import { 
    COOKIES_USER_IP_KEY,
    getClientData,
    getClientDataFromHeaders,
    headersWithCredentials
} from '~/shared/utils/apiCredentials'

import { ofetch } from 'ofetch'

export const apiFetch = (...args) => {
    const runtime = useRuntimeConfig()
    const savedIp = useCookie(COOKIES_USER_IP_KEY)
    let userData = {}

    if (import.meta.server) {
        // TODO: there are some crush issues with using composables in function
        // trycatch is temporary solution
        try {
            const requestUrl = useRequestURL()
            const headers = useRequestHeaders()
            userData = getClientDataFromHeaders(headers, requestUrl.href)
    
            // If userData contains ip then save it in cookies to retrieve on client side
            if (userData['x-client-ip']) {
                savedIp.value = userData['x-client-ip']
            }
        } catch (error) {
            console.error('apiFetch get request data error', error)
        }
        // retrieve IP address from cookies for client side
    } else if (import.meta.client && savedIp.value) {
        userData = getClientData(savedIp.value)
    }

    return ofetch.create({
        baseURL: runtime.public.API_BASE,
        headers: {
            ...headersWithCredentials,
            ...userData
        },
        credentials: 'include'
    })(...args)
}

export const apiFetchWithoutUserData = (...args) => {
    const runtime = useRuntimeConfig()

    return ofetch.create({
        baseURL: runtime.public.API_BASE,
        headers: headersWithCredentials,
        credentials: 'include'
    })(...args)
}

export const apiService = {
    getNodePage({ lang, pageId }) {
        return apiFetch(`${ getCurrentLocale(lang) }/api/v1/get-node-page/${ pageId }`)
    },

    getPathByAlias({ lang, url, queryParams = '' }) {
        return apiFetch(`${ getCurrentLocale(lang) }/api/v1/get-path-by-alias?alias=${ url }${ queryParams }`)
    },

    getRobots() {
        return apiFetchWithoutUserData('/api/v1/get-robots-txt')
    },

    getSitemap() {
        return apiFetchWithoutUserData('/api/v1/get-sitemap')
    }
}