import { defineEventHandler } from 'h3'
import { apiService } from '~/app/api'
import { DEV_ROBOTS } from '~/shared/utils/seo/dev-robots-txt'

export default defineEventHandler(async (event) => {
    const runtime = useRuntimeConfig()
    const isDevMode = runtime.public.APP_ENV === 'development'

    event.node.res.setHeader('content-type', 'text/plain')

    if (isDevMode) {
        return DEV_ROBOTS
    } else {
        try {
            const data = await apiService.getRobots()

            return data.content
        } catch(err) {
            console.log('Error robots.txt', err)
        }
    }
})