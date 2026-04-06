import { defineStore } from 'pinia'
import { ref } from 'vue'
import { STEPS } from '../utils/variables'

export const useReviewModalStore = defineStore('review-modal-store', () => {
    const step = ref(STEPS.SELECT_AUTH)
    const dataForNewReview = ref(null)
    const currentUser = ref(null)
    const selectService = ref(null)
    const selectDoctors = ref([])
    const newReview = ref({
        full_name: '',
        services_tids: [],
        doctors_nids: [],
        rating: 1,
        text: ''
    })

    const SET_STEP = (payload) => {
        step.value = payload
    }

    const SET_DATA_FOR_NEW_REVIEW = (payload) => {
        dataForNewReview.value = payload
    }

    const SET_CURRENT_USER = (payload) => {
        currentUser.value = payload
    }

    const SET_FULL_NAME = (payload) => {
        newReview.value.full_name = payload
    }

    const SET_SERVICE = (payload) => {
        newReview.value.services_tids = [payload.value]
        selectService.value = payload
    }

    const SET_DOCTORS = (payload) => {
        newReview.value.doctors_nids = payload.map((item) => item.nid)
        selectDoctors.value = payload
    }

    const SET_RATING = (payload) => {
        newReview.value.rating = payload
    }

    const RESET_REVIEW_MODAL = () => {
        step.value = STEPS.SELECT_AUTH
        dataForNewReview.value = null
        selectService.value = null
        selectDoctors.value = []
        newReview.value = {
            full_name: '',
            services_tids: [],
            doctors_nids: [],
            rating: 0,
            text: ''
        }
    }

    return {
        step,
        dataForNewReview,
        currentUser,
        selectService,
        selectDoctors,
        newReview,

        SET_STEP,
        SET_DATA_FOR_NEW_REVIEW,
        SET_CURRENT_USER,
        SET_FULL_NAME,
        SET_SERVICE,
        SET_DOCTORS,
        SET_RATING,
        RESET_REVIEW_MODAL
    }
})