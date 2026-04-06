export const headersWithCredentials = {
    'Access-Control-Allow-Credentials': true,
    'Content-Type': 'application/json',
    Accept: 'application/json'
}

export const COOKIES_USER_IP_KEY = 'client_user_ip'

export function getClientDataFromHeaders(headers, url) {
    return {
        'x-client-ip': getIpFromHeaders(headers),
        'x-client-url': url || '',
        'x-client-operating-system': headers['sec-ch-ua-platform'] || '',
        'x-client-user-agent': headers['user-agent'] || ''
    }
}

export function getClientData(ip) {
    return {
        'x-client-ip': ip || '',
        'x-client-url': window.location.href || '',
        'x-client-operating-system': navigator?.userAgentData?.platform || '',
        'x-client-user-agent': navigator?.userAgent || ''
    }
}

export function getIpFromHeaders(headers) {
    return headers['do-connecting-ip'] 
        || headers['cf-connecting-ip'] 
        || headers['x-forwarded-for']?.split(',')[0] 
        || ''
}