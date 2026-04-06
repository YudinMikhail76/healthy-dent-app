import { defineEventHandler, getRequestHeaders, createError } from 'h3'
import { getIpFromHeaders } from '~/shared/utils/apiCredentials'

const rateLimitMap = new Map()
const LIMIT = 10
const INTERVAL = 60 * 1000 // 1 хвилина

export default defineEventHandler((event) => {
    const headers = getRequestHeaders(event)
    const ip = getIpFromHeaders(headers) || ''
    const ua = headers['user-agent'] || ''

    // exceptions
    if (
        event.node.req.url.startsWith('/.well-known') 
        || /Googlebot/i.test(ua) || /Googlebot-Image/i.test(ua) 
        || ip === '127.0.0.1'
    ) {
        return
    }

    const now = Date.now()
    const data = rateLimitMap.get(ip) || { count: 0, lastReset: now }

    if (now - data.lastReset > INTERVAL) {
        data.count = 1
        data.lastReset = now
    } else {
        data.count++
    }

    rateLimitMap.set(ip, data)

    if (data.count > LIMIT) {
        throw createError({ statusCode: 429, statusMessage: 'Too many Requests, try later' })
    }
})