<template>
    <div class="prices-implantation-teaser">
        <div :class="[
            'prices-implantation-teaser__inner', 
            { 'prices-implantation-teaser__inner--full-width': !slots['right-block'] }
        ]">
            <div class="prices-implantation-teaser__block prices-implantation-teaser__block-left">
                <div class="prices-implantation-teaser__content">
                    <div class="prices-implantation-teaser__title">
                        {{ badge }}
                    </div>
                    <div class="prices-implantation-teaser__desc">
                        {{ data.promotion?.description }}
                    </div>
                </div>
                <div class="prices-implantation-teaser__img">
                    <AppImage
                        v-if="data.promotion?.image?.urls"
                        :urls="data.promotion?.image?.urls"
                        :title="data.promotion?.image?.title"
                        :alt="data.promotion?.image?.alt"
                    />
                </div>
            </div>
            <div v-if="slots['right-block']" class="prices-implantation-teaser__divider prices-implantation-teaser__divider-top" />
        </div>
        <template v-if="slots['right-block']">
            <div class="prices-implantation-teaser__divider prices-implantation-teaser__divider-center" />
            <div class="prices-implantation-teaser__inner">
                <div class="prices-implantation-teaser__divider prices-implantation-teaser__divider-bottom" />
                <div class="prices-implantation-teaser__block prices-implantation-teaser__block-right">
                    <slot name="right-block" />
                </div>
            </div>
        </template>
    </div>
</template>

<script setup>
import AppImage from '~/shared/ui/Media/AppImage.vue'
import { TEASER_TYPES } from '~/views/Prices/constants';

const props = defineProps({
    data: {
        type: Object,
        required: true
    }
})

const { t } = useI18n()
const slots = useSlots()

const badge = computed(() => props.data.promotion?.type === TEASER_TYPES.HOT_HOURS
    ? t('promotion.hotHours') 
    : t('promotion.defaultTitle')
)
</script>

<style lang="scss" scoped>
.prices-implantation-teaser {
    overflow: hidden;
    border-radius: 10px;

    @media (min-width: $desktop-breakpoint) {
        display: flex;
    }

    &__inner {
        @media (min-width: $desktop-breakpoint) {
            display: flex;
            width: 50%;
        }

        &--full-width {
            width: 100%;
        }
    }

    &__block {
        display: flex;
        padding: 10px;
        background-color: $primary-200;

        @media (min-width: $tablet-breakpoint) {
            flex-grow: 1;
            padding: 15px;
        }

        @media (min-width: $desktop-breakpoint) {
            padding: 20px;
        }

        &-left {
            justify-content: space-between;
            padding: 10px 0 10px 10px;

            @media (min-width: $tablet-breakpoint) {
                padding: 15px 0 15px 15px;
            }

            @media (min-width: $desktop-breakpoint) {
                padding: 20px 0 20px 20px;
            }
        }

        &-right {
            flex-direction: column;
            gap: 10px;

            @media (min-width: $tablet-breakpoint) {
                gap: 15px;
            }

            @media (min-width: $desktop-breakpoint) {
                justify-content: space-between;
                width: 100%;
            }
        }
    }

    &__divider {
        width: 100%;
        height: 0;

        @media (min-width: $desktop-breakpoint) {
            width: 0;
            height: 100%;
        }

        &-top {
            border-top: 9px solid $primary-200;
            border-right: 10px solid $light;
            border-left: 10px solid $light;

            @media (min-width: $desktop-breakpoint) {
                border-top: 10px solid $light;
                border-right: none;
                border-bottom: 10px solid $light;
                border-left: 9px solid $primary-200;
            }
        }

        &-center {
            position: relative;
            left: 10px;
            width: calc(100% - 20px);
            height: 2px;
            background-color: rgba($primary-400, .4);

            @media (min-width: $desktop-breakpoint) {
                top: 10px;
                left: 0;
                width: 2px;
                height: auto;

                &::after {
                    content: '';
                    position: absolute;
                    bottom: 10px;
                    left: 0;
                    display: block;
                    width: 100%;
                    height: 10px;
                    background-color: $light;
                }
            }
        }

        &-bottom {
            border-right: 10px solid $light;
            border-bottom: 9px solid $primary-200;
            border-left: 10px solid $light;

            @media (min-width: $desktop-breakpoint) {
                border-top: 10px solid $light;
                border-right: 9px solid $primary-200;
                border-bottom: 10px solid $light;
                border-left: none;
            }
        }
    }

    &__content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 20px;
    }

    &__title {
        width: fit-content;
        padding: 3px 5px 4px;
        font-size: 12px;
        font-weight: 700;
        text-transform: uppercase;
        background-color: $light;
        border-radius: 3px;

        @media (min-width: $desktop-breakpoint) {
            font-size: 14px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 16px;
        }
    }

    &__desc {
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

    &__img {
        flex-shrink: 0;
        width: 120px;
        height: 120px;

        @media (min-width: $desktop-breakpoint) {
            width: 150px;
            height: 150px;
        }

        img {
            width: 100%;
            height: 100%;
        }
    }

    &__dates {
        display: flex;
        gap: 14px;

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 16px;
        }
    }

    &__dates-item {
        display: flex;
        align-items: center;
        gap: 3px;

        @media (min-width: $desktop-breakpoint) {
            gap: 5px;
        }
    }

    &__date,
    &__receptions {
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

        span {
            font-weight: 400;
        }
    }

    &__receptions {
        font-weight: 400;
    }

    &__bracket {
        color: $primary-500;
    }
}
</style>