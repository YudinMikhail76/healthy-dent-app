<template>
    <PricePackages :data="data?.price_package_catalog" :title="data?.title" />
</template>

<script setup>
import PricePackages from '~/entities/price-packages/ui/PricePackages.vue'

defineProps({
    data: {
        type: Object,
        required: true
    }
})
</script>

<style lang="scss" scoped>
.price-packages {
    border-radius: 0;

    &__inner {
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
        font-size: 24px;
        font-weight: 700;
        line-height: 120%;

        @media (min-width: $tablet-breakpoint) {
            font-size: 28px;
        }

        @media (min-width: $desktop-breakpoint) {
            font-size: 32px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 48px;
        }
    }
}
</style>