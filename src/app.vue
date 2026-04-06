<template>
    <NuxtLoadingIndicator color="#169A94" />
    <NuxtLayout>
        <img
            style="position: fixed;left: 3vw;z-index: -1;width: 92vw;height: 110vh;pointer-events: none;user-select: none;"
            loading="eager"
            src="/shared/assets/images/banner-push.webp"
            alt="logo"
            fetchpriority="high"
        >
        <NuxtPage />
    </NuxtLayout>
    <AppToast />
    <Transition name="opacity">
        <AppLoading v-if="rootStore.isLoading" />
    </Transition>
    <ModalsList />
</template>

<script setup lang="ts">
import { useRootStore } from './entities/root/store/root-store'
import { useActiveModalsStore } from './entities/active-modals/store/active-modals'
import { useStaticDataStore } from './entities/root/store/static-data-store'
import { useModalsStore } from './entities/modals/store/modals-store'
import { useHeaderStore } from './widgets/DefaultHeader/store/header-store'
import { rootService } from './entities/root/api'

import AppToast from './shared/ui/Toast/AppToast.vue'
import ModalsList from './entities/modals/ModalsList.vue'

import { renderCompanyAdInConsole } from './shared/constants'
import { generateGtmNoScript, generateGtmStartScript } from '~/shared/utils/marketing/scripts'
import { waitForBinotelAndReplacePhones } from './shared/utils/binotelHelpers'
import manropeFontWoff2 from '@/app/fonts/manrope/Manrope-Regular.woff2'
import { scrollController } from './shared/utils/scrollController'
import type { IStaticData } from './shared/interfaces/staticData'

const AppLoading = defineAsyncComponent(() => import('./shared/ui/Loading/AppLoading.vue'))

const rootStore = useRootStore()
const headerStore = useHeaderStore()
const activeModalsStore = useActiveModalsStore()
const modalsStore = useModalsStore()
const route = useRoute()
const nuxtApp = useNuxtApp()

const staticDataStore = useStaticDataStore() as IStaticData
const { locale } = useI18n()

await useAsyncData('staticData', async () => await populateStaticData())

async function populateStaticData() {
    try {
        const response = await rootService.getStaticData(locale.value)
        staticDataStore.SET_DATA(response)
        return response
    } catch (error) {
        console.log('Error occurred in populateStaticData', error)
    }
}

const { isAnyModalActive } = storeToRefs(activeModalsStore)

watch(() => route.path, () => {
    headerStore.CLOSE_ALL_MENUS()
    activeModalsStore.RESET_ALL_ACTIVE_MODALS()
    modalsStore.CLOSE_ALL_MODALS()
}, { deep: true })

watch(() => isAnyModalActive.value, (disable) => {
    if (disable) {
        scrollController.disable()
    } else {
        scrollController.enable()
    }
}, { deep: true })

watch(() => locale.value, () => populateStaticData())

useHead({
    htmlAttrs: {
        lang: () => locale.value
    },
    link: [
        {
            rel: 'preload',
            href: manropeFontWoff2,
            crossorigin: '',
            as: 'font',
            type: 'font/woff2'
        }
    ],
    script: [generateGtmStartScript()],
    noscript: [generateGtmNoScript()]
})

nuxtApp.hook('page:finish', () => {
    waitForBinotelAndReplacePhones()
})

onMounted(() => {
    renderCompanyAdInConsole()
})
</script>

<style lang="scss">
@import '@/app/styles/index.scss';

.opacity-enter-active,
.opacity-leave-active {
    pointer-events: none;
    transition: .5s;
}

.opacity-enter-from,
.opacity-leave-to {
    opacity: 0;
}
</style>