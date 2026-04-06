import { defineStore } from 'pinia'

export const usePromotionsPageStore = defineStore('promotions-page-store', () => {
    const promotionsData = ref(null)
    const frames = ref([])

    const SET_PROMOTIONS_PAGE_DATA = (payload) => {
        promotionsData.value = payload
        SET_FRAMES(payload.items)
    }

    const SET_FRAMES = (payload) => {
        frames.value = payload
    }

    return {
        promotionsData,
        frames,

        SET_PROMOTIONS_PAGE_DATA,
        SET_FRAMES
    }
})