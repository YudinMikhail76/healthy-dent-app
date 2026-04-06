import { defineStore } from 'pinia'

export const useServicePageStore = defineStore('service-page-store', () => {
    const serviceData = ref(null)

    const SET_SERVICE_PAGE_DATA = (data) => serviceData.value = data

    return {
        serviceData,

        SET_SERVICE_PAGE_DATA
    }
})