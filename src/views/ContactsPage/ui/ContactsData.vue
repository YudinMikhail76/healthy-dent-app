<template>
    <div class="contacts-data">
        <div class="contacts-data__inner">
            <div class="contacts-data__left">
                <div class="contacts-data__address">
                    <span class="contacts-data__address contacts-data__address--blue">
                        {{ address.values?.[0]?.city }}
                    </span>
                    <span class="contacts-data__dash" />
                    <span class="contacts-data__address contacts-data__address--blue">
                        {{ address.values?.[0]?.desc }}
                    </span>
                    <span class="contacts-data__dash" />
                    <span>
                        {{ address.values?.[0]?.value }}
                    </span>
                </div>
                <div class="contacts-data__block">
                    <a :href="address.values?.[0]?.url" target="_blank">
                        <AppTag>Маршрут</AppTag>
                    </a>
                    <a :href="`tel: ${ address.values?.[0]?.phone }`">
                        <AppTag>
                            {{ address.values?.[0].phone }}
                        </AppTag>
                    </a>
                </div>
                <div class="contacts-data__work-schedule" v-html="workSchedule.values?.[0]?.title_hours" />
            </div>
            <div class="contacts-data__right">
                <div class="contacts-data__socials">
                    <AppButtonSocial
                        v-for="social in socials.values"
                        :key="social.type"
                        :to="social.url"
                        :title="social.type"
                        target="_blank"
                        external
                    >
                        <component :is="getSocialIconComponent(social.type)" />
                    </AppButtonSocial>
                </div>
                <div class="contacts-data__button">
                    <AppButton full-width @on-click="onOpenAppointmentModal">
                        {{ $t('global.buttons.appointment') }}
                    </AppButton>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import AppTag from '~/shared/ui/Tags/AppTag.vue'
import AppButtonSocial from '~/shared/ui/Buttons/AppButtonSocial.vue'
import AppButton from '~/shared/ui/Buttons/AppButton.vue'

import { useRootStore } from '~/entities/root/store/root-store'
import { useStaticDataStore } from '~/entities/root/store/static-data-store'
import { getSocialIconComponent } from '~/shared/utils/socials'
import { useModalsStore } from '~/entities/modals/store/modals-store'
import { useAppointmentModalStore } from '~/entities/modals/ui/AppointmentModal/store/appointment-modal-store.js'
import { useActiveModalsStore } from '~/entities/active-modals/store/active-modals'
import { MODALS_KEYS } from '~/entities/active-modals/constants'

const rootStore = useRootStore()
const appointmentModalStore = useAppointmentModalStore()
const activeModalsStore = useActiveModalsStore()
const modalsStore = useModalsStore()
const staticDataStore = useStaticDataStore()
const {
    address,
    socials,
    workSchedule
} = toRefs(staticDataStore)

const { t } = useI18n()

const onOpenAppointmentModal = () => {
    const selectedMarketing = rootStore?.pageMarketing || staticDataStore?.defaultMarketingLead || null

    appointmentModalStore.SET_APPOINTMENT_MODAL_DATA({
        title: t('appointmentModal.title'),
        button: t('global.buttons.appointment')
    })
    appointmentModalStore.SET_SYSTEM_NAME('contacts')
    appointmentModalStore.SET_MARKETING(selectedMarketing)
    modalsStore.TOGGLE_APPOINTMENT_MODAL()
    activeModalsStore.ADD_ACTIVE_KEYS([MODALS_KEYS.APPOINTMENT])
}
</script>

<style lang="scss" scoped>
.contacts-data {
    position: absolute;
    bottom: 0;
    width: 100%;

    &__inner {
        display: flex;
        flex-direction: column;
        gap: 20px;
        padding: 20px;
        margin: 0 20px;
        background: rgba($light, .8);
        border-radius: 15px;

        @media (min-width: $tablet-breakpoint) {
            gap: 30px;
            padding: 30px;
            margin: 0 30px;
            border-radius: 20px;
        }

        @media (min-width: $desktop-breakpoint) {
            flex-direction: row;
            gap: 64px;
            padding: 40px;
            margin: 0 40px;
            border-radius: 25px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 96px;
            padding: 48px;
            margin: 0 48px;
            border-radius: 30px;
        }
    }

    &__block {
        display: flex;
        justify-content: center;
        gap: 3px;

        @media (min-width: $tablet-breakpoint) {
            gap: 6px;
        }
    }

    &__left {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 15px;

        @media (min-width: $desktop-breakpoint) {
            align-items: start;
            gap: 20px;
            width: 100%;
        }
    }

    &__address {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
        font-size: 14px;
        font-weight: 700;
        line-height: 140%;

        @media (min-width: $tablet-breakpoint) {
            gap: 8px;
            font-size: 16px;
        }

        @media (min-width: $desktop-breakpoint) {
            justify-content: start;
            gap: 12px;
            font-size: 18px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 20px;
        }

        &--blue {
            font-weight: 400;
            color: $primary-500;
        }
    }

    &__dash {
        display: inline-block;
        width: 9px;
        border: 2px solid $primary-500;
        border-radius: 5px;

        @media (min-width: $tablet-breakpoint) {
            width: 12px;
        }

        @media (min-width: $desktop-breakpoint) {
            width: 16px;
        }
    }

    &__work-schedule {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        font-weight: 700;
        line-height: 140%;

        @media (min-width: $tablet-breakpoint) {
            font-size: 16px;
        }

        @media (min-width: $desktop-breakpoint) {
            justify-content: start;
            font-size: 18px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 20px;
        }

        :deep(.dash) {
            display: inline-block;
            width: 9px;
            margin: 0 5px;
            border: 2px solid $primary-500;
            border-radius: 5px;

            @media (min-width: $tablet-breakpoint) {
                width: 12px;
                margin: 0 8px;
            }

            @media (min-width: $desktop-breakpoint) {
                width: 16px;
                margin: 0 12px;
            }
        }

        :deep(.secondary) {
            margin-left: 5px;
            font-weight: 400;
            color: $primary-300;
        }
    }

    &__right {
        display: flex;
        flex-direction: column;
        gap: 20px;

        @media (min-width: $tablet-breakpoint) {
            flex-direction: row;
            gap: 30px;
        }

        @media (min-width: $desktop-breakpoint) {
            align-items: flex-end;
            gap: 0;
            width: 100%;
        }
    }

    &__socials {
        display: flex;
        justify-content: center;
        gap: 5px;

        @media (min-width: $tablet-breakpoint) {
            justify-content: start;
            width: 100%;
        }
    }

    &__button {
        width: 100%;
    }
}
</style>