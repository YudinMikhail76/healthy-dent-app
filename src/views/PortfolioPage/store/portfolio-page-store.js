import { defineStore } from 'pinia'

export const usePortfolioPageStore = defineStore('portfolio-page-store', () => {
    const portfolioData = ref(null)
    const frames = ref([])

    const SET_FRAMES = (payload) => {
        frames.value = payload
    }

    const SET_PORTFOLIO_PAGE_DATA = (data) => {
        portfolioData.value = data
        SET_FRAMES(data.items)
    }

    return {
        portfolioData,
        frames,

        SET_PORTFOLIO_PAGE_DATA,
        SET_FRAMES
    }
})