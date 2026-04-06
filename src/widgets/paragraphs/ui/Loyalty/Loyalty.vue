<template>
    <div class="loyalty">
        <div class="loyalty__text">
            <div class="loyalty__title">
                {{ data.fields.string1 }}
            </div>
            <div class="loyalty__description" v-html="data.fields.text1" />
        </div>
        <div class="loyalty__services">
            <div class="loyalty__apps">
                <div class="loyalty__app">
                    <NuxtLink :to="localePath(data.fields.link2?.url)" aria-label="Apple Store">
                        <AppleStoreIcon />
                    </NuxtLink>
                </div>
                <div class="loyalty__app">
                    <NuxtLink :to="localePath(data.fields.link1?.url)" aria-label="GooglePlay">
                        <GooglePlayIcon />
                    </NuxtLink>
                </div>
            </div>
            <div class="loyalty__qr-code">
                <AppImage
                    :src="data.fields?.image1?.urls?.original"
                    :alt="data.fields.image1?.alt"
                    :title="data.fields.image1?.title"
                    loading="lazy"
                />
            </div>
            <AppButton
                class="loyalty__modal-btn"
                full-width
                @on-click="onOpenAppointmentModal"
            >
                {{ t('global.buttons.consultation') }}
            </AppButton>
        </div>
    </div>
</template>

<script setup>
import { useActiveModalsStore } from '~/entities/active-modals/store/active-modals'
import { useModalsStore } from '~/entities/modals/store/modals-store'
import AppButton from '~/shared/ui/Buttons/AppButton.vue'
import AppleStoreIcon from './assets/icons/apple-store.svg'
import GooglePlayIcon from './assets/icons/google-play.svg'
import AppImage from '~/shared/ui/Media/AppImage.vue'
import { MODALS_KEYS } from '~/entities/active-modals/constants'
import { MARKETING_EVENTS } from '~/shared/utils/marketing/dataLayerEvents'
import { useStaticDataStore } from '~/entities/root/store/static-data-store'
import { useRootStore } from '~/entities/root/store/root-store'

defineProps({
    data: {
        type: Object,
        required: true
    }
})

const { t } = useI18n()

const localePath = useLocalePath()
const rootStore = useRootStore()
const staticData = useStaticDataStore()
const activeModalsStore = useActiveModalsStore()
const modalsStore = useModalsStore()

const onOpenAppointmentModal = async () => {
    const selectedMarketing = rootStore?.pageMarketing || staticData?.defaultMarketingLead || null

    const { useAppointmentModalStore } = await import('~/entities/modals/ui/AppointmentModal/store/appointment-modal-store.js')
    const appointmentModalStore = useAppointmentModalStore()

    appointmentModalStore.SET_APPOINTMENT_MODAL_DATA({
        title: t('appointmentModal.title'),
        button: t('global.buttons.appointment')
    })
    appointmentModalStore.SET_EVENT(MARKETING_EVENTS.APPOINTMENT_DEFAULT)
    appointmentModalStore.SET_SYSTEM_NAME('loyalty')
    appointmentModalStore.SET_MARKETING(selectedMarketing)
    modalsStore.TOGGLE_APPOINTMENT_MODAL()
    activeModalsStore.ADD_ACTIVE_KEYS([MODALS_KEYS.APPOINTMENT])
}
</script>

<style lang="scss" scoped>
.loyalty {
    padding: 20px;
    margin: 40px 0;
    background-color: $dark-100;
    border-radius: 15px;

    @media (min-width: $tablet-breakpoint) {
        padding: 30px;
        border-radius: 20px;
    }

    @media (min-width: $desktop-breakpoint) {
        display: flex;
        padding: 40px;
        margin: 80px 0;
        border-radius: 25px;
    }
    
    @media (min-width: $lg-desktop-breakpoint) {
        padding: 48px;
        margin: 96px 0;
        border-radius: 30px;
    }

    &__title {
        margin-bottom: 20px;
        font-size: 20px;
        font-style: normal;
        font-weight: 700;
        line-height: 120%;

        @media (min-width: $desktop-breakpoint) {
            margin-bottom: 40px;
            font-size: 32px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 48px;
        }
    }

    &__text {
        @media (min-width: $desktop-breakpoint) {
            width: 50%;
        }
    }

    &__description {
        position: relative;
        padding: 0 20px;
        margin-bottom: 40px;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 120%;
        color: $primary-300;

        @media (min-width: $desktop-breakpoint) {
            padding: 0 29px;
            margin-bottom: 0;
            font-size: 20px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            padding: 0 35px;
            font-size: 24px;
        }

        &::before,
        &::after {
            content: '';
            position: absolute;
            width: 7px;
            height: 19px;
            background-repeat: no-repeat;
            background-size: contain;

            @media (min-width: $desktop-breakpoint) {
                width: 9px;
                height: 24px;
            }

            @media (min-width: $lg-desktop-breakpoint) {
                width: 11px;
                height: 29px;
            }
        }

        &::before {
            top: 0;
            left: 0;
            background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNCIgaGVpZ2h0PSIxOSIgdmlld0JveD0iMCAwIDQgMTkiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0wLjI0IDE4LjM5MlYwLjY0OEgzLjczNlYyLjM2SDEuOTUyVjE2LjY4SDMuNzM2VjE4LjM5MkgwLjI0WiIgZmlsbD0iIzFEQjBBOSIvPgo8L3N2Zz4K');
        }

        &::after {
            right: 0;
            bottom: 0;
            background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNCIgaGVpZ2h0PSIxOSIgdmlld0JveD0iMCAwIDQgMTkiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0zLjc2IDE4LjM5MlYwLjY0OEgwLjI2NFYyLjM2SDIuMDQ4VjE2LjY4SDAuMjY0VjE4LjM5MkgzLjc2WiIgZmlsbD0iIzFEQjBBOSIvPgo8L3N2Zz4K');
        }
    }

    &__services {
        @media (min-width: $desktop-breakpoint) {
            display: flex;
            flex-wrap: wrap;
            align-items: flex-start;
            justify-content: space-between;
            gap: 20px;
            width: 50%;
            padding-left: 64px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            padding-left: 96px;
        }
    }

    &__apps {
        display: flex;
        gap: 5px;
        margin-bottom: 20px;
    
        @media (min-width: $desktop-breakpoint) {
            flex-wrap: wrap;
            width: 151px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            padding: 19px 0;
        }
    }

    &__qr-code {
        display: none;

        @media (min-width: $desktop-breakpoint) {
            display: block;
            width: 96px;
            height: 96px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            width: 140px;
            height: 140px;
        }
    }

    &__modal-btn {
        @media (min-width: $desktop-breakpoint) {
            margin-top: auto;
        }
    }
}
</style>