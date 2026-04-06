<template>
    <Transition name="transform">
        <div :key="isVisible" :class="['burger-menu', { 'is-visible': isVisible }]">
            <AppContainer>
                <div class="burger-menu__inner">
                    <div class="burger-menu__header">
                        <div class="burger-menu__heading">
                            <div class="burger-menu__company">
                                <div class="burger-menu__logo">
                                    <LogoLargeIcon class="burger-menu__logo-icon is-desktop-only" />
                                    <LogoSmallIcon class="burger-menu__logo-icon is-desktop-hide" />
                                </div>
                                <div class="burger-menu__company-text-block">
                                    <div class="burger-menu__company-description">
                                        {{ $t('global.company.description') }}
                                    </div>
                                    <StarIcon class="burger-menu__star-icon" />
                                </div>
                            </div>
                            <span class="burger-menu__heading-title">
                                Меню
                            </span>
                        </div>
                        <div class="burger-menu__actions">
                            <LangSwitcher />
                            <AppButtonTypeIcon @click="handleCloseClick">
                                <CloseIcon />
                            </AppButtonTypeIcon>
                        </div>
                    </div>
                    <div class="burger-menu__content">
                        <div class="burger-menu__main-items">
                            <HeaderMenuItem
                                class="burger-menu__main-item"
                                :item="serviceItem"
                                :is-link="false"
                                lazy-image
                                @click="handleServicesClick"
                            />
                            <NuxtLink 
                                v-for="item in mainLinks"
                                :key="item.id"
                                :to="{ path: localePath(item.url), force: true }"
                                class="burger-menu__main-item"
                            >
                                <HeaderMenuItem
                                    :item="item"
                                    is-link
                                    lazy-image
                                />
                            </NuxtLink>
                        </div>
                        <div class="burger-menu__side">
                            <div class="burger-menu__other-links">
                                <HeaderLinkTag 
                                    v-for="item in otherLinks"
                                    :key="item.id"
                                    :to="localePath(item.url)"
                                >
                                    {{ item.title }}
                                </HeaderLinkTag>
                            </div>
                            <AppButton
                                v-if="route"
                                :to="route"
                                class="burger-menu__route-btn"
                                target="_blank"
                            >
                                Маршрут
                            </AppButton>
                        </div>
                    </div>
                </div>
            </AppContainer>
        </div>
    </Transition>
</template>

<script setup>
import { useHeaderStore } from '../store/header-store'
import { useStaticDataStore } from '~/entities/root/store/static-data-store'
import { useActiveModalsStore } from '~/entities/active-modals/store/active-modals'
import { MODALS_KEYS } from '~/entities/active-modals/constants'

import AppButtonTypeIcon from '~/shared/ui/Buttons/AppButtonTypeIcon.vue'
import LangSwitcher from '~/entities/lang-switcher/LangSwitcher.vue'
import AppButton from '~/shared/ui/Buttons/AppButton.vue'
import AppContainer from '~/shared/ui/Containers/AppContainer.vue'
import HeaderMenuItem from './HeaderMenuItem.vue'
import HeaderLinkTag from './HeaderLinkTag.vue'

import LogoLargeIcon from '@/shared/assets/icons/logo-desktop.svg'
import LogoSmallIcon from '@/shared/assets/icons/logo-sm.svg'
import CloseIcon from '@/shared/assets/icons/close.svg'
import StarIcon from '~/shared/assets/icons/star.svg'

const props = defineProps({
    isVisible: {
        type: Boolean
    }
})

const localePath = useLocalePath()
const headerStore = useHeaderStore()
const staticData = useStaticDataStore()
const activeModalsStore = useActiveModalsStore()

const otherLinks = computed(() => staticData?.headerMenu?.left?.items)
const serviceItem = computed(() => staticData.headerMenu?.right?.items.find((item) => !!item?.services_link))
const mainLinks = computed(() => staticData.headerMenu?.right?.items.filter((item) => !item.services_link))
const route = computed(() => staticData.address?.values[0]?.url)

const handleServicesClick = () => {
    headerStore.TOGGLE_SERVICES()
    activeModalsStore.ADD_ACTIVE_KEYS([MODALS_KEYS.SERVICES])
}

const handleCloseClick = () => {
    headerStore.TOGGLE_MENU()
    activeModalsStore.REMOVE_ACTIVE_KEYS([MODALS_KEYS.BURGER, MODALS_KEYS.SERVICES])
}
</script>

<style lang="scss" scoped>
.burger-menu {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    display: none;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    background-color: $secondary-100;

    &.is-visible {
        display: block;
    }

    &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px 0 10px;

        @media (min-width: $tablet-breakpoint) {
            padding: 30px 0 15px;
        }

        @media (min-width: $desktop-breakpoint) {
            padding: 40px 0 20px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            padding: 48px 0 24px;
        }
    }

    &__heading {
        display: flex;
        align-items: center;
        gap: 20px;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 140%;

        @media (min-width: $desktop-breakpoint) {
            gap: 40px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
        }
    }

    &__heading-title {
        @media (min-width: $tablet-breakpoint) {
            font-size: 16px;
        }

        @media (min-width: $desktop-breakpoint) {
            font-size: 18px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 20px;
        }
    }

    &__logo {
        display: flex;
        align-items: center;

        @media (min-width: $desktop-breakpoint) {
            margin-top: 3px;
        }
    }

    &__company {
        @media (min-width: $lg-desktop-breakpoint) {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 106px;
            // min-width: 480px;
            padding: 16px 24px;
            border: 1px solid $dark-500;
            border-radius: 12px;
        }
    }

    &__company-text-block {
        display: none;

        @media (min-width: $lg-desktop-breakpoint) {
            display: flex;
            align-items: center;
            gap: 20px;
            height: 100%;
        }
    }

    &__company-description {
        display: none;

        @media (min-width: $lg-desktop-breakpoint) {
            display: block;
            width: 150px;
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 140%;
            color: $primary-300;
        }
    }

    &__star-icon {
        display: none;

        @media (min-width: $lg-desktop-breakpoint) {
            display: flex;
            height: 28px;
            max-width: 28px;
            min-width: 28px;
        }
    }

    &__logo-icon {
        fill: $dark-500;
    }

    &__actions {
        display: flex;
        gap: 5px;
    }

    &__content {
        padding: 20px 0;

        @media (min-width: $tablet-breakpoint) {
            padding: 30px 0;
        }

        @media (min-width: $desktop-breakpoint) {
            display: flex;
            flex-direction: row-reverse;
            gap: 5.3333%;
            padding: 40px 0;
        }
    }

    &__side {
        @media (min-width: $desktop-breakpoint) {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            width: 32%;
        }
    }

    &__main-items {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 20px;
        
        @media (min-width: $tablet-breakpoint) {
            margin-bottom: 30px;
        }

        @media (min-width: $desktop-breakpoint) {
            width: 62.6667%;
            margin-bottom: 0;
        }
    }

    &__other-links {
        margin-bottom: 20px;

        @media (min-width: $tablet-breakpoint) {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            margin-bottom: 30px;
        }
    }

    &__main-item {
        width: 50%;

        @media (min-width: $desktop-breakpoint) {
            width: 33.333%;
        }
    }

    &__route-btn {
        width: 50%;
    }
}

.transform-enter-active,
.transform-leave-active {
    transition: .5s cubic-bezier(.05, 1.06, .54, 1.12);
    transform: translateY(0);
}

.transform-enter-from,
.transform-leave-to {
    transform: translateY(-100%);
}
</style>