<template>
    <div>
        <NuxtLayout :name="isEngPage ? 'simplified' : 'default'">
            <EnglishPage v-if="data?.restId && isEngPage" />
            <component
                :is="normalPages[data?.restId]?.viewComponent"
                v-else-if="data?.restId"
            />
            <AppLangHiddenLinks v-if="data?.response?.locales" :locales="data.response.locales" />
        </NuxtLayout>
    </div>
</template>

<script setup>
import { apiService } from '~/app/api'
import { useSimplePageStore } from '~/views/SimplePage/store/simple-page-store'
import { getQueries } from '~/shared/utils/queryHelper'
import { ERROR_REST_ID, VALID_PAGE_TYPES } from '~/shared/utils/pages'
import { useRootStore } from '~/entities/root/store/root-store'
import { useStaticDataStore } from '~/entities/root/store/static-data-store'
import { useSimplifiedEnglishPageStore } from '~/views/SimplfiedEnglishPage/store/simplified-english-page'
import { returnAlternates } from '~/shared/utils/seo/alternates'
import { returnOpenGraph } from '~/shared/utils/seo/openGraph.js'
import { returnOrganizationalMarkup } from '~/shared/utils/seo/organizationalMarkup.js'
import { useConfig } from '~/shared/composables/useConfig'
import { generateMetaUsers } from '~/shared/utils/seo/meta-users'
import AppLangHiddenLinks from '~/shared/ui/Links/AppLangHiddenLinks'

const EnglishPage = defineAsyncComponent(() => import('~/views/SimplfiedEnglishPage/SimplifiedEnglishPage.vue'))

definePageMeta({
    layout: false
})

const { locale } = useI18n()
const route = useRoute()
const simplePageStore = useSimplePageStore()
const englishPageStore = useSimplifiedEnglishPageStore()
const rootStore = useRootStore()
const staticDataStore = useStaticDataStore()
const { isDevMode } = useConfig()

const config = useRuntimeConfig()
const pageTypes = Object.values(VALID_PAGE_TYPES)
const ENGLISH_PAGE_ID = 817

const normalPages = {
    [VALID_PAGE_TYPES.SIMPLE_PAGE]: {
        viewComponent: defineAsyncComponent(() => import('~/views/SimplePage/SimplePage.vue')),
        saveData: (payload) => simplePageStore.SET_SIMPLE_PAGE_DATA(payload)
    }
}

const { data, error } = await useAsyncData('alias-page', async () => {
    const response = await apiService.getPathByAlias({
        lang: locale.value,
        url: route.path,
        queryParams: getQueries(route).queryParamsWithoutQuestionMark
    })

    if (response?.locales) {
        rootStore.SET_LOCALES(response.locales)
    }

    if (response?.marketing) {
        rootStore.SET_PAGE_MARKETING(response.marketing)
    }
    return preparedData(response)
})
handleRedirect(data)
handleError(error)

const isEngPage = computed(() => data.value?.response?.nid === ENGLISH_PAGE_ID)

function preparedData(response) {
    const restId = response?.rest_id || null

    if (response.redirect_url) {
        return { redirect: response.redirect_url }
    }

    if (restId === ERROR_REST_ID || !pageTypes.includes(restId)) {
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
        message: 'Throwed custom error from root alias',
        fatal: true
    })
}

function setToStore(restId, payload) {
    if (payload.nid === ENGLISH_PAGE_ID) {
        englishPageStore.SET_ENGLISH_PAGE_DATA(payload)
    } else if (normalPages[restId]) {
        normalPages[restId].saveData(payload)
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
    ...data.value.response.nid === 816 && { script: [
        { 'data-id': 'micromarkup-org', children: returnOrganizationalMarkup(staticDataStore, data.value.response.metatags), type: 'application/ld+json' }]
    }
})

onBeforeRouteLeave(() => rootStore.RESET_PAGE_DATA())
</script>