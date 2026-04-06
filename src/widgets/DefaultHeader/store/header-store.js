import { defineStore } from 'pinia'

export const useHeaderStore = defineStore('header-store', () => {
    const data = ref(null)
    const isMenuOpened = ref(false)
    const isServicesOpened = ref(false)
    const selectedService = ref(null)

    const TOGGLE_MENU = () => isMenuOpened.value = !isMenuOpened.value
    const TOGGLE_SERVICES = () => isServicesOpened.value = !isServicesOpened.value
    const SET_SERVICE = (item) => selectedService.value = item
    const CLOSE_SUB_MENU = () => selectedService.value = null

    const HANDLE_SERVICE_CLICK = (item) => {
        if (!isServicesOpened.value) {
            TOGGLE_SERVICES()
        }
        if (isMenuOpened.value) {
            TOGGLE_MENU()
        }
        SET_SERVICE(item)
    }

    const CLOSE_ALL_MENUS = () => {
        if (isMenuOpened.value) {
            TOGGLE_MENU()
        }
        if (isServicesOpened.value) {
            TOGGLE_SERVICES()
        }
        if (selectedService.value) {
            CLOSE_SUB_MENU()
        }
    }

    return {
        data,
        isMenuOpened,
        isServicesOpened,
        selectedService,

        TOGGLE_MENU,
        TOGGLE_SERVICES,
        SET_SERVICE,
        HANDLE_SERVICE_CLICK,
        CLOSE_SUB_MENU,
        CLOSE_ALL_MENUS
    }
})