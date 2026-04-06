import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useRootStore = defineStore('root-store', () => {
    const isLoading = ref(false)
    const locales = ref({
        current: null,
        ru: null,
        uk: null,
        en: null,
        isDynamic: false
    })
    const pageMarketing = ref(null)

    const TOGGLE_LOADING_STATUS = () => isLoading.value = !isLoading.value

    const SET_LOCALES = (payload) => {
        locales.value = {
            current: payload.current_locale,
            ru: payload.ru,
            uk: payload.uk,
            en: payload.en,
            isDynamic: true
        }
    }

    const RESET_LOCALES = () => {
        locales.value = {
            current: null,
            ru: null,
            uk: null,
            en: null,
            isDynamic: false
        }
    }

    const SET_PAGE_MARKETING = (payload) => {
        pageMarketing.value = payload
    }

    const RESET_PAGE_MARKETING = () => pageMarketing.value = null

    const RESET_PAGE_DATA = () => {
        RESET_LOCALES()
        RESET_PAGE_MARKETING()
    }

    return {
        isLoading,
        locales,
        pageMarketing,

        TOGGLE_LOADING_STATUS,
        RESET_LOCALES,
        SET_LOCALES,
        SET_PAGE_MARKETING,
        RESET_PAGE_DATA
    }
})