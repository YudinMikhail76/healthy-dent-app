import { defineStore } from 'pinia'

export const useServiceListPageStore = defineStore('service-list-page-store', () => {
    const servicesData = ref(null)

    const SET_SERVICES_PAGE_DATA = (data) => servicesData.value = data

    return {
        servicesData,

        SET_SERVICES_PAGE_DATA
    }
})