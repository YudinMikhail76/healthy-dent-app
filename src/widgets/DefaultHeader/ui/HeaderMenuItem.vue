<template>
    <div class="menu-item">
        <div class="menu-item__content">
            <div class="menu-item__image-container">
                <AppImage 
                    :urls="item?.image?.urls"
                    :alt="item?.image?.alt"
                    :title="item?.image?.alt"
                    loading="lazy"
                />
            </div>
            <div class="menu-item__title">
                {{ item?.title }}
            </div>
        </div>
        <div v-if="!isLink" class="menu-item__next-step">
            <ChevronRightIcon class="menu-item__next-step-icon" />
        </div>
    </div>
</template>

<script setup>
import AppImage from '~/shared/ui/Media/AppImage.vue'

import ChevronRightIcon from '~/shared/assets/icons/chevron-right.svg'

const props = defineProps({
    item: {
        type: Object,
        required: true
    },
    isLink: {
        type: Boolean,
        default: true
    },
    lazyImage: {
        type: Boolean
    }
})
</script>

<style lang="scss" scoped>
.menu-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
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

            .menu-item__image-container {
                border-radius: 50%;
            }
        }
    }

    &__content {
        display: flex; 
        flex-direction: column;
        align-items: center;
        padding: 15px;

        @media (min-width: $tablet-breakpoint) {
            flex-direction: row;
            flex-grow: 1;
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
        margin-bottom: 10px;
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

    &__title {
        font-size: 14px;
        font-style: normal;
        font-weight: 700;
        line-height: 140%;
        text-align: center;

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

    &__next-step {
        display: none;
        width: 102px;
        height: 100%;
        min-height: 102px;
        
        @media (min-width: $tablet-breakpoint) {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;

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

        @media (min-width: $desktop-breakpoint) {
            display: none;
        }
    }

    &__next-step-icon {
        stroke: $dark-500;
        width: 18px;
        height: 18px;
    }
}
</style>