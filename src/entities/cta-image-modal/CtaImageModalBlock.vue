<template>
    <div class="cta-image-modal">
        <div class="cta-image-modal__top">
            <div class="cta-image-modal__img-container">
                <AppImage
                    :urls="data?.image?.urls"
                    class="cta-image-modal__img"
                    :alt="data?.image?.alt"
                    :title="data?.image?.alt"
                    :loading="lazyImage ? 'lazy' : null"
                />
            </div>
        </div>
        <div class="cta-image-modal__content">
            <div class="cta-image-modal__middle-content">
                <div class="cta-image-modal__title">
                    {{ data?.title }}
                </div>
                <div class="cta-image-modal__text" v-html="data.short_text" />
            </div>
            <div class="cta-image-modal__bottom-content">
                <div :class="['cta-image-modal__bottom-row', { 'cta-image-modal__bottom-row--items-center': !data?.work_schedule_text }]">
                    <div class="cta-image-modal__contacts">
                        <ClientOnly>
                            <a
                                v-if="data?.phone"
                                :href="`tel:${ removeSpaces(data?.phone) }`"
                                class="cta-image-modal__phone"
                            >
                                {{ data?.phone }}
                            </a>
                        </ClientOnly>
                        <div v-if="data?.work_schedule_text" class="cta-image-modal__contacts-text">
                            {{ data?.work_schedule_text }}
                        </div>
                    </div>
                    <AppButton
                        v-if="data.button_text"
                        class="cta-image-modal__appointment-btn"
                        full-width
                        @on-click="onOpenAppointmentModal"
                    >
                        {{ data.button_text }}
                    </AppButton>
                </div>
                <div v-if="data?.service_text" class="cta-image-modal__service-text">
                    {{ data?.service_text }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRootStore } from '../root/store/root-store'
import { useStaticDataStore } from '../root/store/static-data-store'
import { removeSpaces } from '~/shared/utils/helpers'
import { useModalsStore } from '~/entities/modals/store/modals-store'
// import { useAppointmentModalStore } from '~/entities/modals/ui/AppointmentModal/store/appointment-modal-store.js'
// import { useActiveModalsStore } from '~/entities/active-modals/store/active-modals'
import { MODALS_KEYS } from '~/entities/active-modals/constants'
import { MARKETING_EVENTS } from '~/shared/utils/marketing/dataLayerEvents'

import AppButton from '~/shared/ui/Buttons/AppButton.vue'
import AppImage from '~/shared/ui/Media/AppImage.vue'

const props = defineProps({
    data: {
        type: Object,
        required: true
    },
    dataLayerEvent: {
        type: String,
        default: MARKETING_EVENTS.APPOINTMENT_DEFAULT
    },
    lazyImage: {
        type: Boolean,
        default: false
    }
})

const rootStore = useRootStore()
const staticData = useStaticDataStore()
// const appointmentModalStore = useAppointmentModalStore()
// const activeModalsStore = useActiveModalsStore()
const modalsStore = useModalsStore()
const phone = computed(() => removeSpaces(props.data.phone))

const { t } = useI18n()

const onOpenAppointmentModal = async () => {
    const selectedMarketing = rootStore?.pageMarketing || staticData?.defaultMarketingLead || null

    const { useAppointmentModalStore } = await import('~/entities/modals/ui/AppointmentModal/store/appointment-modal-store.js')
    const appointmentModalStore = useAppointmentModalStore()

    appointmentModalStore.SET_APPOINTMENT_MODAL_DATA({
        title: t('appointmentModal.title'),
        button: t('global.buttons.appointment')
    })
    appointmentModalStore.SET_EVENT(props.dataLayerEvent)
    appointmentModalStore.SET_SYSTEM_NAME('cta-image-modal')
    appointmentModalStore.SET_MARKETING(selectedMarketing)
    modalsStore.TOGGLE_APPOINTMENT_MODAL()

    const { useActiveModalsStore } = await import('~/entities/active-modals/store/active-modals')
    const activeModalsStore = useActiveModalsStore()

    activeModalsStore.ADD_ACTIVE_KEYS([MODALS_KEYS.APPOINTMENT])
}
</script>

<style lang="scss" scoped>
@import '@/app/styles/ckeditor/mixins';
@import '@/app/styles/ckeditor/basic-elements';

.cta-image-modal {
    display: flex;
    flex-direction: column;
    padding: 20px;
    margin: 40px 0;
    overflow: hidden;
    background-color: $dark-100;
    border-radius: 15px;

    @media (min-width: $desktop-breakpoint) {
        flex-direction: row;
        padding: 40px;
        margin: 80px 0;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        padding: 48px;
        margin: 96px 0;
    }

    &__top {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 20px;
        background-color: $dark-200;
        border-radius: 7px;

        @media (min-width: $tablet-breakpoint) {
            height: 527px;
            border-radius: 10px;
        }

        @media (min-width: $desktop-breakpoint) {
            width: calc(50% - 40px);
            height: auto;
            margin-right: 40px;
            margin-bottom: 0;
            border-radius: 12px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            width: calc(50% - 48px);
            height: 522px;
            margin-right: 48px;
            border-radius: 20px;
        }

        &::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            width: 40px;
            height: 20px;
            background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCA0MCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggaWQ9IlJlY3RhbmdsZSAzMDQxIiBkPSJNMjAgMEw0MCAyMEwwIDIwTDIwIDBaIiBmaWxsPSIjRjVGNEY4Ii8+Cjwvc3ZnPgo=');
            background-repeat: no-repeat;
            background-size: contain;
            transform: translateX(-50%);

            @media (min-width: $desktop-breakpoint) {
                right: 0;
                bottom: 50%;
                left: auto;
                width: 20px;
                height: 40px;
                background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCAyMCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggaWQ9IlJlY3RhbmdsZSAzMDQxIiBkPSJNMCAyMEwyMCAwVjQwTDAgMjBaIiBmaWxsPSIjRjVGNEY4Ii8+Cjwvc3ZnPgo=');
                transform: translate(0, 50%);
            }

            @media (min-width: $lg-desktop-breakpoint) {
                width: 24px;
                height: 48px;
            }
        }
    }

    &__title {
        margin-bottom: 20px;
        font-size: 24px;
        font-style: normal;
        font-weight: 700;
        line-height: 120%;

        @media (min-width: $tablet-breakpoint) {
            margin-bottom: 30px;
            font-size: 28px;
        }

        @media (min-width: $desktop-breakpoint) {
            margin-bottom: 40px;
            font-size: 32px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            margin-bottom: 48px;
            font-size: 48px;
        }
    }

    &__img-container {
        position: relative;
        width: 280px;
        height: 280px;

        @media (min-width: $tablet-breakpoint) {
            height: 92.44%;
        }

        @media (min-width: $desktop-breakpoint) {
            width: 320px;
            height: 320px;
            padding: 35.2px 6.4px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            width: 480px;
            height: 480px;
            padding: 52.8px 9.6px;
        }

        :deep(img) {
            object-fit: contain;
            margin-bottom: 0;
        }
    }

    &__content {
        @media (min-width: $desktop-breakpoint) {
            width: 50%;
        }
    }

    &__text {
        position: relative;
        border-bottom: 1px solid $dark-200;

        &::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 20px;
            height: 3px;
            background-color: $dark-200;

            @media (min-width: $tablet-breakpoint) {
                width: 40px;
            }
        }
    }

    &__bottom-row {
        display: flex;
        align-items: flex-end;
        gap: 20px;
        margin-bottom: 20px;

        &--items-center {
            align-items: center;
        }

        @media (min-width: $tablet-breakpoint) {
            gap: 30px;
            margin-bottom: 30px;
        }

        @media (min-width: $desktop-breakpoint) {
            gap: 40px;
            margin-bottom: 40px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            align-items: center;
            gap: 48px;
            margin-bottom: 48px;
        }
    }

    &__phone {
        display: block;
        margin-top: 0;
        margin-bottom: 8px;
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: 140%;
        color: $dark-500;

        &::after {
            display: none;
        }

        @media (min-width: $desktop-breakpoint) {
            font-size: 18px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 20px;
        }
    }

    &__contacts,
    &__appointment-btn {
        width: 50%;
    }

    &__contacts-text {
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 140%;

        @media (min-width: $desktop-breakpoint) {
            font-size: 16px;
        }
    }

    &__service-text {
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 140%;
        color: $primary-300;

        @media (min-width: $tablet-breakpoint) {
            font-size: 16px;
        }
    }

    &__bottom-content {
        padding-top: 20px;

        @media (min-width: $tablet-breakpoint) {
            padding-top: 30px;
        }

        @media (min-width: $desktop-breakpoint) {
            padding-top: 40px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            padding-top: 48px;
        }
    }
}
</style>