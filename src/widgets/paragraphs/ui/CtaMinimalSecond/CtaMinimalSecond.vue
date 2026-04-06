<template>
    <div class="cta-minimal-second">
        <p class="cta-minimal-second__title">
            {{ data.title }}
        </p>
        <div class="cta-minimal-second__content">
            <div class="cta-minimal-second__description">
                <div class="cta-minimal-second__description-text" v-html="data.text" />
            </div>
            <div class="cta-minimal-second__footer">
                <AppButton
                    v-if="data.button_text"
                    class="cta-minimal-second__btn"
                    full-width
                    @on-click="onOpenAppointmentModal"
                >
                    {{ data.button_text }}
                </AppButton>
            </div>
        </div>
    </div>
</template>

<script setup>
import AppButton from '~/shared/ui/Buttons/AppButton.vue'

import { useRootStore } from '~/entities/root/store/root-store'
import { useStaticDataStore } from '~/entities/root/store/static-data-store'
import { useModalsStore } from '~/entities/modals/store/modals-store'
import { useAppointmentModalStore } from '~/entities/modals/ui/AppointmentModal/store/appointment-modal-store.js'
import { useActiveModalsStore } from '~/entities/active-modals/store/active-modals'
import { MODALS_KEYS } from '~/entities/active-modals/constants'

defineProps({
    data: {
        type: Object,
        required: true
    }
})

const rootStore = useRootStore()
const staticData = useStaticDataStore()
const appointmentModalStore = useAppointmentModalStore()
const activeModalsStore = useActiveModalsStore()
const modalsStore = useModalsStore()

const { t } = useI18n()

const onOpenAppointmentModal = () => {
    const selectedMarketing = rootStore?.pageMarketing || staticData?.defaultMarketingLead || null

    appointmentModalStore.SET_APPOINTMENT_MODAL_DATA({
        title: t('appointmentModal.title'),
        button: t('global.buttons.appointment')
    })
    appointmentModalStore.SET_SYSTEM_NAME('cta-minimal-second')
    appointmentModalStore.SET_MARKETING(selectedMarketing)
    modalsStore.TOGGLE_APPOINTMENT_MODAL()
    activeModalsStore.ADD_ACTIVE_KEYS([MODALS_KEYS.APPOINTMENT])
}
</script>

<style lang="scss" scoped>
    .cta-minimal-second {
        display: flex;
        flex-direction: column;
        gap: 40px;
        padding: 20px;
        background: $dark-100;
        border-radius: 15px;

        @media (min-width: $tablet-breakpoint) {
            gap: 60px;
            padding: 30px;
            margin: 60px 0;
            border-radius: 20px;
        }

        @media (min-width: $desktop-breakpoint) {
            flex-direction: row;
            padding: 40px;
            margin: 80px 0;
            border-radius: 25px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            padding: 48px;
            margin: 96px 0;
            border-radius: 30px;
        }

        &__content {
            display: flex;
            flex-direction: column;
            gap: 20px;

            @media (min-width: $desktop-breakpoint) {
                gap: 40px;
                width: 50%;
            }

            @media (min-width: $lg-desktop-breakpoint) {
                gap: 48px;
            }
        }

        &__title {
            font-size: 20px;
            font-weight: 700;
            line-height: 120%; /* 24px */
            color: $dark-500;

            @media (min-width: $tablet-breakpoint) {
                font-size: 22px;
            }

            @media (min-width: $desktop-breakpoint) {
                width: 50%;
                font-size: 24px;
            }

            @media (min-width: $lg-desktop-breakpoint) {
                font-size: 32px;
            }
        }

        &__description {
            display: flex;
            flex-wrap: nowrap;
            font-size: 16px;
            font-weight: 400;
            line-height: 120%; 
            color: $primary-300;

            @media (min-width: $tablet-breakpoint) {
                font-size: 18px;
            }

            @media (min-width: $desktop-breakpoint) {
                font-size: 20px;
            }

            @media (min-width: $lg-desktop-breakpoint) {
                font-size: 24px;
            }

            &::before {
                content: '[';
            }

            &::after {
                content: ']';
                align-self: flex-end;
                margin-left: auto;
            }

            @media (min-width: $desktop-breakpoint) {
                &::after, &::before {
                    font-weight: 700;
                }
            }
        }

        &__description-text {
            padding: 0 15px;

            @media (min-width: $desktop-breakpoint) {
                padding: 0 20px;
            }

            @media (min-width: $desktop-breakpoint) {
                padding: 0 24px;
            }
        }
        
        &__footer {
            display: flex;
        }

        &__btn {
            width: 50%;
            margin-left: auto;

            @media (min-width: $desktop-breakpoint) {
                margin-top: auto;
            }
        }
    }
</style>