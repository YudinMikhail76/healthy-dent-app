import { defineStore } from 'pinia'

export const useSimplifiedEnglishPageStore = defineStore('english-page-store', () => {
    const englishPageData = ref(null)

    const SET_ENGLISH_PAGE_DATA = (data) => englishPageData.value = data

    return {
        englishPageData,

        SET_ENGLISH_PAGE_DATA
    }
})