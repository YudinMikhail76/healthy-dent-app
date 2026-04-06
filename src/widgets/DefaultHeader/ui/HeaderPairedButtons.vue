<template>
    <div class="paired-buttons">
        <HeaderContactsDropdown />
        <button
            type="button"
            class="paired-buttons__appointment-btn"
            @click="onOpenAppointmentModal"
        >
            {{ $t('global.buttons.appointmentShort') }}
        </button>
    </div>
</template>

<script setup>
import HeaderContactsDropdown from '~/shared/ui/Header/HeaderContactsDropdown.vue'

import { useModalsStore } from '~/entities/modals/store/modals-store'
// import { useAppointmentModalStore } from '~/entities/modals/ui/AppointmentModal/store/appointment-modal-store.js'
import { useActiveModalsStore } from '~/entities/active-modals/store/active-modals'
import { MODALS_KEYS } from '~/entities/active-modals/constants'
import { MARKETING_EVENTS } from '~/shared/utils/marketing/dataLayerEvents'
import { useRootStore } from '~/entities/root/store/root-store'
import { useStaticDataStore } from '~/entities/root/store/static-data-store'

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

    appointmentModalStore.SET_APPOINTMENT_MODAL_DATA({
        title: t('appointmentModal.title'),
        button: t('global.buttons.appointment')
    })
    appointmentModalStore.SET_EVENT(MARKETING_EVENTS.MAIN)
    appointmentModalStore.SET_SYSTEM_NAME('header')
    appointmentModalStore.SET_MARKETING(selectedMarketing)
    modalsStore.TOGGLE_APPOINTMENT_MODAL()
    activeModalsStore.ADD_ACTIVE_KEYS([MODALS_KEYS.APPOINTMENT])
}
</script>

<style lang="scss" scoped>
.paired-buttons {
    position: relative;
    display: flex;
    align-items: center;
    height: 48px;
    margin-left: auto;
    cursor: pointer;
    background-color: $primary-500;
    border: none;
    border-radius: 6px;

    @media (min-width: $tablet-breakpoint) {
        font-size: 16px;
        border-radius: 8px;
    }

    @media (min-width: $desktop-breakpoint) {
        min-width: 154px;
        min-height: 56px;
        border-radius: 10px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        min-width: 181px;
        min-height: 72px;
        font-size: 20px;
    }

    &::before,
    &::after {
        content: '';
        position: absolute;
        left: 48px;
        width: 2px;
        height: 8px;
        background-color: $secondary-100;
        border-radius: 0 0 7px 7px;

        @media (min-width: $desktop-breakpoint) {
            left: 56px;
            height: 12px;
        }
    
        @media (min-width: $lg-desktop-breakpoint) {
            left: 72px;
        }
    }

    &::before {
        top: 0;
    }

    &::after {
        bottom: 0;
    }

    &__appointment-btn {
        height: 100%;
        padding: 0 10px;
        font-family: $main-font;
        font-size: 14px;
        font-style: normal;
        font-weight: 700;
        line-height: 140%;
        color: $light;
        word-break: normal;
        cursor: pointer;
        background: transparent;
        border: none;
        border-radius: 0 6px 6px 0;
        transition: background-color $base-ui-transition;

        @media (any-hover: hover) {
            &:hover {
                background-color: $primary-400;
            }
        }

        @media (min-width: $desktop-breakpoint) {
            padding: 0 20px;
            font-size: 18px;
            border-radius: 0 10px 10px 0;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            min-width: 109px;
            border-radius: 0 12px 12px 0;
        }
    }
}
</style>