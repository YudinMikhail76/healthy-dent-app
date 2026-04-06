import { defineStore } from 'pinia'

export const useHomePageStore = defineStore('home-page-store', () => {
    const homePageData = ref(null)

    const SET_HOME_PAGE_DATA = (payload) => {
        homePageData.value = payload
    }

    return {
        homePageData,

        SET_HOME_PAGE_DATA
    }
})