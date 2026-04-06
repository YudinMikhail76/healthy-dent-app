<template>
    <div class="doctor-hero-banner">
        <AppBreadcrumbs v-if="breadcrumbs" :breadcrumbs="breadcrumbs" />
        <div class="doctor-hero-banner__inner">
            <div class="doctor-hero-banner__heading">
                <h1 class="doctor-hero-banner__title">
                    {{ data.full_name }}
                </h1>
                <div>
                    <div class="socials" v-if="socials?.length">
                        <AppButtonSocial
                            v-for="item in socials"
                            :key="item.second"
                            :to="item.second"
                            target="_blank"
                            :title="item.second"
                            external
                        >
                            <component :is="getSocialIconComponent(item.first)" />
                        </AppButtonSocial>
                    </div>
                    <div v-if="data?.teaser_text" class="doctor-hero-banner__desc">
                        {{ data.teaser_text }}
                    </div>
                </div>
            </div>
            <div class="doctor-hero-banner__info">
                <div class="doctor-hero-banner__info-block">
                    <div class="doctor-hero-banner__info-text">
                        {{ experience }}
                    </div>
                    <div class="doctor-hero-banner__statistic">
                        <div v-if="data?.reviews_count" class="doctor-hero-banner__statistic-item">
                            <div class="doctor-hero-banner__statistic-icon">
                                <MessageIcon />
                            </div>
                            <div class="doctor-hero-banner__statistic-count">
                                {{ data.reviews_count }}
                            </div>
                        </div>
                        <div v-if="data?.cases_count" class="doctor-hero-banner__statistic-item">
                            <div class="doctor-hero-banner__statistic-icon">
                                <FolderIcon />
                            </div>
                            <div class="doctor-hero-banner__statistic-count">
                                {{ data.cases_count }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="doctor-hero-banner__button">
                    <AppButton full-width @on-click="onOpenAppointmentModal">
                        {{ $t('global.buttons.appointmentShort') }}
                    </AppButton>
                </div>
            </div>
            <div class="doctor-hero-banner__img-container">
                <div class="doctor-hero-banner__img">
                    <AppImage
                        :urls="data.photo?.urls"
                        :alt="data.photo?.alt"
                        :title="data.photo?.title"
                        fit="contain"
                        preload
                        fetch-priority="high"
                    />
                </div>
                <div v-if="data?.perk" class="doctor-hero-banner__feature">
                    {{ data.perk }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import AppBreadcrumbs from '~/shared/ui/Navigation/AppBreadcrumbs.vue'
import AppButton from '~/shared/ui/Buttons/AppButton.vue'
import AppImage from '~/shared/ui/Media/AppImage.vue'

import { useRootStore } from '~/entities/root/store/root-store'
import { useStaticDataStore } from '~/entities/root/store/static-data-store'
import { useModalsStore } from '~/entities/modals/store/modals-store'
import { useAppointmentModalStore } from '~/entities/modals/ui/AppointmentModal/store/appointment-modal-store.js'
import { useActiveModalsStore } from '~/entities/active-modals/store/active-modals'
import { getDeclination } from '~/shared/utils/helpers'
import { MODALS_KEYS } from '~/entities/active-modals/constants'
import { MARKETING_EVENTS } from '~/shared/utils/marketing/dataLayerEvents'
import { getSocialIconComponent } from '~/shared/utils/socials'

import FolderIcon from '~/shared/assets/icons/folder.svg'
import MessageIcon from '~/shared/assets/icons/message.svg'
import AppButtonSocial from '~/shared/ui/Buttons/AppButtonSocial'

const props = defineProps({
    data: {
        type: Object,
        default: () => ({})
    },
    breadcrumbs: {
        type: Array,
        default: () => []
    },
    socials: {
        type: Array,
        default: () => []
    },
})

const rootStore = useRootStore()
const staticData = useStaticDataStore()
const appointmentModalStore = useAppointmentModalStore()
const activeModalsStore = useActiveModalsStore()
const modalsStore = useModalsStore()

const { t } = useI18n()
const translationYears = [t('doctor.years1'), t('doctor.years2'), t('doctor.years3')]

const experience = computed(() => {
    const translate = getDeclination(props.data.exp_years, translationYears)

    return `${ props.data.exp_years } ${ translate }`
})

const onOpenAppointmentModal = () => {
    const selectedMarketing = rootStore?.pageMarketing || staticData?.defaultMarketingLead || null

    appointmentModalStore.SET_APPOINTMENT_MODAL_DATA({
        title: t('appointmentModal.title'),
        option: props.data.full_name,
        button: t('global.buttons.appointment')
    })
    appointmentModalStore.SET_EVENT(MARKETING_EVENTS.DOCTOR)
    appointmentModalStore.SET_SYSTEM_NAME('doctor-hero-banner')
    appointmentModalStore.SET_MARKETING(selectedMarketing)
    modalsStore.TOGGLE_APPOINTMENT_MODAL()
    activeModalsStore.ADD_ACTIVE_KEYS([MODALS_KEYS.APPOINTMENT])
}
</script>

<style lang="scss" scoped>
.doctor-hero-banner {
    margin-bottom: 20px;

    @media (min-width: $tablet-breakpoint) {
        margin-bottom: 30px;
    }

    @media (min-width: $desktop-breakpoint) {
        margin-bottom: 40px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        margin-bottom: 48px;
    }

    &__inner {
        margin-top: 5px;
        overflow: hidden;
        background-color: $dark-200;
        border-radius: 15px;

        @media (min-width: $tablet-breakpoint) {
            margin-top: 8px;
            border-radius: 20px;
        }

        @media (min-width: $desktop-breakpoint) {
            display: flex;
            margin-top: 12px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            margin-top: 16px;
            border-radius: 30px;
        }
    }

    &__heading {
        display: flex;
        flex-direction: column;
        gap: 20px;
        padding: 20px;

        @media (min-width: $tablet-breakpoint) {
            gap: 30px;
            padding: 30px;
        }

        @media (min-width: $desktop-breakpoint) {
            flex: 1;
            justify-content: space-between;
            order: 1;
            padding: 40px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            padding: 48px;
        }
    }

    &__title {
        font-size: 32px;
        font-weight: 700;
        line-height: 120%;

        @media (min-width: $tablet-breakpoint) {
            font-size: 40px;
        }

        @media (min-width: $desktop-breakpoint) {
            font-size: 48px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 64px;
        }
    }

    &__desc {
        font-size: 16px;
        font-weight: 400;
        line-height: 140%;

        @media (min-width: $tablet-breakpoint) {
            font-size: 18px;
        }

        @media (min-width: $desktop-breakpoint) {
            font-size: 20px;
        }
    }

    &__info {
        display: flex;
        align-items: center;
        gap: 20px;
        padding: 0 20px;

        @media (min-width: $tablet-breakpoint) {
            gap: 30px;
            padding: 0 30px;
        }

        @media (min-width: $desktop-breakpoint) {
            flex: 1;
            flex-direction: column;
            align-items: flex-end;
            justify-content: space-between;
            order: 3;
            padding: 40px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            padding: 48px;
        }
    }

    &__info-block {
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 100%;

        @media (min-width: $tablet-breakpoint) {
            gap: 15px;
        }

        @media (min-width: $desktop-breakpoint) {
            align-items: flex-end;
            gap: 20px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 24px;
        }
    }

    &__info-text {
        font-size: 14px;
        font-weight: 700;
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

    &__statistic {
        display: flex;
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
    }

    &__statistic-item {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    &__statistic-icon {
        width: 18px;
        height: 18px;
        stroke: $primary-300;

        svg {
            fill: $primary-300;
        }
    }

    &__statistic-count {
        font-size: 14px;
        font-weight: 700;
        line-height: 140%;
        color: $primary-300;

        @media (min-width: $tablet-breakpoint) {
            font-size: 16px;
        }
    }

    &__button {
        width: 100%;
    }

    &__img-container {
        position: relative;
        width: 100%;
        height: 253px;

        @media (min-width: $tablet-breakpoint) {
            height: 413px;
        }

        @media (min-width: $desktop-breakpoint) {
            order: 2;
            width: 34%;
            height: 436px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            height: 620px;
        }
    }

    &__img {
        width: 100%;
        height: 100%;

        :deep(img) {
            object-position: bottom center;
        }
    }

    &__feature {
        position: absolute;
        bottom: 20px;
        left: 20px;
        width: 160px;
        padding: 10px;
        font-size: 14px;
        font-weight: 700;
        line-height: 140%;
        text-align: center;
        background: rgba($light, .25);
        border-radius: 7px;
        backdrop-filter: blur(5px);

        @media (min-width: $tablet-breakpoint) {
            bottom: 30px;
            left: 30px;
            width: 300px;
            padding: 15px;
            border-radius: 10px;
        }

        @media (min-width: $desktop-breakpoint) {
            bottom: 40px;
            left: 50%;
            width: 304px;
            padding: 20px;
            font-size: 16px;
            border-radius: 12px;
            transform: translateX(-50%);
        }

        @media (min-width: $lg-desktop-breakpoint) {
            bottom: 48px;
            width: 384px;
            padding: 24px;
            font-size: 20px;
            border-radius: 15px;
        }
    }
}

.socials {
    display: flex;
    gap: 5px;
    margin: 20px 0 10px 0;
}
</style>