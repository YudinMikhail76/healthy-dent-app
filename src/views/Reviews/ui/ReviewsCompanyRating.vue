<template>
    <div class="company-rating">
        <div class="company-rating__title">
            {{ $t('reviews.ratingTitle') }}
        </div>
        <div class="company-rating__statistic">
            <div class="company-rating__average">
                {{ Number(data.avg).toFixed(1) }}
            </div>
            <div class="company-rating__count">
                <div class="company-rating__icon">
                    <ReviewsIcon />
                </div>
                <div class="company-rating__total">
                    {{ data.count }}
                </div>
            </div>
        </div>
        <div class="company-rating__button">
            <AppButton full-width @on-click="onClick">
                {{ $t('global.buttons.reviews') }}
            </AppButton>
        </div>
    </div>
</template>

<script setup>
import AppButton from '~/shared/ui/Buttons/AppButton.vue'
import ReviewsIcon from '~/shared/assets/icons/reviews-icon.svg'

import { useActiveModalsStore } from '~/entities/active-modals/store/active-modals'
import { useModalsStore } from '~/entities/modals/store/modals-store'
import { MODALS_KEYS } from '~/entities/active-modals/constants'

defineProps({
    data: {
        type: Object,
        required: true
    }
})

const activeModalsStore = useActiveModalsStore()
const modalsStore = useModalsStore()

const onClick = () => {
    activeModalsStore.ADD_ACTIVE_KEYS([MODALS_KEYS.REVIEW])
    modalsStore.TOGGLE_REVIEW_MODAL()
}
</script>

<style lang="scss" scoped>
.company-rating {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 15px;
    width: 100%;
    padding: 20px;
    background-color: $dark-100;
    border-radius: 10px;

    @media (min-width: $tablet-breakpoint) {
        flex-wrap: nowrap;
        justify-content: space-between;
        padding: 30px;
    }

    @media (min-width: $desktop-breakpoint) {
        flex-direction: column;
        gap: 20px;
        padding: 40px;
        border-radius: 12px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        gap: 24px;
        padding: 48px;
        border-radius: 15px;
    }

    &__title {
        width: 50%;
        font-size: 14px;
        font-weight: 400;
        line-height: 140%;
        color: $dark-300;

        @media (min-width: $tablet-breakpoint) {
            width: 180px;
            font-size: 16px;
        }

        @media (min-width: $desktop-breakpoint) {
            width: 100%;
            font-size: 18px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 20px;
        }
    }

    &__statistic {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 30px;

        @media (min-width: $desktop-breakpoint) {
            width: 100%;
        }
    }

    &__average {
        font-size: 40px;
        font-weight: 700;
        line-height: 120%;

        @media (min-width: $tablet-breakpoint) {
            font-size: 48px;
        }

        @media (min-width: $desktop-breakpoint) {
            font-size: 64px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 96px;
        }
    }

    &__count {
        display: flex;
        flex-direction: column;
        align-items: center;
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

    &__total {
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

    &__icon {
        width: 18px;
        height: 18px;
        fill: $dark-500;

        @media (min-width: $desktop-breakpoint) {
            width: 20px;
            height: 20px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            width: 24px;
            height: 24px;
        }
    }

    &__button {
        width: 100%;

        @media (min-width: $tablet-breakpoint) {
            width: 180px;
        }

        @media (min-width: $desktop-breakpoint) {
            width: 100%;
        }
    }
}
</style>