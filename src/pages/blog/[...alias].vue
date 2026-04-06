<template>
    <div>
        <component :is="pages[data?.restId]?.viewComponent" v-if="data?.restId" />
        <AppLangHiddenLinks v-if="data?.response?.locales" :locales="data.response.locales" />
    </div>
</template>

<script setup>
import { useBlogStore } from '~/views/Blog/store/blog-store'
import { useRootStore } from '~/entities/root/store/root-store'
import { useBlogArticleStore } from '~/views/BlogArticle/store/blog-article-store'
import { apiService } from '~/app/api'
import { getQueries } from '~/shared/utils/queryHelper'
import { returnAlternates } from '~/shared/utils/seo/alternates'
import { returnBlogPostMarkup } from '~/shared/utils/seo/blogPostMarkup'
import { returnOpenGraph } from '~/shared/utils/seo/openGraph.js'
import { ERROR_REST_ID, VALID_PAGE_TYPES } from '~/shared/utils/pages'
import { useConfig } from '~/shared/composables/useConfig'
import { generateMetaUsers } from '~/shared/utils/seo/meta-users'
import AppLangHiddenLinks from '~/shared/ui/Links/AppLangHiddenLinks'

const { locale } = useI18n()
const rootStore = useRootStore()
const route = useRoute()
const blogStore = useBlogStore()
const blogArticleStore = useBlogArticleStore()
const { articleData } = toRefs(blogArticleStore)
const { isDevMode } = useConfig()

const config = useRuntimeConfig()
const blogTypes = Object.values(VALID_PAGE_TYPES)

const pages = {
    [VALID_PAGE_TYPES.BLOG]: {
        viewComponent: defineAsyncComponent(() => import('~/views/Blog/BlogView.vue')),
        saveData: (payload) => blogStore.SET_BLOG_DATA(payload)
    },
    [VALID_PAGE_TYPES.BLOG_ARTICLE]: {
        viewComponent: defineAsyncComponent(() => import('~/views/BlogArticle/BlogArticle.vue')),
        saveData: (payload) => blogArticleStore.SET_ARTICLE_DATA(payload)
    }
}

const { data, error } = await useAsyncData('blog', async () => {
    const response = await apiService.getPathByAlias({
        lang: locale.value,
        url: route.path,
        queryParams: getQueries(route).queryParamsWithoutQuestionMark
    })

    if (response?.marketing) {
        rootStore.SET_PAGE_MARKETING(response.marketing)
    }

    if (response?.locales) {
        rootStore.SET_LOCALES(response.locales)
    }
    return preparedData(response)
})

const isArticle = computed(() => data.value?.restId === VALID_PAGE_TYPES.BLOG_ARTICLE)

handleError(error)
handleRedirect(data)

function preparedData(response) {
    const restId = response?.rest_id || null

    if (response.redirect_url) {
        return { redirect: response.redirect_url }
    }

    if (restId === ERROR_REST_ID || !blogTypes.includes(restId)) {
        throw404()
        return
    }

    setToStore(restId, response)

    return { response, restId }
}

function handleError(error) {
    if (error.value && error.value?.statusCode === 404) {
        throw404()
    }
}

async function handleRedirect(data) {
    if (data.value?.redirect) {
        await navigateTo(data.value.redirect, { redirectCode: 301 })
    }
}

function throw404() {
    throw createError({
        statusCode: 404,
        statusMessage: 'Page Not Found',
        message: 'Throwed custom error from alias /blog',
        fatal: true
    })
}

function setToStore(restId, payload) {
    if (pages[restId]) {
        pages[restId].saveData(payload)
    }
}

useHead({
    title: data.value.response.metatags.head_title,
    meta: [
        { name: 'description', content: data.value.response.metatags.description },
        { name: 'robots', content: () => isDevMode ? 'noindex, nofollow' : data.value.response.metatags.noindex },
        ...returnOpenGraph(data.value.response.metatags),
        ...generateMetaUsers(data.value.response.metatags)
    ],
    link: [
        { rel: 'canonical', href: config.public.SITE_URL + data.value.response.metatags.canonical },
        ...returnAlternates(data.value.response.metatags)
    ],
    ...isArticle.value && {
        script: [
            { 'data-id': 'micromarkup-org', children: returnBlogPostMarkup(articleData.value, route.path), type: 'application/ld+json' }
        ]
    }
})

onBeforeRouteLeave(() => rootStore.RESET_PAGE_DATA())
</script>
