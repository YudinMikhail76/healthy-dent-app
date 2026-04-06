<template>
    <div class="footer__main">
        <div class="footer__content">
            <div class="footer__center-col">
                <FooterServices v-if="staticData?.footerMenu?.items" />
            </div>
            <div class="footer__right-col">
                <FooterInfo
                    v-if="staticData?.address"
                    :address="staticData.address?.values[0]"
                    :work-hours="staticData.workSchedule?.values[0]?.title_hours"
                />
                <div class="footer__buttons">
                    <AppButton
                        full-width
                        background-color="#fff"
                        border-color="#fff"
                        @on-click="onOpenAppointmentModal"
                    >
                        {{ t('global.buttons.appointment') }}
                    </AppButton>
                </div>
            </div>
            <FooterCaution />
        </div>
        <div class="footer__bottom-block">
            <div class="footer__company">
                <div class="footer__company-name">
                    <LogoIconDesktop class="footer__logo is-desktop-only" />
                    <LogoIconSmall class="footer__logo is-desktop-hide" />
                </div>
                <div class="footer__company-description">
                    {{ t('global.company.description') }}
                </div>
            </div>
            <picture>
                <source media="(min-width: 1920px)" srcset="/shared/assets/images/footer/footer-image-lg-desktop.webp">
                <source media="(min-width: 1920px)" srcset="/shared/assets/images/footer/footer-image-lg-desktop.png">
                <source media="(min-width: 1280px)" srcset="/shared/assets/images/footer/footer-image-desktop.webp">
                <source media="(min-width: 1280px)" srcset="/shared/assets/images/footer/footer-image-desktop.png">
                <source media="(min-width: 320px)" srcset="/shared/assets/images/footer/footer-image-sm.webp">
                <source media="(min-width: 320px)" srcset="/shared/assets/images/footer/footer-image-sm.png">
                <img 
                    src="/shared/assets/images/footer/footer-image-sm.png"
                    loading="lazy"
                    class="footer__image"
                    alt="Footer image"
                >
            </picture>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useStaticDataStore } from '~/entities/root/store/static-data-store'
import { useRootStore } from '~/entities/root/store/root-store'
import AppButton from '~/shared/ui/Buttons/AppButton.vue'
import FooterServices from './FooterServices.vue'
import FooterInfo from '~/shared/ui/Footer/FooterInfo.vue'

import { useModalsStore } from '~/entities/modals/store/modals-store'
// import { useAppointmentModalStore } from '~/entities/modals/ui/AppointmentModal/store/appointment-modal-store.js'
import { useActiveModalsStore } from '~/entities/active-modals/store/active-modals'
import { MODALS_KEYS } from '~/entities/active-modals/constants'

import LogoIconSmall from '~/shared/assets/icons/logo-sm.svg'
import LogoIconDesktop from '~/shared/assets/icons/logo-desktop.svg'
import { MARKETING_EVENTS } from '~/shared/utils/marketing/dataLayerEvents'
import type { IStaticData } from '~/shared/interfaces/staticData'
import FooterCaution from '~/widgets/DefaultFooter/ui/FooterCaution.vue'

const { t } = useI18n()
const rootStore = useRootStore()
const staticData = useStaticDataStore() as IStaticData
// const appointmentModalStore = useAppointmentModalStore()
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
    appointmentModalStore.SET_EVENT(MARKETING_EVENTS.MAIN)
    appointmentModalStore.SET_SYSTEM_NAME('footer')
    appointmentModalStore.SET_MARKETING(selectedMarketing)
    modalsStore.TOGGLE_APPOINTMENT_MODAL()
    activeModalsStore.ADD_ACTIVE_KEYS([MODALS_KEYS.APPOINTMENT])
}
</script>

<style lang="scss" scoped>
.footer {
    &__main {
        overflow: hidden;
        color: $light;
        background-color: $primary-350;
        border-radius: 15px;

        @media (min-width: $mobile-breakpoint) {
            overflow: initial;
        }

        @media (min-width: $desktop-breakpoint) {
            display: flex;
            flex-direction: row-reverse;
            min-height: 600px;
            border-radius: 25px;
        }
    }
    
    &__content {
        padding: 20px;

        @media (min-width: $desktop-breakpoint) {
            display: flex;
            flex-wrap: wrap;
            gap: 40px;
            width: 50%;
            padding: 40px 40px 40px 0;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 48px;
            padding: 48px 48px 48px 0;
        }
    }

    &__center-col {
        margin-bottom: 20px;

        @media (min-width: $desktop-breakpoint) {
            width: calc(50% - 20px);
        }

        @media (min-width: $desktop-breakpoint) {
            width: calc(50% - 24px);
        }
    }

    &__right-col {
        @media (min-width: $desktop-breakpoint) {
            width: calc(50% - 20px);
            padding-top: 12px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            width: calc(50% - 24px);
        }
    }

    &__bottom-block {
        position: relative;

        @media (min-width: $desktop-breakpoint) {
            width: 50%;
        }
    }

    &__company {
        position: relative;
        z-index: 2;
        width: 190px;
        min-height: 280px;
        padding: 20px;

        @media (min-width: $desktop-breakpoint) {
            width: 230px;
            padding: 40px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            width: 246px;
            padding: 48px;
        }
    }

    &__buttons {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    &__logo {
        fill: $dark-500;
        margin-bottom: 16px;
    }

    &__company-description {
        width: 83%;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 140%;
        color: $dark-500;

        @media (min-width: $desktop-breakpoint) {
            width: 100%;
            font-size: 16px;
        }
    }

    &__image {
        position: absolute;
        right: -68px;
        bottom: 0;
        width: 280px;
        height: 100%;
        object-fit: contain;
        object-position: right bottom;

        @media (min-width: $mobile-breakpoint) {
            right: 0;
        }
        
        @media (min-width: $desktop-breakpoint) {
            width: 500px;
            height: 83.333%;
            max-height: 500px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            width: 600px;
            height: 100%;
            max-height: 600px;
        }
    }
}
</style>