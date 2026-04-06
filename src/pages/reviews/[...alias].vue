<template>
    <div class="reviews">
        <ReviewsPage />
        <AppLangHiddenLinks v-if="data?.response?.locales" :locales="data.response.locales" />
    </div>
</template>

<script setup>
import ReviewsPage from '~/views/Reviews/ReviewsPage.vue'

import { apiService } from '~/app/api'
import { useReviewsPageStore } from '~/views/Reviews/store/reviews-store'
import { useRootStore } from '~/entities/root/store/root-store'
import { ERROR_REST_ID } from '~/shared/utils/pages'
import { returnAlternates } from '~/shared/utils/seo/alternates'
import { returnOpenGraph } from '~/shared/utils/seo/openGraph.js'
import { getQueries } from '~/shared/utils/queryHelper'
import { useConfig } from '~/shared/composables/useConfig'
import { generateMetaUsers } from '~/shared/utils/seo/meta-users'
import AppLangHiddenLinks from '~/shared/ui/Links/AppLangHiddenLinks'

const reviewsPageStore = useReviewsPageStore()
const rootStore = useRootStore()

const { locale } = useI18n()
const route = useRoute()
const config = useRuntimeConfig()
const { isDevMode } = useConfig()

const { data, error } = await useAsyncData('reviews-page', async () => {
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
handleError(error)
handleRedirect(data)

function preparedData(response) {
    const restId = response?.rest_id || null

    if (response.redirect_url) {
        return { redirect: response.redirect_url }
    }

    if (restId === ERROR_REST_ID) {
        throw404()
        return
    }

    reviewsPageStore.SET_REVIEWS_PAGE_DATA(response)

    return { response, restId }
}

function throw404() {
    throw createError({
        statusCode: 404,
        statusMessage: 'Page Not Found',
        fatal: true
    })
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
    ]
})

onBeforeRouteLeave(() => rootStore.RESET_PAGE_DATA())
</script>