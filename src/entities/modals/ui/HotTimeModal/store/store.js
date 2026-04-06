import { defineStore } from 'pinia'
import { steps } from '../constants/index.js'

export const useHotTimeModalStore = defineStore('hot-time-modal-store', () => {
    const systemName = ref('')
    const services = ref([])
    const schedule = ref(null)
    const generalPromo = ref('')
    const step = ref(steps.SERVICES)
    const selectedService = ref(null)
    const selectedDay = ref(null)
    const selectedTime = ref(null)
    const selectedMarketing = ref(null)
    const promotion = ref(null)
    const formFields = ref({
        name: '',
        phone: ''
    })

    const SET_SYSTEM_NAME = (payload) => systemName.value = payload
    const SET_SERVICES = (payload) => services.value = payload
    const SET_SCHEDULE = (payload) => schedule.value = payload
    const SET_GENERAL_PROMO = (payload) => generalPromo.value = payload
    const SELECT_STEP = (payload) => step.value = payload
    const SELECT_SERVICE = (payload) => selectedService.value = payload
    const SELECT_DAY = (payload) => selectedDay.value = payload
    const SELECT_TIME = (payload) => selectedTime.value = payload
    const SET_FORM_FIELDS = ({ key, value }) => formFields.value[key] = value
    const SET_MARKETING = (payload) => selectedMarketing.value = payload
    const SET_PROMOTION = (payload) => promotion.value = payload

    const $reset = () => {
        systemName.value = ''
        services.value = []
        schedule.value = null
        generalPromo.value = ''
        step.value = steps.SERVICES
        selectedService.value = null
        selectedDay.value = null
        selectedTime.value = null
        formFields.value.name = ''
        formFields.value.phone = ''
        selectedMarketing.value = null
        promotion.value = null
    }

    return {
        systemName,
        services,
        schedule,
        generalPromo,
        step,
        selectedService,
        selectedDay,
        selectedTime,
        formFields,
        selectedMarketing,
        promotion,

        SET_SYSTEM_NAME,
        SET_SERVICES,
        SET_SCHEDULE,
        SET_GENERAL_PROMO,
        SELECT_STEP,
        SELECT_DAY,
        SELECT_TIME,
        SELECT_SERVICE,
        SET_FORM_FIELDS,
        SET_MARKETING,
        SET_PROMOTION,
        $reset
    }
})