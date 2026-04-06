import { defineStore } from 'pinia'

export const useBlogStore = defineStore('blog-store', () => {
    const blogData = ref(null)
    const frames = ref([])

    const SET_FRAMES = (payload) => {
        frames.value = payload
    }

    const SET_BLOG_DATA = (payload) => {
        blogData.value = payload
        SET_FRAMES(payload.items)
    }

    return {
        blogData,
        frames,

        SET_BLOG_DATA,
        SET_FRAMES
    }
})