import { defineStore } from 'pinia'

export const usePopupVideoStore = defineStore('popup-video-store', () => {
    const popupVideoSrc = ref('')

    function openVideoPopup(url) {
        popupVideoSrc.value = url
    }
    
    function closeVideoPopup() {
        popupVideoSrc.value = ''
    }

    return {
        popupVideoSrc,

        openVideoPopup,
        closeVideoPopup
    }
})
