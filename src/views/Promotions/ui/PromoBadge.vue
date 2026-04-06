<template>
    <div class="promo-badge">
        <HotHoursIcon v-if="badgeType === PROMO_VARIANTS.HOT_HOUR" class="promo-badge__icon" />
        <DiscountIcon v-else class="promo-badge__icon" />
        <slot />
    </div>
</template>

<script setup>
import { PROMO_VARIANTS } from '../constants'

const HotHoursIcon = defineAsyncComponent(() => import('~/shared/assets/icons/hot-hours.svg'))
const DiscountIcon = defineAsyncComponent(() => import('~/shared/assets/icons/percent.svg'))

defineProps({
    badgeType: {
        type: String,
        required: true,
        validator: (value) => [PROMO_VARIANTS.HOT_HOUR, PROMO_VARIANTS.DISCOUNT].includes(value)
    }
})
</script>

<style lang="scss" scoped>
.promo-badge {
    display: flex;
    gap: 3px;
    width: fit-content;
    padding: 2px 5px 2px 3px;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: 140%;
    background-color: $primary-200;
    border-radius: 5px;

    @media (min-width: $tablet-breakpoint) {
        padding: 6px;
        font-size: 14px;
    }

    @media (min-width: $desktop-breakpoint) {
        gap: 5px;
        padding: 8px 10px 8px 8px;
        font-size: 16px;
        border-radius: 7px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        padding: 11.5px 15px 11.5px 12px;
        font-size: 18px;
        border-radius: 10px;
    }
    
    &__icon {
        width: 20px;
        height: 20px;
        fill: $primary-400;

        @media (min-width: $desktop-breakpoint) {
            width: 24px;
            height: 24px;
        }
    }
}
</style>