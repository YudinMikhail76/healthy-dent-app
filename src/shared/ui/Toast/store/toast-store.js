import { defineStore } from 'pinia'

export const useToastStore = defineStore('toast-store', () => {
    const messages = ref([])

    const add = (item) => {
        messages.value = [...messages.value, item]
    }

    const remove = (id) => {
        messages.value = messages.value.filter((el) => el.id !== id)
    }

    return {
        messages,
        add,
        remove
    }
})