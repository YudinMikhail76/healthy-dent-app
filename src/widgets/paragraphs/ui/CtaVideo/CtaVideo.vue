<template>
    <div class="cta-video">
        <div class="cta-video__media">
            <div class="cta-video__video-container">
                <AppVideo v-if="hasVideos" type="regular">
                    <source v-if="webmVideo" :src="webmVideo" type="video/webm">
                    <source v-if="mp4Video" :src="mp4Video" type="video/mp4">
                </AppVideo>
            </div>
        </div>
        <div class="cta-video__content">
            <div class="cta-video__title" v-html="data.bold_text" />
            <div class="cta-video__description" v-html="data.text" />
            <BlockSeparator />
            <div class="cta-video__author">
                <div class="cta-video__author-title">
                    {{ data.author.name }}
                </div>
                <div class="cta-video__author-position">
                    {{ data.author.position }}
                </div>
            </div>
            <AppButton
                v-if="data.form_id"
                class="cta-video__contact-btn"
                @on-click="onOpenAppointmentModal"
            >
                {{ data.button_text }}
            </AppButton>
        </div>
    </div>
</template>

<script setup>
import BlockSeparator from '~/shared/ui/Separators/BlockSeparator.vue'
import AppButton from '~/shared/ui/Buttons/AppButton.vue'
import AppVideo from '~/shared/ui/Media/AppVideo.vue'

import { useModalsStore } from '~/entities/modals/store/modals-store'
import { useAppointmentModalStore } from '~/entities/modals/ui/AppointmentModal/store/appointment-modal-store.js'
import { useHotTimeModalStore } from '~/entities/modals/ui/HotTimeModal/store/store'
import { useActiveModalsStore } from '~/entities/active-modals/store/active-modals'
import { MODALS_KEYS } from '~/entities/active-modals/constants'
import { MARKETING_EVENTS } from '~/shared/utils/marketing/dataLayerEvents'

const props = defineProps({
    data: {
        type: Object,
        required: true
    }
})

const hasVideos = computed(() => !!props.data?.video && Object.keys(props.data.video)?.length)
const webmVideo = computed(() => props.data.video?.field_media_video_file_webm)
const mp4Video = computed(() => props.data.video?.field_media_video_file)

const appointmentModalStore = useAppointmentModalStore()
const hotTimeModalStore = useHotTimeModalStore()
const activeModalsStore = useActiveModalsStore()
const modalsStore = useModalsStore()

const { t } = useI18n()

const onOpenAppointmentModal = () => {
    if (props.data.form_id === 'make_an_appointment') {
        appointmentModalStore.SET_APPOINTMENT_MODAL_DATA({
            title: t('appointmentModal.title'),
            button: t('global.buttons.appointment')
        })
        appointmentModalStore.SET_EVENT(MARKETING_EVENTS.APPOINTMENT_DEFAULT)
        appointmentModalStore.SET_SYSTEM_NAME('cta-minimal-second')
        modalsStore.TOGGLE_APPOINTMENT_MODAL()
        activeModalsStore.ADD_ACTIVE_KEYS([MODALS_KEYS.APPOINTMENT])
    }

    if (props.data.form_id === 'hot_hours') {
        hotTimeModalStore.SET_SYSTEM_NAME('cta-video')
        modalsStore.TOGGLE_HOT_TIME_MODAL()
        activeModalsStore.ADD_ACTIVE_KEYS([MODALS_KEYS.HOT_TIME])
    }
}
</script>

<style lang="scss" scoped>
.cta-video {
    margin: 40px 0;
    background-color: $light;
    border-radius: 15px;

    @media (min-width: $tablet-breakpoint) {
        margin: 60px 0;
        border-radius: 20px;
    }

    @media (min-width: $desktop-breakpoint) {
        display: flex;
        margin: 60px 0;
        border-radius: 25px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        margin: 96px 0;
        border-radius: 30px;
    }

    &__media {
        padding: 20px;

        @media (min-width: $tablet-breakpoint) {
            padding: 30px;
        }

        @media (min-width: $desktop-breakpoint) {
            width: 50%;
            padding: 40px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            padding: 48px;
        }
    }

    &__video-container {
        position: relative;
        height: 200px;
        overflow: hidden;
        border-radius: 7px;

        @media (min-width: $tablet-breakpoint) {
            height: 380px;
            border-radius: 10px;
        }

        @media (min-width: $desktop-breakpoint) {
            height: 100%;
            border-radius: 12px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            border-radius: 15px;
        }

        &::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            z-index: 3;
            display: block;
            width: 100%;
            height: 100%;
            background: $primary-400;
            filter: opacity(.2);
            mix-blend-mode: multiply;
        }
    }

    &__content {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 20px;
        padding: 0 20px 20px;

        @media (min-width: $tablet-breakpoint) {
            gap: 30px;
            padding: 0 30px 30px;
        }

        @media (min-width: $desktop-breakpoint) {
            gap: 40px;
            width: 50%;
            height: auto;
            padding: 40px 40px 40px 0;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 48px;
            padding: 48px 48px 48px 0;
        }
    }

    &__title {
        font-size: 20px;
        font-style: normal;
        font-weight: 700;
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

    &__description {
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

    &__author-title,
    &__author-position {
        margin-bottom: 4px;
        font-size: 14px;
        font-style: normal;
        line-height: 140%;

        @media (min-width: $tablet-breakpoint) {
            font-size: 16px;
        }

        @media (min-width: $desktop-breakpoint) {
            margin-bottom: 5px;
            font-size: 18px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            margin-bottom: 6px;
            font-size: 20px;
        }
    }

    &__author-title {
        font-weight: 700;
    }

    &__author-position {
        font-weight: 400;
        color: $primary-300;
    }

    &__contact-btn {
        width: 50%;
        margin-left: auto;
    }
}
</style>