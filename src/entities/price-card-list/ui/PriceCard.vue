<template>
    <ParagraphItemContainer>
        <div class="price-card">
            <div class="price-card__heading">
                <div class="price-card__heading-block">
                    <NuxtLink
                        v-if="data.link"
                        :to="localePath(data.link)"
                        class="price-card__title price-card__title--link"
                    >
                        {{ data.name }}
                    </NuxtLink>
                    <div v-else class="price-card__title">
                        {{ data.name }}
                    </div>
                    <div v-if="data?.description" class="price-card__desc" v-html="data.description" />
                </div>
                <div class="price-card__button-block">
                    <div class="price-card__button">
                        <AppButton full-width @on-click="onOpenAppointmentModal">
                            {{ t('global.buttons.appointmentShort') }}
                        </AppButton>
                    </div>
                </div>
            </div>
            <slot />
        </div>
    </ParagraphItemContainer>
</template>

<script setup>
import ParagraphItemContainer from '~/shared/ui/Containers/ParagraphItemContainer.vue'
import AppButton from '~/shared/ui/Buttons/AppButton.vue'

import { useModalsStore } from '~/entities/modals/store/modals-store'
import { useActiveModalsStore } from '~/entities/active-modals/store/active-modals'
import { MODALS_KEYS } from '~/entities/active-modals/constants'
import { useRootStore } from '~/entities/root/store/root-store'
import { useStaticDataStore } from '~/entities/root/store/static-data-store'

const props = defineProps({
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
    const selectedMarketing = props.data?.marketing || rootStore?.pageMarketing || staticData?.defaultMarketingLead || null

    const { useAppointmentModalStore } = await import('~/entities/modals/ui/AppointmentModal/store/appointment-modal-store.js')
    const appointmentModalStore = useAppointmentModalStore()
    const marketingEvent = props.data?.marketing_event || props.data.marketing?.event

    if (marketingEvent) {
        appointmentModalStore.SET_EVENT(marketingEvent)
    }

    appointmentModalStore.SET_APPOINTMENT_MODAL_DATA({
        title: t('appointmentModal.title'),
        option: props.data.name,
        button: t('global.buttons.appointment')
    })
    appointmentModalStore.SET_SYSTEM_NAME('prices')
    appointmentModalStore.SET_MARKETING(selectedMarketing)
    modalsStore.TOGGLE_APPOINTMENT_MODAL()
    activeModalsStore.ADD_ACTIVE_KEYS([MODALS_KEYS.APPOINTMENT])
}
</script>

<style lang="scss" scoped>
.price-card {
    display: flex;
    flex-direction: column;
    gap: 20px;

    @media (min-width: $tablet-breakpoint) {
        gap: 30px;
    }

    @media (min-width: $desktop-breakpoint) {
        gap: 40px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        gap: 48px;
    }

    &__heading {
        display: flex;
        flex-direction: column;
        gap: 20px;

        @media (min-width: $tablet-breakpoint) {
            gap: 30px;
        }

        @media (min-width: $desktop-breakpoint) {
            flex-direction: row;
            gap: 0;
        }
    }

    &__heading-block {
        display: flex;
        flex-direction: column;
        gap: 20px;

        @media (min-width: $tablet-breakpoint) {
            gap: 30px;
        }

        @media (min-width: $desktop-breakpoint) {
            gap: 40px;
            width: 50%;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 48px;
        }
    }

    &__title {
        font-size: 32px;
        font-style: normal;
        font-weight: 700;
        line-height: 120%;
        color: $dark-500;

        @media (min-width: $tablet-breakpoint) {
            font-size: 40px;
        }

        @media (min-width: $desktop-breakpoint) {
            font-size: 48px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 64px;
        }

        &--link {
            transition: color $base-ui-transition;

            @media (any-hover: hover) and (min-width: $desktop-breakpoint) {
                &:hover {
                    color: $primary-500;
                }
            }
        }
    }

    &__desc {
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 140%;

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

    &__button-block {
        display: flex;
        justify-content: end;

        @media (min-width: $desktop-breakpoint) {
            width: 50%;
        }
    }

    &__button {
        width: 50%;
    }
}
</style>