<template>
    <div class="price-package">
        <div class="price-package__heading">
            <AppLink
                v-if="data.link"
                :to="localePath(data.link)"
                class="price-package__title"
            >
                {{ data.title }}
            </AppLink>
            <div v-else class="price-package__title">
                {{ data.title }}
            </div>
            <div class="price-package__prices">
                <div class="price-package__block">
                    <div class="price-package__price">
                        {{ formatPrice(data.price) }} ₴
                    </div>
                    <div v-if="!!data.percent" class="price-package__discount">
                        -{{ data.percent }}%
                    </div>
                </div>
                <div class="price-package__block">
                    <div v-if="data?.is_installment" class="price-package__from">
                        <div class="price-package__from-text">
                            {{ $t('global.from') }} {{ formatPrice(data.price_per_month) }} ₴ / {{ $t('global.month') }}
                        </div>
                        <AppTooltip
                            :content-title="data.installment.title"
                            :content-text="data.installment.text"
                            type="regular"
                            :position="isLastElement ? 'left' : 'top'"
                            :width="278"
                        >
                            <div class="price-package__from-icon">
                                <InfoIcon />
                            </div>
                        </AppTooltip>
                    </div>
                    <div v-if="!!data.list_price" class="price-package__from-text price-package__from-text--amount">
                        {{ formatPrice(data.list_price) }} ₴
                    </div>
                </div>
            </div>
            <!-- MAIN CHARACTERISTICS  -->
            <template v-if="mainCharacteristics?.items?.length">
                <div class="price-package__container">
                    <div
                        v-for="item in mainCharacteristics?.items"
                        :key="item?.id"
                        class="price-package__block"
                    >
                        <div class="price-package__label">
                            {{ item?.name }}
                        </div>
                        <div class="price-package__label price-package__label--value">
                            {{ getMergedValuesString(item?.values) }}
                            <AppImage
                                v-if="item.values[0].value_icon"
                                :src="item.values[0].value_icon"
                                class="price-package__flag"
                                :alt="item.values[0]?.value_icon__alt"
                                :title="item.values[0]?.value_icon__title"
                            />
                        </div>
                    </div>
                </div>
            </template>
            <div class="price-package__button-container">
                <div class="price-package__button">
                    <AppButton full-width @on-click="onOpenAppointmentModal">
                        {{ $t('global.buttons.appointmentShort') }}
                    </AppButton>
                </div>
            </div>
        </div>
        <BlockSeparator />
        <!-- COMPARISON/MIDDLE CHARACHTERISTICS-->
        <div class="price-package__container">
            <div
                v-for="item in comparisonCharacteristics.items"
                :key="item?.group_machine_name"
                class="price-package__block"
            >
                <div class="price-package__label">
                    {{ item?.name }}
                </div>
                <div v-if="isAvailableOption(item?.values)" class="price-package__icon price-package__icon--success">
                    <CheckMark />
                </div>
                <div v-else class="price-package__icon price-package__icon--error">
                    <CloseIcon />
                </div>
            </div>
        </div>
        <!-- BOTTOM CHARACHTERISTICS -->
        <template v-if="bottomCharacteristics?.items?.length">
            <BlockSeparator />
            <div class="price-package__container">
                <div
                    v-for="item in bottomCharacteristics?.items"
                    :key="item?.id"
                    class="price-package__block"
                >
                    <div class="price-package__label">
                        {{ item?.name }}
                    </div>
                    <div class="price-package__label price-package__label--value">
                        {{ getMergedValuesString(item?.values) }}
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script setup>
import AppButton from '~/shared/ui/Buttons/AppButton.vue'
import AppLink from '~/shared/ui/Links/AppLink.vue'
import AppTooltip from '~/shared/ui/Tooltip/AppTooltip.vue'
import BlockSeparator from '~/shared/ui/Separators/BlockSeparator.vue'

import { CHARACTERISTICS_KEYS } from '../constants/characteristics-keys'
import InfoIcon from '~/shared/assets/icons/info.svg'
import CloseIcon from '~/shared/assets/icons/close.svg'
import CheckMark from '~/shared/assets/icons/check-mark.svg'
import AppImage from '~/shared/ui/Media/AppImage.vue'

import { useModalsStore } from '~/entities/modals/store/modals-store'
import { useActiveModalsStore } from '~/entities/active-modals/store/active-modals'
import { MODALS_KEYS } from '~/entities/active-modals/constants'
import { MARKETING_EVENTS } from '~/shared/utils/marketing/dataLayerEvents'
import { formatPrice } from '~/shared/utils/helpers'
import { useRootStore } from '~/entities/root/store/root-store'
import { useStaticDataStore } from '~/entities/root/store/static-data-store'

const props = defineProps({
    data: {
        type: Object,
        default: () => ({})
    },
    isLastElement: {
        type: Boolean
    }
})

const { t } = useI18n()
const localePath = useLocalePath()

const rootStore = useRootStore()
const staticData = useStaticDataStore()
const activeModalsStore = useActiveModalsStore()
const modalsStore = useModalsStore()

const mainCharacteristics = computed(() => props.data.characteristics.find(
    (item) => item.group_machine_name === CHARACTERISTICS_KEYS.MAIN)
)
const comparisonCharacteristics = computed(() => props.data.characteristics.find(
    (item) => item.group_machine_name === CHARACTERISTICS_KEYS.COMPARISON)
)
const bottomCharacteristics = computed(() => props.data.characteristics.find(
    (item) => item.group_machine_name === CHARACTERISTICS_KEYS.BOTTOM)
)

const isAvailableOption = (values) => values.every((value) => !!value.value_name)
const getMergedValuesString = (values) => values.map((item) => item.value_name)?.join(',')
const onOpenAppointmentModal = async () => {
    const selectedMarketing = props.data?.marketing || rootStore?.pageMarketing || staticData?.defaultMarketingLead || null

    const { useAppointmentModalStore } = await import('~/entities/modals/ui/AppointmentModal/store/appointment-modal-store.js')
    const appointmentModalStore = useAppointmentModalStore()

    appointmentModalStore.SET_APPOINTMENT_MODAL_DATA({
        title: t('appointmentModal.title'),
        option: props.data.title,
        button: t('global.buttons.appointment')
    })
    appointmentModalStore.SET_EVENT(MARKETING_EVENTS.APPOINTMENT_DEFAULT)
    appointmentModalStore.SET_SYSTEM_NAME('price-packages')
    appointmentModalStore.SET_MARKETING(selectedMarketing)
    modalsStore.TOGGLE_APPOINTMENT_MODAL()
    activeModalsStore.ADD_ACTIVE_KEYS([MODALS_KEYS.APPOINTMENT])
}
</script>

<style lang="scss" scoped>
.price-package {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 286px;
    height: 100%;
    padding: 15px;
    background-color: $light;
    border: 3px solid $secondary-100;
    border-radius: 12px;

    @media (min-width: $tablet-breakpoint) {
        gap: 15px;
        width: 306px;
        padding: 20px;
    }

    @media (min-width: $desktop-breakpoint) {
        gap: 20px;
        width: 326px;
        padding: 25px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        gap: 24px;
        width: 454px;
        padding: 32px;
        border-radius: 15px;
    }

    &__heading {
        display: flex;
        flex-direction: column;
        gap: 10px;

        @media (min-width: $tablet-breakpoint) {
            gap: 15px;
        }

        @media (min-width: $desktop-breakpoint) {
            gap: 20px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 24px;
        }
    }

    &__title {
        margin: 0;
        font-size: 20px;
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

    &__prices {
        display: flex;
        flex-direction: column;
        gap: 3px;

        @media (min-width: $tablet-breakpoint) {
            gap: 4px;
        }

        @media (min-width: $desktop-breakpoint) {
            gap: 5px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 6px;
        }
    }

    &__block {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
    }

    &__price {
        font-size: 16px;
        font-weight: 700;
        line-height: 120%;

        @media (min-width: $tablet-breakpoint) {
            font-size: 18px;
        }

        @media (min-width: $desktop-breakpoint) {
            font-size: 20px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 24px;
        }
    }

    &__discount {
        padding: 2px 4px;
        font-size: 12px;
        font-weight: 700;
        line-height: 100%;
        background-color: $primary-200;
        border-radius: 3px;

        @media (min-width: $tablet-breakpoint) {
            font-size: 14px;
        }

        @media (min-width: $desktop-breakpoint) {
            font-size: 16px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 18px;
        }
    }

    &__from {
        display: flex;
        gap: 5px;
    }

    &__from-text {
        font-size: 12px;
        font-weight: 400;
        color: $primary-300;

        @media (min-width: $tablet-breakpoint) {
            font-size: 14px;
        }

        @media (min-width: $desktop-breakpoint) {
            font-size: 16px;
        }

        &--amount {
            margin-left: auto;
            line-height: 140%;
            text-decoration: line-through;
        }
    }

    &__from-icon {
        flex-shrink: 0;
        width: 16px;
        height: 16px;
        fill: $dark-200;
        stroke: $dark-200;

        @media (min-width: $desktop-breakpoint) {
            width: 20px;
            height: 20px;
        }
    }

    &__label {
        font-size: 14px;
        font-weight: 400;
        line-height: 140%;

        @media (min-width: $desktop-breakpoint) {
            font-size: 16px;
        }

        &--value {
            display: flex;
            align-items: center;
            gap: 6px;
            font-weight: 700;
            text-align: right;

            @media (min-width: $desktop-breakpoint) {
                gap: 8px;
            }
        }
    }

    &__button-container {
        display: flex;
        justify-content: flex-end;
    }

    &__container {
        display: flex;
        flex-direction: column;
        gap: 3px;

        @media (min-width: $desktop-breakpoint) {
            gap: 5px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 6px;
        }
    }

    &__flag {
        width: 25px;
        height: 20px;
        border-radius: 5px;

        @media (min-width: $desktop-breakpoint) {
            width: 30px;
            height: 24px;
        }
    }

    &__icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 18px;
        height: 18px;
        border-radius: 5px;

        @media (min-width: $desktop-breakpoint) {
            width: 20px;
            height: 20px;
        }

        &--success {
            background-color: $primary-200;

            svg {
                width: 8px;
                height: 6px;
                stroke: $primary-300;
            }
        }

        &--error {
            background-color: $danger-100;

            svg {
                width: 12px;
                height: 12px;
                stroke: $danger-400;
            }
        }
    }
}
</style>