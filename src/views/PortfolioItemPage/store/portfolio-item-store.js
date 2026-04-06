import { defineStore } from 'pinia'

export const usePortfolioItemPageStore = defineStore('portfolio-item-page-store', () => {
    const portfolioItemData = ref(null)

    const SET_PORTFOLIO_ITEM_PAGE_DATA = (data) => portfolioItemData.value = data

    return {
        portfolioItemData,

        SET_PORTFOLIO_ITEM_PAGE_DATA
    }
})