export const useRouteChangeWatcher = (callback) => {
    const route = useRoute()

    watch(() => route.path, () => {
        callback()
    }, { deep: true })
}