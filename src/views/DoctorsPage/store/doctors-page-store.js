import { defineStore } from 'pinia'

export const useDoctorsPageStore = defineStore('doctors-page-store', () => {
    const doctorsPageData = ref(null)

    const SET_DOCTORS_PAGE_DATA = (data) => doctorsPageData.value = data

    return {
        doctorsPageData,

        SET_DOCTORS_PAGE_DATA
    }
})