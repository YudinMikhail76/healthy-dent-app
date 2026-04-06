import { defineStore } from 'pinia'

export const useActiveModalsStore = defineStore('active-modals-store', () => {
    const activeModals = ref([])

    const REMOVE_ACTIVE_KEYS = (arrKeys) => {
        arrKeys.forEach((key) => {
            if (activeModals.value.includes(key)) {
                activeModals.value = activeModals.value.filter((item) => item !== key)
            }
        })
    }

    const ADD_ACTIVE_KEYS = (arrKeys) => {
        arrKeys.forEach((key) => {
            if (!activeModals.value.includes(key)) {
                activeModals.value = [...activeModals.value, key]
            }
        })
    }

    const RESET_ALL_ACTIVE_MODALS = () => activeModals.value = []

    const isAnyModalActive = computed(() => activeModals.value.length > 0)

    return {
        activeModals,
        isAnyModalActive,

        ADD_ACTIVE_KEYS,
        REMOVE_ACTIVE_KEYS,
        RESET_ALL_ACTIVE_MODALS
    }
})