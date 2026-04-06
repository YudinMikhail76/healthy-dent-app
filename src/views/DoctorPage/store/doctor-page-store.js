import { defineStore } from 'pinia'

export const useDoctorPageStore = defineStore('doctor-page-store', () => {
    const doctorPageData = ref(null)

    const SET_DOCTOR_PAGE_DATA = (data) => doctorPageData.value = data

    return {
        doctorPageData,

        SET_DOCTOR_PAGE_DATA
    }
})