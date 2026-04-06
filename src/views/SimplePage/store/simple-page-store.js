import { defineStore } from 'pinia'

export const useSimplePageStore = defineStore('simple-page-store', () => {
    const simplePageData = ref(null)

    const SET_SIMPLE_PAGE_DATA = (data) => simplePageData.value = data

    return {
        simplePageData,

        SET_SIMPLE_PAGE_DATA
    }
})