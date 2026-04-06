<template>
    <div class="service-item">
        <div class="service-item__content">
            <div class="service-item__image-container">
                <AppImage 
                    :urls="item?.image?.urls"
                    :alt="item?.image?.alt"
                    :title="item?.image?.alt"
                    :loading="lazyImage ? 'lazy' : null"
                />
            </div>
            <div class="service-item__text-block">
                <div class="service-item__title">
                    {{ item?.title }}
                </div>
                <div class="service-item__badges">
                    <div v-if="item.hot_hours" class="service-item__hot-hours">
                        <HotHoursIcon />
                    </div>
                    <div v-if="item.discounts" class="service-item__discount">
                        <PercentIcon class="service-item__discount-icon" />
                        {{ discountCount }}
                    </div>
                </div>
            </div>
        </div>
        <div v-if="!isLink" class="service-item__next-step">
            <ChevronRightIcon class="service-item__next-step-icon" />
        </div>
    </div>
</template>

<script setup>
import AppImage from '~/shared/ui/Media/AppImage.vue'

import PercentIcon from '@/shared/assets/icons/percent.svg'
import HotHoursIcon from '@/shared/assets/icons/hot-hours.svg'
import ChevronRightIcon from '~/shared/assets/icons/chevron-right.svg'

const props = defineProps({
    item: {
        type: Object,
        required: true
    },
    isLink: {
        type: Boolean
    },
    lazyImage: {
        type: Boolean
    }
})

const discountCount = computed(() => Array.isArray(props.discounts) ? props.discounts.length : props.discounts)
</script>

<style lang="scss" scoped>
.service-item {
    position: relative;
    display: flex;
    font-style: normal;
    font-weight: 700;
    line-height: 140%;
    color: $dark-500;
    background-color: $light;
    border: 3px solid $secondary-100;
    border-radius: 10px;
    
    @media (min-width: $tablet-breakpoint) {
        flex-direction: row;
        justify-content: flex-start;
    }

    @media (min-width: $desktop-breakpoint) {
        cursor: pointer;
        background-color: rgba($light, .5);
        border-radius: 12px;
        transition: background-color $base-ui-transition;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        border-radius: 15px;
    }
    
    @media (any-hover: hover) {
        &:hover {
            background-color: $light;

            .service-item__image-container {
                border-radius: 50%;
            }
        }
    }

    &__content {
        display: flex;
        flex-grow: 1;
        align-items: center;
        gap: 15px;
        padding: 15px;

        @media (min-width: $tablet-breakpoint) {
            display: flex;
            flex-grow: 1;
            align-items: center;
            gap: 15px;
            height: 100%;
            min-height: 102px;
        }

        @media (min-width: $desktop-breakpoint) {
            flex-direction: column-reverse;
            align-items: flex-start;
            justify-content: space-between;
            min-height: 222px;
            padding: 20px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            min-height: 330px;
            padding: 25px;
        }
    }

    &__image-container {
        width: 56px;
        height: 56px;
        overflow: hidden;
        background-color: $dark-200;
        border-radius: 50%;
        
        @media (min-width: $tablet-breakpoint) {
            width: 72px;
            height: 72px;
        }
        
        @media (min-width: $desktop-breakpoint) {
            width: 90px;
            height: 90px;
            margin-bottom: 0;
            border-radius: 15px;
            transition: border-radius $base-ui-transition;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            width: 140px;
            height: 140px;
        }
    }

    &__text-block {
        flex-grow: 1;

        @media (min-width: $desktop-breakpoint) {
            flex-grow: initial;
        }
    }

    &__title {
        margin-bottom: 8px;
        font-size: 14px;

        @media (min-width: $tablet-breakpoint) {
            margin-bottom: 10px;
            font-size: 16px;
        }

        @media (min-width: $desktop-breakpoint) {
            font-size: 18px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 20px;
        }
    }

    &__badges {
        display: flex;
        align-items: center;
        gap: 5px;

        @media (min-width: $desktop-breakpoint) {
            position: absolute;
            right: 20px;
            bottom: 20px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            position: absolute;
            right: 25px;
            bottom: 25px;
        }
    }

    &__hot-hours {
        width: 24px;
        height: 24px;
    }

    &__discount {
        display: flex;
        align-items: center;
        gap: 3px;
        font-size: 16px;
    }

    &__discount-icon {
        width: 24px;
        height: 24px;
        fill: $primary-400;
    }

    &__next-step {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 86px;
        min-height: 86px;

        @media (min-width: $tablet-breakpoint) {
            width: 102px;
            min-height: 102px;
        }

        @media (min-width: $desktop-breakpoint) {
            display: none;
        }

        &::after,
        &::before {
            content: '';
            position: absolute;
            left: 0;
            width: 2px;
            height: 12px;
            background-color: $secondary-100;
        }

        &::before {
            top: 0;
            border-radius: 0 0 10px 10px;
        }

        &::after {
            bottom: 0;
            border-radius: 10px 10px 0 0;
        }
    }

    &__next-step-icon {
        stroke: $dark-500;
        width: 18px;
        height: 18px;
    }
}
</style>