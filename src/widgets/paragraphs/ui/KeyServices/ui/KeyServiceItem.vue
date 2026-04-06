<template>
    <component
        :is="data.link ? NuxtLink : 'div'"
        :to="localePath(data.link)"
        class="key-service-item"
    >
        <p class="key-service-item__title is-desktop-only">
            {{ data.title }}
        </p>
        <div class="key-service-item__content">
            <AppImage 
                :urls="data?.image?.urls"
                class="key-service-item__image"
                :title="data.image.alt"
                :alt="data.image.alt"
                fit="contain"
            />
            <div class="key-service-item__text">
                <p class="key-service-item__title is-desktop-hide">
                    {{ data.title }}
                </p>
                <div class="key-service-item__icons">
                    <div v-if="!data.hot_hours" class="key-service-item__icon">
                        <SvgHotHours />
                    </div>
                    <div v-if="data.discounts" class="key-service-item__icon key-service-item__icon-discount">
                        <SvgPercent />
                        {{ data.discounts }}
                    </div>
                </div>
            </div>
        </div>
    </component>
</template>

<script setup>
import { NuxtLink } from '#components'

import AppImage from '~/shared/ui/Media/AppImage.vue'
import SvgPercent from '@/shared/assets/icons/percent.svg'
import SvgHotHours from '@/shared/assets/icons/hot-hours.svg'

defineProps({
    data: {
        type: Object,
        required: true
    }
})

const localePath = useLocalePath()
</script>

<style lang="scss" scoped>
.key-service-item {
    position: relative;
    z-index: 0;
    display: flex;
    flex: 0 1 100%;
    width: 100%;
    min-height: auto;
    padding: 15px;
    margin-top: -3px;
    background-color: $light;
    border: 3px solid $secondary-100;
    border-radius: 10px;
    
    @media (min-width: $desktop-breakpoint) {
        flex: 0 1 25%;
        flex-direction: column;
        width: 25%;
        min-height: 300px;
        padding: 20px;
        margin-right: -3px;
        background-color: rgba($light, .5);
        border-radius: 15px;
        transition: background $base-ui-transition;
    }
    
    @media (any-hover: hover) {
        &:hover {
            background: $light;
        }
    }

    @media (min-width: $lg-desktop-breakpoint) {
        padding: 25px;
    }

    &__title {
        font-size: 20px;
        font-weight: 700;
        line-height: 140%;
        color: $dark-500;
        font-feature-settings: 'ss05' on, 'ss11' on;
        word-break: break-word;

        @media (max-width: $desktop-breakpoint) {
            font-size: 18px;
        }

        @media (max-width: $tablet-breakpoint) {
            font-size: 16px;
        }

        @media (max-width: $mobile-breakpoint) {
            font-size: 14px;
        }
    }

    &__content {
        display: flex;
        flex-direction: row;
        align-items: stretch;

        @media (min-width: $desktop-breakpoint) {
            align-items: end;
            margin-top: auto;
        }
    }

    &__image {
        height: 56px;
        max-width: 56px;
        min-width: 56px;
        overflow: hidden;
        border-radius: 50%;
        transition: border-radius $base-ui-transition;
        background-color: $dark-200;

        @media (min-width: $tablet-breakpoint) {
            height: 72px;
            max-width: 72px;
            min-width: 72px;
        }

        @media (min-width: $desktop-breakpoint) {
            height: auto;
            max-width: 90px;
            min-width: 90px;
            border-radius: 12px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            width: 140px;
            height: auto;
            max-width: 55.4%;
            border-radius: 15px;
        }

        :deep(img) {
            display: block;
        }
    }

    &__text {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-left: 15px;

        @media (min-width: $desktop-breakpoint) {
            flex: 1 1 50%;
        }
    }

    &__icons {
        display: flex;
        justify-content: flex-start;
        gap: 5px;

        @media (min-width: $desktop-breakpoint) {
            justify-content: flex-end;
            margin-top: auto;
        }   
    }

    &__icon {
        display: flex;
        align-items: center;
        font-size: 16px;
        font-weight: 700;
        line-height: 140%;
        color: $dark-500;

        svg {
            fill: $primary-400;
            width: 18px;
            height: 18px;
        }
    }

    &__icon-discount {
        svg {
            margin-right: 3px;
        }
    }

    @media (any-hover: hover) {
        &:hover {
            background: $light;

            .key-service-item__image {
                border-radius: 50%;
            }
        }
    }
}
</style>