<template>
    <div class="promo-intro">
        <div class="promo-intro__content">
            <PromoBadge :badge-type="data.type_id">
                {{ data.type_label }}
            </PromoBadge>
            <div class="promo-intro__title">
                {{ data.title }}
            </div>
            <div class="promo-intro__buttons">
                <AppButton class="promo-intro__appointment-btn" @on-click="onOpenAppointmentModal">
                    {{ $t('global.buttons.appointmentShort') }}
                </AppButton>
                <div class="promo-intro__link-wrap">
                    <AppLink :to="localePath(data.main_service?.alias)">
                        {{ $t('promo.toServices') }}
                    </AppLink>
                </div>
            </div>
        </div>
        <div class="promo-intro__image-container">
            <AppImage
                :urls="data.image.urls"
                class="promo-intro__image"
                :alt="data.image.alt"
                :title="data.image.alt"
                :loading="lazyImg ? 'lazy' : null"
            />
        </div>
    </div>
</template>

<script setup>
import PromoBadge from './PromoBadge.vue'
import AppButton from '~/shared/ui/Buttons/AppButton.vue'
import AppLink from '~/shared/ui/Links/AppLink.vue'
import AppImage from '~/shared/ui/Media/AppImage.vue'

import { useRootStore } from '~/entities/root/store/root-store'
import { useStaticDataStore } from '~/entities/root/store/static-data-store'
import { useModalsStore } from '~/entities/modals/store/modals-store'
import { useActiveModalsStore } from '~/entities/active-modals/store/active-modals'
import { MODALS_KEYS } from '~/entities/active-modals/constants'
import { FORM_TYPES } from '~/entities/modals/ui/AppointmentModal/utils/form-types'
import { MARKETING_EVENTS } from '~/shared/utils/marketing/dataLayerEvents'

const props = defineProps({
    data: {
        type: Object,
        required: true
    },
    lazyImg: {
        type: Boolean,
        default: false
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
    const services = props.data?.connected_services?.map((item) => ({ ...item, name: item.title })) || []

    if (props.data.type_id === 'hot_hour') {
        const { useHotTimeModalStore } = await import('~/entities/modals/ui/HotTimeModal/store/store')
        const hotTimeModalStore = useHotTimeModalStore()

        hotTimeModalStore.SET_SERVICES(services)
        hotTimeModalStore.SET_SYSTEM_NAME('promo')
        hotTimeModalStore.SET_SCHEDULE(props.data.schedule)
        hotTimeModalStore.SET_GENERAL_PROMO(props.data?.description)
        hotTimeModalStore.SET_MARKETING(selectedMarketing)
        hotTimeModalStore.SET_PROMOTION({ 
            amount: props.data?.discount || '',
            description: props.data?.description || ''
        })
        activeModalsStore.ADD_ACTIVE_KEYS([MODALS_KEYS.HOT_TIME])
        modalsStore.TOGGLE_HOT_TIME_MODAL()
    } else {
        const { useAppointmentModalStore } = await import('~/entities/modals/ui/AppointmentModal/store/appointment-modal-store.js')
        const appointmentModalStore = useAppointmentModalStore()

        appointmentModalStore.SET_APPOINTMENT_MODAL_DATA({
            title: t('appointmentModal.titlePromo'),
            option: props.data.title,
            button: t('global.buttons.appointment')
        })
        appointmentModalStore.SET_EVENT(MARKETING_EVENTS.DISCOUNT)
        appointmentModalStore.SET_SYSTEM_NAME('promo')
        appointmentModalStore.SET_MARKETING(selectedMarketing)
        appointmentModalStore.SET_TYPE(FORM_TYPES.PROMO)
        modalsStore.TOGGLE_APPOINTMENT_MODAL()
        activeModalsStore.ADD_ACTIVE_KEYS([MODALS_KEYS.APPOINTMENT])
    }

}
</script>

<style lang="scss" scoped>
.promo-intro {
    display: flex;
    flex-direction: column;
    gap: 20px;

    @media (min-width: $tablet-breakpoint) {
        gap: 30px;
    }

    @media (min-width: $desktop-breakpoint) {
        flex-direction: row;
        gap: 40px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        gap: 48px;
    }

    &__content {
        display: flex;
        flex-direction: column;
        gap: 20px;
        margin-bottom: 20px;

        @media (min-width: $tablet-breakpoint) {
            gap: 30px;
            margin-bottom: 30px;
        }

        @media (min-width: $desktop-breakpoint) {
            gap: 40px;
            width: 50%;
            margin-bottom: 0;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 48px;
        }
    }

    &__title {
        font-size: 24px;
        font-style: normal;
        font-weight: 700;
        line-height: 120%;
        color: $dark-500;

        @media (min-width: $tablet-breakpoint) {
            font-size: 28px;
        }

        @media (min-width: $desktop-breakpoint) {
            font-size: 32px;
        }

        @media (min-width: $tablet-breakpoint) {
            font-size: 48px;
        }
    }

    &__buttons {
        display: flex;
        align-items: center;
    }

    &__link-wrap,
    &__appointment-btn {
        width: 50%;
    }

    &__link-wrap {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 20px;
    }

    &__image-container {
        height: 128px;
        overflow: hidden;
        border-radius: 7px;
        
        @media (min-width: $tablet-breakpoint) {
            height: 192px;
        }

        @media (min-width: $desktop-breakpoint) {
            width: 50%;
            height: 290px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            height: 332px;
        }
    }
}
</style>