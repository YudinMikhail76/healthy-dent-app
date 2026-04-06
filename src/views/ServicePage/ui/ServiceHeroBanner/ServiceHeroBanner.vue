<template>
    <article class="service-hero-banner">
        <AppContainer>
            <AppBreadcrumbs class="service-hero-banner__breadcrumbs" :breadcrumbs="breadcrumbs" />
            <div class="service-hero-banner__inner">
                <div class="service-hero-banner__content">
                    <div class="service-hero-banner__heading">
                        <h1 class="service-hero-banner__title">
                            {{ title }}
                        </h1>
                        <div
                            v-if="!data?.promotion?.type"
                            class="service-hero-banner__slogan"
                            v-html="data?.description"
                        />
                    </div>
                    <ServiceHeroBannerTeaser
                        v-if="data?.promotion?.type && !isHotHours || isAllowHotHours"
                        :data="data.promotion"
                        @on-click="onOpenModal"
                    />
                    <div class="service-hero-banner__bottom">
                        <div v-if="data?.teaser" class="service-hero-banner__desc">
                            {{ data?.teaser }}
                        </div>
                        <div
                            v-if="data?.button_title && !isHotHours || isAllowHotHours"
                            class="service-hero-banner__button"
                        >
                            <AppButton
                                full-width
                                background-color="#D0D5DD"
                                border-color="#494A52"
                                @on-click="onOpenModal"
                            >
                                {{ data?.button_title }}
                            </AppButton>
                        </div>
                    </div>
                </div>
                <div v-if="!!data.image?.urls || !!data.features?.length" class="service-hero-banner__img-container">
                    <AppImage
                        v-if="data.image?.image_id"
                        :urls="data.image.urls"
                        :title="data.image?.title || data.image?.alt"
                        :alt="data.image?.alt || data.image?.title"
                        class="service-hero-banner__img"
                        preload
                        fetch-priority="high"
                    />
                    <div v-if="data.features?.length" class="service-hero-banner__benefits">
                        <ServiceHeroBannerBenefit
                            v-for="feature in data.features"
                            :key="feature.value_id"
                            :data="feature"
                        />
                    </div>
                </div>
            </div>
        </AppContainer>
    </article>
</template>

<script setup>
import AppContainer from '~/shared/ui/Containers/AppContainer.vue'
import AppImage from '~/shared/ui/Media/AppImage.vue'
import AppBreadcrumbs from '~/shared/ui/Navigation/AppBreadcrumbs.vue'
import AppButton from '~/shared/ui/Buttons/AppButton.vue'

const ServiceHeroBannerBenefit = defineAsyncComponent(() => import('./ServiceHeroBannerBenefit.vue'))
const ServiceHeroBannerTeaser = defineAsyncComponent(() => import('./ServiceHeroBannerTeaser.vue'))

import { useRootStore } from '~/entities/root/store/root-store'
import { useStaticDataStore } from '~/entities/root/store/static-data-store'
import { useModalsStore } from '~/entities/modals/store/modals-store'
import { useAppointmentModalStore } from '~/entities/modals/ui/AppointmentModal/store/appointment-modal-store.js'
import { useActiveModalsStore } from '~/entities/active-modals/store/active-modals'
import { MODALS_KEYS } from '~/entities/active-modals/constants'
import { MARKETING_EVENTS } from '~/shared/utils/marketing/dataLayerEvents'
import { useHotTimeModalStore } from '~/entities/modals/ui/HotTimeModal/store/store'
import { isNonEmptyObject } from '~/shared/utils/helpers'
import { steps } from '~/entities/modals/ui/HotTimeModal/constants'

const props = defineProps({
    data: {
        type: Object,
        required: true
    },
    breadcrumbs: {
        type: Array,
        required: true
    },
    title: {
        type: String,
        required: true
    }
})

const rootStore = useRootStore()
const staticData = useStaticDataStore()
const appointmentModalStore = useAppointmentModalStore()
const activeModalsStore = useActiveModalsStore()
const modalsStore = useModalsStore()
const hotTimeModalStore = useHotTimeModalStore()

const { t } = useI18n()

const isHotHours = computed(() => props.data?.promotion?.type === 'hot_hour')
const hasButtonTitle = computed(() => props?.data?.button_title)
const isAllowHotHours = computed(() => hasButtonTitle.value 
    && isHotHours.value 
    && isNonEmptyObject(props.data?.promotion?.schedule)
)

const onOpenModal = async () => {
    const selectedMarketing = rootStore?.pageMarketing || staticData?.defaultMarketingLead || null

    if (props.data.promotion.type === 'hot_hour') {
        const services = props.data?.promotion?.connected_services.map((item) => ({ ...item, name: item.title })) || []
        hotTimeModalStore.SELECT_SERVICE({ 
            tid: props.data.tid,
            name: props.data.name,
            alias: props.data.alias
        })
        hotTimeModalStore.SELECT_STEP(steps.DATE_TIME_PICKER)
        hotTimeModalStore.SET_PROMOTION(props.data?.promotion)
        hotTimeModalStore.SET_SERVICES(services)
        hotTimeModalStore.SET_SYSTEM_NAME('service-banner-hot-hours')
        hotTimeModalStore.SET_SCHEDULE(props.data.promotion?.schedule)
        hotTimeModalStore.SET_GENERAL_PROMO(props.data?.description || props.data?.name)
        hotTimeModalStore.SET_MARKETING(selectedMarketing)
        activeModalsStore.ADD_ACTIVE_KEYS([MODALS_KEYS.HOT_TIME])
        modalsStore.TOGGLE_HOT_TIME_MODAL()
    } else {
        const { useAppointmentModalStore } = await import('~/entities/modals/ui/AppointmentModal/store/appointment-modal-store.js')
        const appointmentModalStore = useAppointmentModalStore()

        if (props.data.marketing_event) {
            appointmentModalStore.SET_EVENT(props.data.marketing_event)
        }

        appointmentModalStore.SET_APPOINTMENT_MODAL_DATA({
            title: t('appointmentModal.title'),
            option: props.title,
            button: t('global.buttons.appointment')
        })
        appointmentModalStore.SET_EVENT(MARKETING_EVENTS.APPOINTMENT_DEFAULT)
        appointmentModalStore.SET_SYSTEM_NAME('service-hero-banner')
        appointmentModalStore.SET_MARKETING(selectedMarketing)
        modalsStore.TOGGLE_APPOINTMENT_MODAL()
        activeModalsStore.ADD_ACTIVE_KEYS([MODALS_KEYS.APPOINTMENT])
    }

}
</script>

<style lang="scss" scoped>
.service-hero-banner {
    margin-bottom: 40px;

    @media (min-width: $desktop-breakpoint) {
        margin-bottom: 80px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        margin-bottom: 96px;
    }

    &--clickable {
        cursor: pointer;
    }

    &__inner {
        background-color: $dark-200;
        border-radius: 15px;

        @media (min-width: $tablet-breakpoint) {
            border-radius: 20px;
        }

        @media (min-width: $desktop-breakpoint) {
            display: flex;
            border-radius: 25px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            border-radius: 30px;
        }
    }

    &__breadcrumbs {
        margin-bottom: 6.5px;

        @media (min-width: $desktop-breakpoint) {
            margin-bottom: 12px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            margin-bottom: 16px;
        }
    }

    &__content {
        display: flex;
        flex-direction: column;
        gap: 20px;
        padding: 20px;

        @media (min-width: $tablet-breakpoint) {
            gap: 30px;
            padding: 30px;
        }

        @media (min-width: $desktop-breakpoint) {
            justify-content: space-between;
            gap: 40px;
            width: 50%;
            padding: 40px 0 40px 40px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 48px;
            padding: 48px;
        }
    }

    &__heading {
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
    }

    &__title {
        font-size: 32px;
        font-style: normal;
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

    &__slogan {
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
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

    &__bottom {
        display: flex;
        align-items: flex-end;
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

    &__desc {
        width: 100%;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 120%;

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

    &__img-container {
        position: relative;
        height: 230px;
        padding: 0 20px;
        overflow: hidden;
        border-radius: 15px;

        @media (min-width: $tablet-breakpoint) {
            display: flex;
            justify-content: center;
            height: 310px;
            padding: 0 30px;
        }

        @media (min-width: $desktop-breakpoint) {
            align-self: flex-end;
            width: 50%;
            height: 436px;
            padding: 0 40px;
            border-radius: 25px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            height: 620px;
            padding: 0 48px;
            border-radius: 30px;
        }
    }

    &__img {
        object-fit: cover;

        @media (min-width: $tablet-breakpoint) {
            width: 380px;
        }

        @media (min-width: $desktop-breakpoint) {
            width: 100%;
        }
    }

    &__button {
        width: 100%;
    }

    &__benefits {
        position: absolute;
        right: 20px;
        bottom: 20px;
        display: flex;
        flex-direction: column;
        gap: 3px;

        @media (min-width: $tablet-breakpoint) {
            right: 30px;
            bottom: 30px;
            gap: 4px;
        }

        @media (min-width: $desktop-breakpoint) {
            right: 40px;
            bottom: 40px;
            gap: 5px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            right: 48px;
            bottom: 48px;
            gap: 6px;
        }
    }
}
</style>