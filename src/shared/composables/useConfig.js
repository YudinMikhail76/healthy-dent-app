export const useConfig = () => {
    const runtime = useRuntimeConfig()

    const getFullUrl = (url) => {
        return url ? runtime.public.API_BASE + url : ''
    } 

    return {
        runtime,
        apiUrl: runtime.public.API_BASE,
        isDevMode: runtime.public.APP_ENV === 'development',

        getFullUrl
    }
}