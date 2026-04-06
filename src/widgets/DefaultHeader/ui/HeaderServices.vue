<template>
    <Transition name="transform">
        <div :key="isVisible" :class="['services-menu', { 'is-visible': isVisible }]">
            <HeaderStepModal
                :sub-step-title="headerStore?.selectedService?.title"
                is-prev-visible
                @close="onClose"
                @heading-prev-click="onPrevStepClick"
            >
                <div :class="['services-menu__items', { 'services-menu__items--hidden': headerStore?.selectedService }]">
                    <div
                        v-for="item in selectableList"
                        :key="item.tid"
                        class="services-menu__item"
                        @click="selectService(item)"
                    >
                        <HeaderServiceItem :item="item" lazy-image />
                    </div>
                    <NuxtLink
                        v-for="item in linksList"
                        :key="item.tid"
                        :to="{ path: localePath(item.alias), force: true }"
                        class="services-menu__item"
                    >
                        <HeaderServiceItem :item="item" is-link lazy-image />
                    </NuxtLink>
                </div>
                <div
                    v-for="item in selectableList"
                    :key="item.title"
                    :class="
                        ['services-menu__item-content', 
                         { 'services-menu__item-content--active': isContentActive(item) }
                        ]"
                >
                    <HeaderServiceItemContent :data="item" @prev-click="handleDesktopPrevClick" />
                </div>
            </HeaderStepModal>
        </div>
    </Transition>
</template>

<script setup>
import { useHeaderStore } from '../store/header-store'
import { useStaticDataStore } from '~/entities/root/store/static-data-store'
import HeaderStepModal from './HeaderStepModal.vue'
import HeaderServiceItem from './HeaderServiceItem.vue'
import HeaderServiceItemContent from './HeaderServiceItemContent.vue'
import { useActiveModalsStore } from '~/entities/active-modals/store/active-modals'
import { MODALS_KEYS } from '~/entities/active-modals/constants'

defineProps({
    isVisible: {
        type: Boolean
    }
})

const headerStore = useHeaderStore()
const staticData = useStaticDataStore()
const activeModalsStore = useActiveModalsStore()
const localePath = useLocalePath()

const linksList = computed(() => staticData.services?.filter((item) => item.children?.length === 0))
const selectableList = computed(() => staticData.services?.filter((item) => item.children?.length > 0))

const isContentActive = (item) => headerStore.selectedService?.title === item?.title

function onClose() {
    headerStore.TOGGLE_SERVICES()
    headerStore.CLOSE_SUB_MENU()
    activeModalsStore.REMOVE_ACTIVE_KEYS([MODALS_KEYS.SERVICES])
}

function onPrevStepClick() {
    if (headerStore.selectedService) {
        headerStore.CLOSE_SUB_MENU()
    } else {
        headerStore.TOGGLE_SERVICES()
    }
}

function selectService(item) {
    headerStore.SET_SERVICE(item)
}

function handleDesktopPrevClick() {
    headerStore.CLOSE_SUB_MENU()
}
</script>

<style lang="scss" scoped>
.services-menu {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    display: none;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    background-color: $secondary-100;
    transition: $base-ui-transition;

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
        display: none;

        @media (min-width: $lg-desktop-breakpoint) {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 106px;
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
            width: 128px;
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

    &__items {    
        @media (min-width: $desktop-breakpoint) {
            display: flex;
            flex-wrap: wrap;
        }

        &--hidden {
            display: none;
        }
    }

    &__item {
        @media (min-width: $desktop-breakpoint) {
            width: 20%;
        }
    }

    &__item-content {
        position: absolute;
        top: 20px;
        left: 0;
        display: none;
        width: 100%;

        @media (min-width: $tablet-breakpoint) {
            top: 30px;
        }

        @media (min-width: $desktop-breakpoint) {
            top: 40px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            top: 48px;
        }

        :deep(.service-content__intro) {
            transition: $base-ui-transition;
            transform: translateX(-100px);
            
            @media (min-width: $desktop-breakpoint) {
                transform: translateX(-200px);
            }
        }

        :deep(.service-content__content) {
            transition: $base-ui-transition;
            transform: translateX(-100px);

            @media (min-width: $desktop-breakpoint) {
                transform: translate(-500px, 300px);
            }
        }

        &--active {
            display: block;

            :deep(.service-content__intro) {
                transform: translateX(0);
            }

            :deep(.service-content__content) {
                transform: translate(0, 0);
            }
        }
    }
}

.transform-enter-active,
.transform-leave-active {
    @media (min-width: $desktop-breakpoint) {
        transition: .5s cubic-bezier(.05, 1.06, .54, 1.12);
        transform: translateY(0);
    }
}

.transform-enter-from,
.transform-leave-to {
    @media (min-width: $desktop-breakpoint) {
        transform: translateY(-100%);   
    }
}
</style>