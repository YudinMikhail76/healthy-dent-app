import { defineStore } from 'pinia'

export const useBlogArticleStore = defineStore('blog-article-store', () => {
    const articleData = ref(null)

    const SET_ARTICLE_DATA = (payload) => articleData.value = payload

    return {
        articleData,

        SET_ARTICLE_DATA
    }
})