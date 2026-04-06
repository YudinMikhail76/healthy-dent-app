import { defineStore } from 'pinia'

export const usePricesPageStore = defineStore('prices-page-store', () => {
    const pricesData = ref(null)

    const SET_PRICES_PAGE_DATA = (payload) => {
        pricesData.value = payload
    }

    return {
        pricesData,

        SET_PRICES_PAGE_DATA
    }
})