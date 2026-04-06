<template>
    <div>
        <component :is="pages[data?.restId]?.viewComponent" v-if="data?.restId" />
        <AppLangHiddenLinks v-if="data?.response?.locales" :locales="data.response.locales" />
    </div>
</template>

<script setup>
import { useRootStore } from '~/entities/root/store/root-store'
import { useDoctorsPageStore } from '~/views/DoctorsPage/store/doctors-page-store'
import { useDoctorPageStore } from '~/views/DoctorPage/store/doctor-page-store'
import { apiService } from '~/app/api'
import { getQueries } from '~/shared/utils/queryHelper'
import { returnAlternates } from '~/shared/utils/seo/alternates'
import { returnDoctorMarkup } from '~/shared/utils/seo/doctorMarkup'
import { returnOpenGraph } from '~/shared/utils/seo/openGraph.js'
import { ERROR_REST_ID, VALID_PAGE_TYPES } from '~/shared/utils/pages'
import { useConfig } from '~/shared/composables/useConfig'
import { generateMetaUsers } from '~/shared/utils/seo/meta-users'
import AppLangHiddenLinks from '~/shared/ui/Links/AppLangHiddenLinks'

const { locale } = useI18n()
const rootStore = useRootStore()
const route = useRoute()
const doctorsPageStore = useDoctorsPageStore()
const doctorPageStore = useDoctorPageStore()
const { isDevMode } = useConfig()
const { doctorPageData } = toRefs(doctorPageStore)

const config = useRuntimeConfig()
const blogTypes = Object.values(VALID_PAGE_TYPES)

const pages = {
    [VALID_PAGE_TYPES.DOCTORS_PAGE]: {
        viewComponent: defineAsyncComponent(() => import('~/views/DoctorsPage/DoctorsPage.vue')),
        saveData: (payload) => doctorsPageStore.SET_DOCTORS_PAGE_DATA(payload)
    },
    [VALID_PAGE_TYPES.DOCTOR_CARD_PAGE]: {
        viewComponent: defineAsyncComponent(() => import('~/views/DoctorPage/DoctorPage.vue')),
        saveData: (payload) => doctorPageStore.SET_DOCTOR_PAGE_DATA(payload)
    }
}

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

const isDoctorPage = computed(() => data.value?.restId === VALID_PAGE_TYPES.DOCTOR_CARD_PAGE)

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
    ...isDoctorPage.value && {
        script: [
            { 'data-id': 'micromarkup-org', children: returnDoctorMarkup(doctorPageData.value), type: 'application/ld+json' }
        ]
    }
})

onBeforeRouteLeave(() => rootStore.RESET_PAGE_DATA())
</script>