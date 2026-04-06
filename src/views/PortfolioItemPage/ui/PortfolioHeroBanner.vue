<template>
    <div class="portfolio-hero-banner">
        <AppBreadcrumbs v-if="breadcrumbs" :breadcrumbs="breadcrumbs" />
        <div class="portfolio-hero-banner__inner">
            <div
                :class="[
                    'portfolio-hero-banner__img', 
                    { 'portfolio-hero-banner__img--with-video': !!data.videos?.length }
                ]"
                :data-popup-video="data.videos?.length ? data.videos[0] : null"
            >
                <AppImage
                    :urls="data.image?.urls"
                    :alt="data.image?.alt"
                    :title="data.image?.title"
                    fit="cover"
                    preload
                    fetch-priority="high"
                />
                <div
                    v-if="data.videos?.length"
                    class="portfolio-hero-banner__video-play"
                >
                    <VideoPlayIcon :area-label="data.image?.title" />
                </div>
            </div>
            <div class="portfolio-hero-banner__content">
                <h1 class="portfolio-hero-banner__title">
                    {{ data?.title }}
                </h1>
                <div class="portfolio-hero-banner__desc">
                    {{ data?.description }}
                </div>
                <div class="portfolio-hero-banner__button">
                    <div class="portfolio-hero-banner__button-inner">
                        <AppButton full-width @on-click="onOpenAppointmentModal">
                            {{ $t('global.buttons.similarCase') }}
                        </AppButton>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import AppBreadcrumbs from '~/shared/ui/Navigation/AppBreadcrumbs.vue'
import AppButton from '~/shared/ui/Buttons/AppButton.vue'
import AppImage from '~/shared/ui/Media/AppImage.vue'

import { useRootStore } from '~/entities/root/store/root-store'
import { useStaticDataStore } from '~/entities/root/store/static-data-store'
import { useModalsStore } from '~/entities/modals/store/modals-store'
// import { useAppointmentModalStore } from '~/entities/modals/ui/AppointmentModal/store/appointment-modal-store.js'
import { useActiveModalsStore } from '~/entities/active-modals/store/active-modals'
import { MODALS_KEYS } from '~/entities/active-modals/constants'
import { MARKETING_EVENTS } from '~/shared/utils/marketing/dataLayerEvents'

import VideoPlayIcon from '~/entities/case-categories/assets/icons/video-play.svg'

defineProps({
    data: {
        type: Object,
        required: true
    },
    breadcrumbs: {
        type: [Array, null],
        default: null
    }
})

const rootStore = useRootStore()
const staticData = useStaticDataStore()

// const appointmentModalStore = useAppointmentModalStore()
const activeModalsStore = useActiveModalsStore()
const modalsStore = useModalsStore()

const { t } = useI18n()

const onOpenAppointmentModal = async () => {
    const selectedMarketing = rootStore?.pageMarketing || staticData?.defaultMarketingLead || null

    const { useAppointmentModalStore } = await import('~/entities/modals/ui/AppointmentModal/store/appointment-modal-store.js')
    const appointmentModalStore = useAppointmentModalStore()

    appointmentModalStore.SET_EVENT(MARKETING_EVENTS.PORTFOLIO)
    appointmentModalStore.SET_APPOINTMENT_MODAL_DATA({
        title: t('appointmentModal.title'),
        button: t('global.buttons.appointment')
    })
    appointmentModalStore.SET_SYSTEM_NAME('portfolio-hero-banner')
    appointmentModalStore.SET_MARKETING(selectedMarketing)
    modalsStore.TOGGLE_APPOINTMENT_MODAL()
    activeModalsStore.ADD_ACTIVE_KEYS([MODALS_KEYS.APPOINTMENT])
}
</script>

<style lang="scss" scoped>
.portfolio-hero-banner {
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

    &__inner {
        display: flex;
        flex-direction: column;
        gap: 20px;
        margin-top: 5px;

        @media (min-width: $tablet-breakpoint) {
            gap: 30px;
            margin-top: 8px;
        }

        @media (min-width: $desktop-breakpoint) {
            flex-direction: row-reverse;
            gap: 5.33%;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 96px;
            margin-top: 16px;
        }
    }

    &__img {
        position: relative;
        height: 200px;
        overflow: hidden;
        border-radius: 15px;

        @media (any-hover: hover) and (min-width: $tablet-breakpoint) {
            &:hover {
                .portfolio-hero-banner__video-play {
                    background: rgba($primary-400, .5);
                }
            }
        }

        @media (min-width: $tablet-breakpoint) {
            height: 360px;
            border-radius: 20px;
        }

        @media (min-width: $desktop-breakpoint) {
            width: 100%;
            height: 384px;
            border-radius: 25px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            height: 526px;
            border-radius: 30px;
        }

        &--with-video {
            cursor: pointer;
        }
    }

    &__content {
        display: flex;
        flex-direction: column;
        gap: 20px;

        @media (min-width: $tablet-breakpoint) {
            gap: 30px;
        }

        @media (min-width: $desktop-breakpoint) {
            justify-content: space-between;
            gap: 40px;
            width: 100%;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 48px;
        }
    }

    &__title {
        font-size: 32px;
        font-weight: 700;
        line-height: 120%;

        @media (min-width: $tablet-breakpoint) {
            font-size: 40px;
        }

        @media (min-width: $desktop-breakpoint) {
            font-size: 48px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 64px;
        }
    }

    &__desc {
        font-size: 20px;
        font-weight: 400;
        line-height: 120%;

        @media (min-width: $tablet-breakpoint) {
            font-size: 22px;
        }

        @media (min-width: $desktop-breakpoint) {
            font-size: 24px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 32px;
        }
    }

    &__button {
        display: flex;
        justify-content: flex-end;
    }

    &__button-inner {
        width: 50%;
    }

    &__video-play {
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 3;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        background: rgba(45, 194, 187, .25);
        border-radius: 15px;
        transition: background $base-ui-transition;
        transform: translate(-50%, -50%);
        /* stylelint-disable-next-line property-no-vendor-prefix */
        -webkit-backdrop-filter: blur(5px);
        backdrop-filter: blur(5px);
    }
}
</style>