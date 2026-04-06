<template>
    <NuxtLayout :name="locale === 'en' ? 'simplified' : 'default'">
        <AppContainer>
            <div class="not-found">
                <picture class="not-found__picture">
                    <source media="(min-width: 1280px)" :srcset="notFoundImageDesktop">
                    <img
                        :src="notFoundImageSmall"
                        class="not-found__image"
                        alt="404"
                        title="404"
                    >
                </picture>
                <div class="not-found__content">
                    <div class="not-found__title">
                        {{ $t('global.notFound.title') }}
                    </div>
                    <div class="not-found__content-inner">
                        <template v-if="locale !== 'en'">
                            <div class="not-found__links-title">
                                {{ $t('global.notFound.linksTitle1') }}
                            </div>
                            <div class="not-found__links">
                                <AppTag
                                    v-for="item in staticData.notFoundLinks"
                                    :key="item.url"
                                    :to="localePath(item.url)"
                                >
                                    {{ item.text }}
                                </AppTag>
                            </div>
                            <div class="not-found__links-title">
                                {{ $t('global.notFound.linksTitle2') }}
                            </div>
                        </template>
                        <AppTag :to="locale !== 'en' ? localePath('/') : '/'">
                            {{ $t('global.notFound.homeLink') }}
                        </AppTag>
                    </div>
                </div>
            </div>
        </AppContainer>
    </NuxtLayout>
</template>

<script setup>
import { useActiveModalsStore } from './entities/active-modals/store/active-modals'
import { useDisabledScroll } from './shared/composables/useDisabledScroll'
import { useRouteChangeWatcher } from './shared/composables/usePageLeaveWatcher'
import { useHeaderStore } from './widgets/DefaultHeader/store/header-store'

import AppContainer from './shared/ui/Containers/AppContainer.vue'
import AppTag from './shared/ui/Tags/AppTag.vue'

import notFoundImageDesktop from './shared/assets/images/404/404-desktop.png'
import notFoundImageSmall from './shared/assets/images/404/404-sm.png'
import { useStaticDataStore } from './entities/root/store/static-data-store'
import { rootService } from './entities/root/api'

const activeModalsStore = useActiveModalsStore()
const staticData = useStaticDataStore()
const { isAnyModalActive } = storeToRefs(activeModalsStore)
const headerStore = useHeaderStore()
const { locale } = useI18n()
const localePath = useLocalePath()

const staticDataStore = useStaticDataStore()

const { data } = await useAsyncData('staticData', async () => await populateStaticData())

async function populateStaticData() {
    const response = await rootService.getStaticData(locale.value)

    staticDataStore.SET_DATA(response)

    return response
}

watch(() => locale.value, () => populateStaticData())

useRouteChangeWatcher(() => {
    headerStore.CLOSE_ALL_MENUS()
    activeModalsStore.RESET_ALL_ACTIVE_MODALS()    
})
onMounted(() => activeModalsStore.RESET_ALL_ACTIVE_MODALS())
useDisabledScroll(isAnyModalActive)
</script>

<style scoped lang="scss">
.not-found {
    padding: 20px 0;

    @media (min-width: $tablet-breakpoint) {
        padding: 30px 0;
    }

    @media (min-width: $desktop-breakpoint) {
        display: flex;
        gap: 64px;
        padding: 40px 0;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        padding: 48px 0;
    }

    &__picture {
        @media (min-width: $desktop-breakpoint) {
            width: 50%;
        }
    }

    &__image {
        width: 100%;
        height: 240px;
        margin-bottom: 20px;
        object-fit: cover;
        border-radius: 15px;

        @media (min-width: $tablet-breakpoint) {
            height: 360px;
            margin-bottom: 30px;
            border-radius: 20px;
        }

        @media (min-width: $desktop-breakpoint) {
            height: 432px;
            margin-bottom: 0;
            border-radius: 25px;
        }
      
        @media (min-width: $lg-desktop-breakpoint) {
            height: 624px;
            border-radius: 30px;
        }
    }

    &__content {
        @media (min-width: $desktop-breakpoint) {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: space-between;
            width: 50%;
        }
    }

    &__title {
        margin-bottom: 20px;
        font-size: 32px;
        font-style: normal;
        font-weight: 700;
        line-height: 120%;
        color: $dark-500;

        @media (min-width: $tablet-breakpoint) {
            margin-bottom: 30px;
            font-size: 40px;
        }

        @media (min-width: $desktop-breakpoint) {
            font-size: 48px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 64px;
        }
    }

    &__links-title {
        margin-bottom: 8px;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 140%;

        @media (min-width: $tablet-breakpoint) {
            margin-bottom: 12px;
            font-size: 16px;
        }

        @media (min-width: $desktop-breakpoint) {
            margin-bottom: 14px;
            font-size: 18px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            margin-bottom: 16px;
            font-size: 20px;
        }
    }

    &__links {
        margin-bottom: 20px;

        @media (min-width: $tablet-breakpoint) {
            margin-bottom: 30px;
        }

        @media (min-width: $desktop-breakpoint) {
            margin-bottom: 40px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            margin-bottom: 48px;
        }
    }
}
</style>