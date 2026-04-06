import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useModalsStore = defineStore('modals-store', () => {
    const isAppointmentModalOpen = ref(false)
    const isReviewModalOpen = ref(false)
    const isSuccessModalOpen = ref(false)
    const isHotTimeModalOpen = ref(false)
    const isGalleryLightboxModalOpen = ref(false)

    const TOGGLE_APPOINTMENT_MODAL = () => isAppointmentModalOpen.value = !isAppointmentModalOpen.value
    const TOGGLE_REVIEW_MODAL = () => isReviewModalOpen.value = !isReviewModalOpen.value
    const TOGGLE_SUCCESS_MODAL = () => isSuccessModalOpen.value = !isSuccessModalOpen.value
    const TOGGLE_HOT_TIME_MODAL = () => isHotTimeModalOpen.value = !isHotTimeModalOpen.value
    const TOGGLE_GALLERY_LIGHTBOX_MODAL = () => isGalleryLightboxModalOpen.value = !isGalleryLightboxModalOpen.value

    const CLOSE_ALL_MODALS = () => {
        isAppointmentModalOpen.value = false
        isReviewModalOpen.value = false
        isSuccessModalOpen.value = false
        isHotTimeModalOpen.value = false
        isGalleryLightboxModalOpen.value = false
    }

    return {
        isAppointmentModalOpen,
        isReviewModalOpen,
        isSuccessModalOpen,
        isHotTimeModalOpen,
        isGalleryLightboxModalOpen,

        TOGGLE_APPOINTMENT_MODAL,
        TOGGLE_REVIEW_MODAL,
        TOGGLE_SUCCESS_MODAL,
        TOGGLE_HOT_TIME_MODAL,
        TOGGLE_GALLERY_LIGHTBOX_MODAL,

        CLOSE_ALL_MODALS
    }
})