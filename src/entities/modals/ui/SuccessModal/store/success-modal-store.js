import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSuccessModalStore = defineStore('success-modal-store', () => {
    const successModalData = ref({
        title: '',
        subtitle: '',
        description: ''
    })

    const SET_SUCCESS_MODAL_DATA = (payload) => {
        successModalData.value = payload
    }

    const RESET_SUCCESS_MODAL = () => {
        successModalData.value = {
            title: '',
            subtitle: '',
            description: ''
        }
    }

    return {
        successModalData,

        SET_SUCCESS_MODAL_DATA,
        RESET_SUCCESS_MODAL
    }
})