<template>
    <header :class="['header', { 'header--sticky': isSticky }]">
        <AppContainer>
            <div class="header__inner">
                <HeaderCompany />
                <HeaderOptions />
                <HeaderInfo
                    :title="staticData.address?.title"
                    :description="staticData.address?.values[0]?.phone_desc"
                />
                <HeaderPairedButtons />
                <button
                    type="button"
                    class="header__burger-menu-btn"
                    :title="$t('header.burgerMenu')"
                    @click="handleMenuClick"
                >
                    <BurgerMenuIcon class="header__menu-icon" />   
                </button>
            </div>
        </AppContainer>
        <HeaderBurgerMenu :is-visible="headerStore.isMenuOpened" />
        <HeaderServices :is-visible="headerStore.isServicesOpened" />
    </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useHeaderStore } from './store/header-store'
import { useActiveModalsStore } from '~/entities/active-modals/store/active-modals'
import { useStaticDataStore } from '~/entities/root/store/static-data-store'

import AppContainer from '~/shared/ui/Containers/AppContainer.vue'
import HeaderOptions from './ui/HeaderOptions.vue'
import HeaderBurgerMenu from './ui/HeaderBurgerMenu.vue'
import HeaderServices from './ui/HeaderServices.vue'

import BurgerMenuIcon from '~/shared/assets/icons/burder-menu.svg'
import { MODALS_KEYS } from '~/entities/active-modals/constants'
import HeaderPairedButtons from './ui/HeaderPairedButtons.vue'
import HeaderCompany from '~/shared/ui/Header/HeaderCompany.vue'
import HeaderInfo from '~/shared/ui/Header/HeaderInfo.vue'

const headerStore = useHeaderStore()
const activeModalsStore = useActiveModalsStore()
const staticData = useStaticDataStore()

const isSticky = ref(false)

function handleScroll() {
    isSticky.value = window.scrollY > 50
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})

function handleMenuClick() {
    headerStore.TOGGLE_MENU()
    activeModalsStore.ADD_ACTIVE_KEYS([MODALS_KEYS.BURGER])
}
</script>

<style lang="scss" scoped>
.header {
    position: sticky;
    top: 0;
    z-index: 100;
    padding: 20px 0 10px;
    background-color: transparent;
    transition: padding .3s ease, background-color .3s ease, box-shadow .3s ease;

    @media (min-width: $tablet-breakpoint) {
        padding: 30px 0 15px;
    }

    @media (min-width: $desktop-breakpoint) {
        padding: 40px 0 20px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        padding: 48px 0 24px;
    }

    &--sticky {
        padding: 12px 0;
        background-color: rgba(255, 255, 255, .25);
        backdrop-filter: blur(12px);
        box-shadow: 0 2px 20px rgba(0, 0, 0, .08);

        @media (min-width: $tablet-breakpoint) {
            padding: 14px 0;
        }

        @media (min-width: $desktop-breakpoint) {
            padding: 16px 0;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            padding: 18px 0;
        }
    }

    &__inner {
        display: flex;
        align-items: center;
        gap: 5px;
    }

    &__burger-menu-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 48px;
        max-width: 48px;
        min-width: 48px;
        cursor: pointer;
        background-color: $light;
        border: none;
        border-radius: 6px;
        transition: background-color $base-ui-transition;

        @media (any-hover: hover) {
            &:hover {
                background-color: $primary-300;

                svg {
                    stroke: $light;
                }
            }
        }

        @media (min-width: $desktop-breakpoint) {
            height: 56px;
            max-width: 56px;
            min-width: 56px;
            border-radius: 10px;
        }
        
        @media (min-width: $lg-desktop-breakpoint) {
            max-width: 72px;
            min-width: 72px;
            min-height: 72px;
        }
    }

    &__menu-icon {
        stroke: $dark-500;
        width: 16px;
        height: 12px;
        transition: stroke $base-ui-transition;

        @media (min-width: $desktop-breakpoint) {
            width: 18px;
            height: 14px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            width: 20px;
            height: 16px;
        }
    }
}
</style>