<template>
    <div>
        <ServicePage />
        <AppLangHiddenLinks v-if="data?.response?.locales" :locales="data.response.locales" />
    </div>
</template>

<script setup>
import { useRootStore } from '~/entities/root/store/root-store'
import { useServicePageStore } from '~/views/ServicePage/store/service-page-store'
import { useStaticDataStore } from '~/entities/root/store/static-data-store'
import { apiService } from '~/app/api'
import { getQueries } from '~/shared/utils/queryHelper'
import { returnAlternates } from '~/shared/utils/seo/alternates'
import { returnOpenGraph } from '~/shared/utils/seo/openGraph.js'
import { returnServiceMarkup } from '~/shared/utils/seo/serviceMarkup'
import { useConfig } from '~/shared/composables/useConfig'
import { generateMetaUsers } from '~/shared/utils/seo/meta-users'
import { getMedicalWebpageMarkup } from '~/shared/utils/seo/medicalWebpageMarkup'
import { ERROR_REST_ID, VALID_PAGE_TYPES } from '~/shared/utils/pages'
import AppLangHiddenLinks from '~/shared/ui/Links/AppLangHiddenLinks'
import ServicePage from '~/views/ServicePage/ServicePage.vue'

const { locale } = useI18n()
const rootStore = useRootStore()
const route = useRoute()
const servicePageStore = useServicePageStore()
const staticData = useStaticDataStore()
const { isDevMode } = useConfig()
const { serviceData } = toRefs(servicePageStore)

const config = useRuntimeConfig()
const types = Object.values(VALID_PAGE_TYPES)

const { data, error } = await useAsyncData('doctors-alias', async () => {
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

    if (restId === ERROR_REST_ID || !types.includes(restId)) {
        throw404()
        return
    }

    if (VALID_PAGE_TYPES.SERVICE_PAGE) {
        servicePageStore.SET_SERVICE_PAGE_DATA(response)
    }

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
        fatal: true
    })
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
    script: [
        {
            'data-id': 'micromarkup-org',
            children: returnServiceMarkup(serviceData.value),
            type: 'application/ld+json',
            body: true,
        },
        {
            type: 'application/ld+json',
            children: getMedicalWebpageMarkup({
                serviceData: serviceData.value,
                staticData: staticData,
                path: route.path,
                lang: locale.value
            }),
            body: true,
        },
    ]
})

onBeforeRouteLeave(() => rootStore.RESET_PAGE_DATA())
</script>