import { ref, computed, onMounted, onUnmounted } from 'vue'

export const useBreakPoints = () => {
    const { isMobileOrTablet } = useDevice()
    const windowWidth = ref(0)

    // SET DEFAULT SIZE
    if (isMobileOrTablet) {
        windowWidth.value = 700
    } else {
        windowWidth.value = 1500
    }

    const isMobileSize = computed(() => windowWidth.value < 1280)
    const setWindowWidth = () => windowWidth.value = window.innerWidth

    onMounted(() => {
        window.addEventListener('resize', setWindowWidth)
        setWindowWidth()
    })
    onUnmounted(() => window.removeEventListener('resize', setWindowWidth))

    return { isMobileSize }
}