<template>
    <div class="parameters-item">
        <div class="parameters-item__name">
            {{ data?.name }}
        </div>
        <div class="parameters-item__values">
            <div
                v-for="value in data?.values"
                :key="value"
                class="parameters-item__value"
            >
                <div class="parameters-item__name parameters-item__name--bold">
                    {{ value }}
                </div>
                <div v-if="data.country?.code" class="parameters-item__icon">
                    <component :is="getFlagIcon(data.country.code)" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { getFlagIcon } from '~/shared/utils/iconsHelpers'

defineProps({
    data: {
        type: Object,
        required: true
    }
})
</script>

<style lang="scss" scoped>
.parameters-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 5px;

    @media (min-width: $tablet-breakpoint) {
        gap: 8px;
    }

    @media (min-width: $desktop-breakpoint) {
        gap: 10px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        gap: 12px;
    }

    &__name {
        font-size: 14px;
        font-weight: 400;
        line-height: 140%;
        text-align: end;

        @media (min-width: $tablet-breakpoint) {
            font-size: 16px;
        }

        @media (min-width: $desktop-breakpoint) {
            font-size: 18px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 20px;
        }

        &--bold {
            font-weight: 700;
        }
    }

    &__values {
        display: flex;
        align-items: center;
        gap: 5px;

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

    &__value {
        display: flex;
        align-items: center;
        gap: 5px;

        @media (min-width: $tablet-breakpoint) {
            gap: 8px;
        }

        @media (min-width: $desktop-breakpoint) {
            gap: 10px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 12px;
        }

        &::after {
            content: '/';
            font-size: 14px;
            font-weight: 700;
            line-height: 140%;
            color: $primary-500;
        }

        &:last-child::after {
            content: '';
        }
    }

    &__icon {
        flex-shrink: 0;
        width: 30px;
        height: 24px;
        overflow: hidden;
        border-radius: 5px;

        svg {
            width: 100%;
            height: 100%;
        }
    }
}
</style>