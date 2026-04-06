<template>
    <ParagraphItemContainer class="cta-services-list" background="#53D9D3">
        <div class="cta-services-list__heading">
            <div class="cta-services-list__title">
                {{ data.title }}
            </div>
            <div class="cta-services-list__description" v-html="data?.description" />
        </div>
        <BlockSeparator class="cta-services-list__separator" />
        <div class="cta-services-list__body">
            <div class="cta-services-list__content">
                <div class="cta-services-list__content-title">
                    {{ data.services.title }}
                </div>
                <div class="cta-services-list__services">
                    <div 
                        v-for="item in data.services.items" 
                        :key="item.first"
                        class="cta-services-list__item"
                    >
                        <div class="cta-services-list__item-key">
                            {{ item.first }}
                        </div>
                        <div class="cta-services-list__item-value">
                            {{ item.second }}
                        </div>
                    </div>
                </div>
                <AppButton
                    background-color="#fff"
                    border-color="#fff"
                    @on-click="onOpenAppointmentModal"
                >
                    {{ data.button_text }}
                </AppButton>
            </div>
            <div class="cta-services-list__img-block">
                <div class="cta-services-list__img-wrap">
                    <AppImage
                        :urls="data?.image?.urls" 
                        :alt="data?.image?.alt"
                        :title="data?.image?.title"
                        fit="contain"
                        class="cta-services-list__img"
                        loading="lazy"
                    />
                </div>
                <div class="cta-services-list__contact-description">
                    <span class="cta-services-list__description-limited">{{ data.contact_description }}</span>
                </div>
            </div>
        </div>
    </ParagraphItemContainer>
</template>

<script setup>
import AppButton from '~/shared/ui/Buttons/AppButton.vue'
import ParagraphItemContainer from '~/shared/ui/Containers/ParagraphItemContainer.vue'
import AppImage from '~/shared/ui/Media/AppImage.vue'
import BlockSeparator from '~/shared/ui/Separators/BlockSeparator.vue'

import { useModalsStore } from '~/entities/modals/store/modals-store'
import { useActiveModalsStore } from '~/entities/active-modals/store/active-modals'
import { MODALS_KEYS } from '~/entities/active-modals/constants'
import { MARKETING_EVENTS } from '~/shared/utils/marketing/dataLayerEvents'
import { useRootStore } from '~/entities/root/store/root-store'
import { useStaticDataStore } from '~/entities/root/store/static-data-store'

defineProps({
    data: {
        type: Object,
        required: true
    }
})

const rootStore = useRootStore()
const staticData = useStaticDataStore()
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
    appointmentModalStore.SET_EVENT(MARKETING_EVENTS.APPOINTMENT_DEFAULT)
    appointmentModalStore.SET_SYSTEM_NAME('cta-services-list')
    appointmentModalStore.SET_MARKETING(selectedMarketing)
    modalsStore.TOGGLE_APPOINTMENT_MODAL()
    activeModalsStore.ADD_ACTIVE_KEYS([MODALS_KEYS.APPOINTMENT])
}
</script>

<style lang="scss" scoped>
.cta-services-list {
    color: $dark-500;

    &__heading {
        @media (min-width: $desktop-breakpoint) {
            display: flex;
            gap: 40px;
        }
    }

    &__title {
        margin-bottom: 20px;
        font-size: 32px;
        font-style: normal;
        font-weight: 700;
        line-height: 120%;

        @media (min-width: $tablet-breakpoint) {
            margin-bottom: 30px;
            font-size: 40px;
        }

        @media (min-width: $desktop-breakpoint) {
            width: 50%;
            margin-bottom: 0;
            font-size: 48px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 64px;
        }
    }

    &__description {
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 140%;

        @media (min-width: $desktop-breakpoint) {
            width: 50%;
            padding-top: 12px;
            font-size: 18px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 20px;
        }
    }

    &__separator {
        margin: 20px 0;

        @media (min-width: $tablet-breakpoint) {
            margin: 30px 0;
        }

        @media (min-width: $desktop-breakpoint) {
            margin: 40px 0;
        }
    }

    &__body {
        @media (min-width: $desktop-breakpoint) {
            display: flex;
            flex-direction: row-reverse;
            align-items: flex-end;
            gap: 40px;
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
            gap: 40px;
            width: calc(50% - 20px);
        }

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 48px;
        }
    }

    &__content-title {
        font-size: 20px;
        font-style: normal;
        font-weight: 700;
        line-height: 120%;

        @media (min-width: $tablet-breakpoint) {
            font-size: 24px;
        }

        @media (min-width: $desktop-breakpoint) {
            font-size: 28px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 32px;
        }
    }

    &__item {
        position: relative;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 10px;
        padding: 10px 0;

        @media (min-width: $tablet-breakpoint) {
            padding: 15px 0;
        }

        @media (min-width: $desktop-breakpoint) {
            padding: 20px 0;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            padding: 24px 0;
        }

        &:not(:last-child) {
            &::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 1px;
                background-color: $dark-200;
            }
        }
    }

    &__item-key {
        width: 50%;
        font-size: 18px;
        font-style: normal;
        font-weight: 700;
        line-height: 120%;

        @media (min-width: $tablet-breakpoint) {
            font-size: 20px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 24px;
        }
    }

    &__item-value {
        width: 50%;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 140%;

        @media (min-width: $desktop-breakpoint) {
            font-size: 16px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 18px;
        }
    }

    &__img-block {
        position: relative;
        width: 100%;
        height: 320px;
        margin: 0 auto;

        @media (min-width: $tablet-breakpoint) {
            display: flex;
            justify-content: center;
            height: 436px;
        }

        @media (min-width: $desktop-breakpoint) {
            width: calc(50% - 20px);
        }

        @media (min-width: $lg-desktop-breakpoint) {
            height: 600px;
        }
    }

    &__img-wrap {
        width: 100%;
        height: 100%;
        transform: translateY(20px);

        @media (min-width: $tablet-breakpoint) {
            width: 436px;
            transform: translateY(30px);
        }

        @media (min-width: $desktop-breakpoint) {
            max-width: 400px;
            min-width: 400px;
            transform: translateY(40px);
        }

        @media (min-width: $lg-desktop-breakpoint) {
            max-width: 600px;
            min-width: 600px;
            transform: translateY(48px);
        }

        :deep(img) {
            object-position: bottom center;
        }
    }

    &__contact-description {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 232px;
        padding: 20px;
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: 140%; 
        background: rgba(207, 207, 215, .3);
        backdrop-filter: blur(10px);
        border-radius: 15px;
    }
    
    &__description-limited {
        @include text-line-overflowed-multiple(11);
    }
}
</style>