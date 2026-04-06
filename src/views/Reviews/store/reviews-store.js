import { defineStore } from 'pinia'

export const useReviewsPageStore = defineStore('reviews-page-store', () => {
    const reviewsPageData = ref(null)
    const frames = ref([])

    const SET_FRAMES = (payload) => {
        frames.value = payload
    }

    const SET_REVIEWS_PAGE_DATA = (payload) => {
        reviewsPageData.value = payload
        SET_FRAMES(payload.items)
    }

    return {
        reviewsPageData,
        frames,

        SET_REVIEWS_PAGE_DATA,
        SET_FRAMES
    }
})