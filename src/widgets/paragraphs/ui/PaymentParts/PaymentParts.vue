<template>
    <div class="payment-parts">
        <div class="payment-parts__content">
            <div class="payment-parts__texts">
                <div class="payment-parts__title">
                    {{ data.fields.string1 }}
                </div>
                <div class="payment-parts__description">
                    {{ data.fields.text1 }}
                </div>
            </div>
            <AppLink variant="primary" @on-click="onOpenAppointmentModal">
                {{ data.fields.link1?.title }}
            </AppLink>
        </div>
        <div class="payment-parts__list">
            <div 
                v-for="item in data.fields.img_title_subtitle_text" 
                :key="item.subtitle"
                class="payment-parts__item"
            >
                <div class="payment-parts__image-container">
                    <AppImage 
                        :urls="item?.image?.urls"
                        :alt="item.image.alt" 
                        :title="item.image.alt"
                    />
                </div>
                <div class="payment-parts__item-texts">
                    <div class="payment-parts__item-title">
                        {{ item.title }}
                    </div>
                    <div class="payment-parts__item-text">
                        {{ item.subtitle }} <br>
                    </div>
                    <div class="payment-parts__item-text">
                        {{ item.text }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useModalsStore } from '~/entities/modals/store/modals-store'
import { useActiveModalsStore } from '~/entities/active-modals/store/active-modals'
import { MODALS_KEYS } from '~/entities/active-modals/constants'

import AppLink from '~/shared/ui/Links/AppLink.vue'
import AppImage from '~/shared/ui/Media/AppImage.vue'

defineProps({
    data: {
        type: Object,
        required: true
    }
})

const activeModalsStore = useActiveModalsStore()
const modalsStore = useModalsStore()

const { t } = useI18n()

const onOpenAppointmentModal = async () => {
    const { useAppointmentModalStore } = await import('~/entities/modals/ui/AppointmentModal/store/appointment-modal-store.js')
    const appointmentModalStore = useAppointmentModalStore()

    appointmentModalStore.SET_APPOINTMENT_MODAL_DATA({
        title: t('appointmentModal.title'),
        button: t('global.buttons.appointment')
    })
    appointmentModalStore.SET_SYSTEM_NAME('partial-payment')
    modalsStore.TOGGLE_APPOINTMENT_MODAL()
    activeModalsStore.ADD_ACTIVE_KEYS([MODALS_KEYS.APPOINTMENT])
}
</script>

<style lang="scss" scoped>
.payment-parts {
    padding: 20px;
    margin: 5px 0;
    background-color: $dark-100;
    border-radius: 15px;

    @media (min-width: $tablet-breakpoint) {
        display: flex;
        padding: 30px;
        margin: 8px 0;
        border-radius: 20px;
    }

    @media (min-width: $desktop-breakpoint) {
        display: flex;
        gap: 64px;
        padding: 40px;
        margin: 10px 0;
        border-radius: 25px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        padding: 48px;
        margin: 12px 0;
        border-radius: 30px;
    }

    &__title {
        margin-bottom: 10px;
        font-size: 20px;
        font-style: normal;
        font-weight: 700;
        line-height: 120%;

        @media (min-width: $desktop-breakpoint) {
            margin-bottom: 20px;
            font-size: 24px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            margin-bottom: 24px;
            font-size: 32px;
        }
    }

    &__description {
        font-size: 14px;
        color: $primary-300;

        @media (min-width: $desktop-breakpoint) {
            margin-bottom: 25px;
            font-size: 16px;
        }
    }

    &__content {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 15px;

        @media (min-width: $tablet-breakpoint) {
            flex-direction: column;
            gap: 0;
            width: 50%;
            margin-bottom: 0;
        }
    }

    &__texts {
        max-width: 203px;

        @media (min-width: $desktop-breakpoint) {
            max-width: none;
        }
    }

    &__list {
        display: flex;
        gap: 20px;
        padding-top: 40px;

        @media (min-width: $tablet-breakpoint) {
            padding: 0 0 0 60px;
        }

        @media (min-width: $desktop-breakpoint) {
            align-items: center;
            gap: 0;
            width: 50%;
            padding: 0;
        }
    }
    
    &__item {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: calc(50% - 10px);

        @media (min-width: $desktop-breakpoint) {
            width: 50%;
        }
    }

    &__item-texts {
        text-align: center;
    }

    &__item-title {
        margin-bottom: 4px;
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: 140%;

        @media (min-width: $desktop-breakpoint) {
            font-size: 18px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 20px;
        }
    }

    &__item-text {
        margin-bottom: 4px;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 140%;
        color: $primary-300;

        @media (min-width: $desktop-breakpoint) {
            font-size: 16px;
        }
    }

    &__image-container {
        width: 40px;
        height: 40px;
        margin-bottom: 20px;

        @media (min-width: $desktop-breakpoint) {
            width: 56px;
            height: 56px;
            margin-bottom: 24px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            width: 72px;
            height: 72px;
        }
    }
}
</style>