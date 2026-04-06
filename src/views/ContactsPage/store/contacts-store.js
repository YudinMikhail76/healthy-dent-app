import { defineStore } from 'pinia'

export const useContactsPageStore = defineStore('contacts-page-store', () => {
    const contactsPageData = ref(null)

    const SET_CONTACTS_PAGE_DATA = (payload) => {
        contactsPageData.value = payload
    }

    return {
        contactsPageData,

        SET_CONTACTS_PAGE_DATA
    }
})