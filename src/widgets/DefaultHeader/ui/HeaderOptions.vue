<template>
    <div class="header__options">
        <button
            type="button"
            class="header__services-btn"
        >
            <NuxtLink
                v-if="servicesObj?.url"
                :to="localePath(servicesObj?.url)"
                class="header__services-title"
            >
                {{ $t('header.services.title') }}
            </NuxtLink>
            <div class="header__chevron-btn" @click="handleServicesClick">
                <ChevronBottomIcon class="header__services-angle-down" />
            </div>
        </button>
        <NuxtLink
            v-if="pricesObj?.url"
            type="button"
            :to="localePath(pricesObj?.url)"
            class="header__prices-stockes-btn"
        >
            {{ $t('header.pricesAndStocks') }}
        </NuxtLink>
    </div>
</template>

<script setup lang="ts">
import { MODALS_KEYS } from '~/entities/active-modals/constants'
import { useHeaderStore } from '../store/header-store'
import { useActiveModalsStore } from '~/entities/active-modals/store/active-modals'

import ChevronBottomIcon from '~/shared/assets/icons/chevron-bottom-2.svg'
import { useStaticDataStore } from '~/entities/root/store/static-data-store'
import type { IStaticData } from '~/shared/interfaces/staticData'

const headerStore = useHeaderStore()
const activeModalsStore = useActiveModalsStore()
const staticData = useStaticDataStore() as IStaticData
const pricesObj = computed(() => staticData.headerMenu?.right?.items.find((item) => !!item.prices_link))
const servicesObj = computed(() => staticData.headerMenu?.right?.items.find((item) => !!item.services_link))
const localePath = useLocalePath()

const handleServicesClick = () => {
    headerStore.TOGGLE_SERVICES()
    activeModalsStore.ADD_ACTIVE_KEYS([MODALS_KEYS.SERVICES])
}
</script>

<style lang="scss" scoped>
.header {
    &__options {
        display: none;

        @media (min-width: $desktop-breakpoint) {
            display: flex;
            gap: 5px;
        }
    }

    &__services-btn {
        @media (any-hover: hover) {
            &:hover {
                background-color: $primary-500;
                
                .header__services-title {
                    color: $light;
                }

                svg {
                    stroke: $light;
                }

                &::after,
                &::before {
                    background-color: $light;
                }
            }
        }

        @media (min-width: $desktop-breakpoint) {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 56px;
            min-width: 171px;
            overflow: hidden;
            word-break: normal;
            cursor: pointer;
            background-color: $light;
            border: none;
            border-radius: 10px;
            transition: background-color $base-ui-transition;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            min-width: 204px;
            min-height: 72px;
        }

        &::after,
        &::before {
            content: '';
            position: absolute;
            right: 56px;
            width: 2px;
            height: 10px;
            background-color: $secondary-100;
            border-radius: 10px;

            @media (min-width: $lg-desktop-breakpoint) {
                right: 72px;
            }
        }

        &::after {
            top: 0;
        }

        &::before {
            bottom: 0;
        }
    }

    &__services-title {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        min-width: 115px;
        padding: 0 20px;
        font-family: $main-font;
        font-size: 18px;
        font-style: normal;
        font-weight: 700;
        line-height: 140%;
        color: $dark-500;
        word-break: normal;
        transition: background-color $base-ui-transition, color $base-ui-transition;

        @media (any-hover: hover) {
            &:hover {
                background-color: $primary-400;
            }
        }

        @media (min-width: $desktop-breakpoint) {
            padding: 0 20px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            min-width: 132px;
            padding: 0 24px;
            font-size: 20px;
        }
    }

    &__chevron-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 56px;
        height: 56px;
        transition: background-color $base-ui-transition;

        @media (any-hover: hover) {
            &:hover {
                background-color: $primary-400;
            }
        }

        @media (min-width: $lg-desktop-breakpoint) {
            width: 72px;
            height: 72px;
        }
    }

    &__services-angle-down {
        width: 20px;
        height: 20px;
        stroke: $dark-500;
        transition: stroke $base-ui-transition;
    }

    &__prices-stockes-btn {
        display: flex;
        align-items: center;
        
        @media (any-hover: hover) {
            &:hover {
                color: $light;
                background-color: $primary-500;
            }
        }

        @media (min-width: $desktop-breakpoint) {
            height: 56px;
            min-width: 150px;
            padding: 15.5px 20px;
            font-family: $main-font;
            font-size: 18px;
            font-style: normal;
            font-weight: 700;
            line-height: 140%;
            color: $dark-500;
            white-space: nowrap;
            cursor: pointer;
            background-color: $light;
            border: none;
            border-radius: 10px;
            transition: background-color $base-ui-transition, color $base-ui-transition;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            min-width: 170px;
            min-height: 72px;
            font-size: 20px;
        }
    }
}
</style>