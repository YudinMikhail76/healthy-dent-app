<template>
    <ParagraphItemContainer>
        <div class="price-string-paragraph">
            <div class="price-string-paragraph__heading">
                <div class="price-string-paragraph__heading-block">
                    <h2 v-if="data?.title" class="price-string-paragraph__title">
                        {{ data?.title }}
                    </h2>
                    <div
                        v-if="data?.body?.description"
                        class="price-string-paragraph__desc"
                        v-html="data?.body?.description"
                    />
                </div>
                <div class="price-string-paragraph__button-block">
                    <div class="price-string-paragraph__button">
                        <AppButton full-width @on-click="onOpenAppointmentModal">
                            {{ t('global.buttons.appointmentShort') }}
                        </AppButton>
                    </div>
                </div>
            </div>
            <PriceTeaser v-if="shouldRenderTeaser" :data="data.body">
                <template v-if="shouldRenderRightBlock" #right-block>
                    <PriceTeaserSchedule v-if="hasScheduleCounts" :data="data.body" />
                    <PriceTeaserStrings
                        v-else-if="hasDiscountPriceStrings"
                        :items="promotion?.discount_prices_strings"
                    />
                </template>
            </PriceTeaser>
            <PriceStringServiceList v-if="data?.body?.prices_strings?.length" :data="data?.body?.prices_strings" />
        </div>
    </ParagraphItemContainer>
</template>

<script setup>
import { useActiveModalsStore } from '~/entities/active-modals/store/active-modals'
import { useModalsStore } from '~/entities/modals/store/modals-store'
import { useAppointmentModalStore } from '~/entities/modals/ui/AppointmentModal/store/appointment-modal-store'
import PriceStringServiceList from '~/entities/price-card-list/ui/PriceStringServiceList.vue'
import AppButton from '~/shared/ui/Buttons/AppButton.vue'
import ParagraphItemContainer from '~/shared/ui/Containers/ParagraphItemContainer.vue'
import { MODALS_KEYS } from '~/entities/active-modals/constants'
import { MARKETING_EVENTS } from '~/shared/utils/marketing/dataLayerEvents'
import { TEASER_TYPES } from '~/views/Prices/constants'
import { useRootStore } from '~/entities/root/store/root-store'
import { useStaticDataStore } from '~/entities/root/store/static-data-store'
import { isNonEmptyObject } from '~/shared/utils/helpers'

const PriceTeaserStrings = defineAsyncComponent(() => import('~/entities/price-card-list/ui/PriceTeaserStrings.vue'))
const PriceTeaserSchedule = defineAsyncComponent(() => import('~/entities/price-card-list/ui/PriceTeaserSchedule.vue'))
const PriceTeaser = defineAsyncComponent(() => import('~/entities/price-card-list/ui/PriceTeaser.vue'))

const props = defineProps({
    data: {
        type: Object,
        required: true
    }
})

const { t } = useI18n()
const rootStore = useRootStore()
const staticData = useStaticDataStore()
const appointmentModalStore = useAppointmentModalStore()
const activeModalsStore = useActiveModalsStore()
const modalsStore = useModalsStore()

const promotion = computed(() => props.data.body?.promotion)
const isHotHoursType = computed(() => promotion.value && promotion.value?.type === TEASER_TYPES.HOT_HOURS)
const hasDiscountPriceStrings = computed(() => {
    return promotion.value
        && promotion.value?.type === TEASER_TYPES.DISCOUNT
        && !!promotion.value?.discount_prices_strings?.length
})
const hasScheduleCounts = computed(() => isHotHoursType.value && isNonEmptyObject(props.data?.body?.schedule_counts))
const shouldRenderTeaser = computed(() => isNonEmptyObject(promotion.value))
const shouldRenderRightBlock = computed(() => hasScheduleCounts.value || hasDiscountPriceStrings.value)

const onOpenAppointmentModal = () => {
    const selectedMarketing = rootStore?.pageMarketing || staticData?.defaultMarketingLead || null

    appointmentModalStore.SET_APPOINTMENT_MODAL_DATA({
        title: t('appointmentModal.title'),
        option: props.data.name,
        button: t('global.buttons.appointment')
    })
    appointmentModalStore.SET_EVENT(MARKETING_EVENTS.APPOINTMENT_DEFAULT)
    appointmentModalStore.SET_SYSTEM_NAME('prices_strings')
    appointmentModalStore.SET_MARKETING(selectedMarketing)
    modalsStore.TOGGLE_APPOINTMENT_MODAL()
    activeModalsStore.ADD_ACTIVE_KEYS([MODALS_KEYS.APPOINTMENT])
}
</script>

<style lang="scss" scoped>
.price-string-paragraph {
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