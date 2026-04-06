import { ofetch } from 'ofetch'
import { headersWithCredentials } from '~/shared/utils/apiCredentials'

export const api = {
    fetchInstance: ofetch.create({
        // baseURL: 'https://admin.amonitt.com.ua',
        headers: headersWithCredentials,
        credentials: 'include'
    })
}