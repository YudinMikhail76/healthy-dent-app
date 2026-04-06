<template>
    <div class="page">
        <HomeView />
    </div>
</template>

<script setup>
import HomeView from '~/views/HomePage/HomeView.vue'
import { apiService } from '@/app/api'
import { useRootStore } from '~/entities/root/store/root-store'
import { useConfig } from '~/shared/composables/useConfig'
import { useHomePageStore } from '~/views/HomePage/store/home-page-store'
import { useStaticDataStore } from '~/entities/root/store/static-data-store'
import { returnAlternates } from '~/shared/utils/seo/alternates'
import { returnOrganizationalMarkup } from '~/shared/utils/seo/organizationalMarkup'
import { returnOpenGraph } from '~/shared/utils/seo/openGraph.js'
import { ERROR_REST_ID } from '~/shared/utils/pages'
import { generateMetaUsers } from '~/shared/utils/seo/meta-users'

const { locale, t } = useI18n()

const rootStore = useRootStore()
const staticDataStore = useStaticDataStore()
const homeStore = useHomePageStore()
const config = useRuntimeConfig()
const { isDevMode } = useConfig()

const HOME_PAGE_ID = 5

const { data, error } = await useAsyncData(async () => {
    const response = await apiService.getNodePage({
        lang: locale.value,
        pageId: HOME_PAGE_ID
    })
    homeStore.SET_HOME_PAGE_DATA(response)

    if (response?.marketing) {
        rootStore.SET_PAGE_MARKETING(response.marketing)
    }
    if (response?.locales) {
        rootStore.SET_LOCALES(response.locales)
    }

    return preparedData(response)
})

function preparedData(response) {
    const restId = response?.rest_id || null

    if (response.redirect_url) {
        return { redirect: response.redirect_url }
    }

    if (restId === ERROR_REST_ID) {
        throw404()
        return
    }

    return { response, restId }
}

handleError(error)
handleRedirect(data)

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

function handleError(error) {
    if (error.value && error.value.statusCode === 404) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Page Not Found',
            fatal: true
        })
    }
}

useHead({
    title: () => data.value.response.metatags.head_title,
    meta: [
        { name: 'description', content: () => data.value.response.metatags.description },
        { name: 'robots', content: () => isDevMode ? 'noindex, nofollow' : data.value.response.metatags.noindex },
        ...returnOpenGraph(data.value.response.metatags),
        ...generateMetaUsers(data.value.response.metatags)
    ],
    link: [
        { rel: 'canonical', href: () => config.public.SITE_URL + data.value.response.metatags.canonical },
        ...returnAlternates(data.value.response.metatags)
    ],
    script: [
        {
            'data-id': 'micromarkup-org',
            children: returnOrganizationalMarkup({
                staticData: staticDataStore,
                metatags: data.value.response.metatags,
                legalName: t('company.legalName'),
                alternateName: t('company.alternateName'),
            }),
            body: true,
            type: 'application/ld+json'
        }
    ]
})

onBeforeRouteLeave(() => rootStore.RESET_PAGE_DATA())
</script>
