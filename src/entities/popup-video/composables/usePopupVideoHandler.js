import { useActiveModalsStore } from '~/entities/active-modals/store/active-modals'
import { usePopupVideoStore } from '../store/popup-video'
import { MODALS_KEYS } from '~/entities/active-modals/constants'

export const usePopupVideoHandler = (elementRef) => {
    const popupVideoStore = usePopupVideoStore()
    const activeModalsStore = useActiveModalsStore()

    function initEventListeners() {
        if (!elementRef?.value) return

        const popupVideos = elementRef?.value.querySelectorAll('[data-popup-video]')

        if (!popupVideos?.length) return

        popupVideos.forEach((videoLink) => {
            videoLink.addEventListener('click', handleOpenClick)
        })
    }

    function removeEventListeners() {
        if (!elementRef?.value) return

        const popupVideos = elementRef?.value.querySelectorAll('[data-popup-video]')

        if (!popupVideos?.length) return

        popupVideos.forEach((videoLink) => {
            videoLink.removeEventListener('click', handleOpenClick)
        })
    }

    function handleOpenClick(e) {
        e.preventDefault()
        popupVideoStore.openVideoPopup(getEmbedUrl(e.currentTarget.dataset.popupVideo))
        activeModalsStore.ADD_ACTIVE_KEYS([MODALS_KEYS.VIDEO])
    }

    function getEmbedUrl(url) {
        const youTubeBase = 'https://www.youtube.com/embed/'
    
        return `${ youTubeBase }${ getVideoId(url) }`
    }

    function getVideoId(url) {
        if (url.includes('youtu.be/')) {
            return url.split('youtu.be/')[1].split('?')[0]
        } else if (url.includes('youtube.com/watch')) {
            return new URL(url).searchParams.get('v')
        } else if (url.includes('youtube.com/shorts/')) {
            return url.split('shorts/')[1].split('?')[0]
        }

        return ''
    }

    onMounted(() => initEventListeners())

    onBeforeUnmount(() => removeEventListeners())
}