import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLightboxModalStore = defineStore('lightbox-modal-store', () => {
    const lightboxModalData = ref({
        title: '',
        items: [],
        currentIndex: 0
    })

    const SET_LIGHTBOX_MODAL_DATA = (payload) => {
        lightboxModalData.value = {
            ...lightboxModalData.value,
            ...payload
        }
    }

    const RESET_LIGHTBOX_MODAL_DATA = () => {
        lightboxModalData.value = {
            title: '',
            items: [],
            currentIndex: 0
        }
    }

    return {
        lightboxModalData,
        SET_LIGHTBOX_MODAL_DATA,
        RESET_LIGHTBOX_MODAL_DATA
    }
})