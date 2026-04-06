<template>
    <div class="service-content">
        <AppButtonTypeIcon
            class="service-content__desktop-prev"
            position="center"
            @click="emit('prevClick')"
        >
            <PrevIcon class="service-content__desktop-prev-icon" />
        </AppButtonTypeIcon>
        <div class="service-content__intro">
            <div class="service-content__img-container">
                <AppImage
                    :urls="data?.image?.urls"
                    class="service-content__img"
                    :alt="data?.image?.alt"
                    :title="data?.image?.alt"
                    loading="lazy"
                />
            </div>
            <div class="service-content__intro-texts">
                <NuxtLink
                    v-if="data.alias"
                    :to="{ path: localePath(data.alias), force: true }"
                    class="service-content__title service-content__title--link"
                >
                    {{ data.title }}
                </NuxtLink>
                <div v-else class="service-content__title">
                    {{ data.title }}
                </div>
                <AppButton class="service-content__appointment-btn" @click="onOpenAppointmentModal">
                    {{ $t('global.buttons.appointmentShort') }}
                </AppButton>
            </div>
        </div>
        <div class="service-content__content">
            <DiscountBanner 
                v-for="item in discounts" 
                :key="item.title"
                :item="item"
            />
            <div class="service-content__tags">
                <AppTag
                    v-for="tag in data?.children"
                    :key="tag.tid"
                    :to="tag?.alias ? localePath(tag.alias) : null"
                    class="service-content__tag"
                    :has-discount="!!tag.discounts.length"
                >
                    {{ tag.title }}
                    <AppBadge v-if="!!tag.discounts.length" with-margin-left>
                        {{ $t('header.services.discount') }}
                    </AppBadge>
                </AppTag>
            </div>
        </div>
    </div>
</template>

<script setup>
import DiscountBanner from '~/entities/discount-banner/ui/DiscountBanner.vue'
import AppButton from '~/shared/ui/Buttons/AppButton.vue'
import AppButtonTypeIcon from '~/shared/ui/Buttons/AppButtonTypeIcon.vue'
import AppImage from '~/shared/ui/Media/AppImage.vue'
import AppTag from '~/shared/ui/Tags/AppTag.vue'

import { useRootStore } from '~/entities/root/store/root-store'
import { useStaticDataStore } from '~/entities/root/store/static-data-store'
import { useModalsStore } from '~/entities/modals/store/modals-store'
// import { useAppointmentModalStore } from '~/entities/modals/ui/AppointmentModal/store/appointment-modal-store.js'
import { useActiveModalsStore } from '~/entities/active-modals/store/active-modals'
import { MODALS_KEYS } from '~/entities/active-modals/constants'

import PrevIcon from '~/shared/assets/icons/arrow-prev.svg'
import AppBadge from '~/shared/ui/Info/AppBadge.vue'

const emit = defineEmits(['prevClick'])

const props = defineProps({
    data: {
        type: Object,
        default: () => ({})
    }
})
const localePath = useLocalePath()
const rootStore = useRootStore()
const staticData = useStaticDataStore()
// const appointmentModalStore = useAppointmentModalStore()
const activeModalsStore = useActiveModalsStore()
const modalsStore = useModalsStore()

const { t } = useI18n()

const discounts = computed(() => props.data?.children.flatMap((child) => child.discounts))

const onOpenAppointmentModal = async () => {
    const selectedMarketing = props.data?.marketing || rootStore?.pageMarketing || staticData?.defaultMarketingLead || null

    const { useAppointmentModalStore } = await import('~/entities/modals/ui/AppointmentModal/store/appointment-modal-store.js')
    const appointmentModalStore = useAppointmentModalStore()

    if (props.data.marketing_event) {
        appointmentModalStore.SET_EVENT(props.data.marketing_event)
    }

    appointmentModalStore.SET_APPOINTMENT_MODAL_DATA({
        title: t('appointmentModal.title'),
        option: props.data.title,
        button: t('global.buttons.appointment')
    })
    appointmentModalStore.SET_SYSTEM_NAME('service-menu')
    appointmentModalStore.SET_MARKETING(selectedMarketing)
    modalsStore.TOGGLE_APPOINTMENT_MODAL()
    activeModalsStore.ADD_ACTIVE_KEYS([MODALS_KEYS.APPOINTMENT])
}
</script>

<style lang="scss" scoped>
.service-content {
    height: 100%;

    @media (min-width: $desktop-breakpoint) {
        display: flex;
        align-items: flex-start;
        gap: 64px;
    }
    
    @media (min-width: $lg-desktop-breakpoint) {
        gap: 96px;
    }

    .service-content &__desktop-prev {
        display: none;

        @media (min-width: $desktop-breakpoint) {
            display: flex;
        }
    }

    &__img-container {
        width: 120px;
        height: 120px;
        overflow: hidden;
        background: $dark-200;
        border-radius: 15px;
    }

    &__intro {
        display: flex;
        flex-direction: row-reverse;
        margin-bottom: 40px;

        @media (min-width: $tablet-breakpoint) {
            margin-bottom: 60px;
        }

        @media (min-width: $desktop-breakpoint) {
            flex-direction: column;
            gap: 40px;
            width: 288px;
            margin-bottom: 0;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 48px;
            width: 384px;
        }
    }

    &__intro-texts {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        justify-content: space-between;

        @media (min-width: $desktop-breakpoint) {
            gap: 40px;
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

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 48px;
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

    &__appointment-btn {
        width: 50%;
    }

    &__tags {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 6px;
        padding-bottom: 20px;

        @media (min-width: $tablet-breakpoint) {
            gap: 8px;
        }

        @media (min-width: $desktop-breakpoint) {
            gap: 10px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 12px;
        }
    }

    &__tag {
        display: flex;
        align-items: center;
    }

    &__content {
        display: flex;
        flex-direction: column;
        gap: 40px;
        height: 100%;
        overflow-y: auto;

        @media (min-width: $tablet-breakpoint) {
            gap: 60px;
        }

        @media (min-width: $desktop-breakpoint) {
            gap: 40px;
            padding-right: 25px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 48px;
        }
    }
}
</style>