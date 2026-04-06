import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppointmentModalStore = defineStore('appointment-modal-store', () => {
    const appointmentModalData = ref({
        option: '',
        title: '',
        button: ''
    })
    const staticFormData = ref({
        url: '',
        type: 'regular',
        subject: '',
        system_name: '',
        event: '',
    })
    const selectedMarketing = ref(null)
    const name = ref('')

    const SET_APPOINTMENT_MODAL_DATA = (payload) => {
        appointmentModalData.value = {
            ...appointmentModalData.value,
            ...payload
        }
    }

    const SET_URL = (url) => {
        staticFormData.value.url = url
    }

    const SET_TYPE = (type) => {
        staticFormData.value.type = type
    }

    const SET_SUBJECT = (subject) => {
        staticFormData.value.subject = subject
    }

    const SET_SYSTEM_NAME = (system_name) => {
        staticFormData.value.system_name = system_name
    }

    const SET_NAME = (value) => {
        name.value = value
    }

    const SET_MARKETING = (marketing) => selectedMarketing.value = marketing

    const SET_EVENT = (eventName) => staticFormData.value.event = eventName

    const RESET_APPOINTMENT_MODAL = () => {
        appointmentModalData.value = {
            option: '',
            title: '',
            button: ''
        }
        staticFormData.value = {
            url: '',
            type: 'regular',
            subject: '',
            system_name: '',
            event: ''
        }
        selectedMarketing.value = null
    }

    return {
        appointmentModalData,
        staticFormData,
        name,
        selectedMarketing,

        SET_APPOINTMENT_MODAL_DATA,
        SET_URL,
        SET_TYPE,
        SET_SUBJECT,
        SET_SYSTEM_NAME,
        SET_NAME,
        SET_EVENT,
        SET_MARKETING,
        RESET_APPOINTMENT_MODAL
    }
})