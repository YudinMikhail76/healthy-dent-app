<template>
    <div class="doctor-specialization-item">
        <div class="doctor-specialization-item__inner">
            <div class="doctor-specialization-item__block doctor-specialization-item__block-left">
                <div class="doctor-specialization-item__number">
                    <span>/</span>
                    {{ getNumberWithPrefixZero(index) }}
                </div>
                <div class="doctor-specialization-item__title">
                    Дентальна імплантологія
                </div>
            </div>
            <div class="doctor-specialization-item__divider doctor-specialization-item__divider-top" />
        </div>
        <div class="doctor-specialization-item__divider doctor-specialization-item__divider-center" />
        <div class="doctor-specialization-item__inner">
            <div class="doctor-specialization-item__divider doctor-specialization-item__divider-bottom" />
            <div class="doctor-specialization-item__block doctor-specialization-item__block-right">
                <div class="doctor-specialization-item__text">
                    Імплантація для відновлення одного чи кількох втрачених зубів, комплексне відновлення All-on-2/4/6.
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { getNumberWithPrefixZero } from '~/shared/utils/helpers'

defineProps({
    index: Number
})
</script>

<style lang="scss" scoped>
.doctor-specialization-item {
    overflow: hidden;
    border-radius: 7px;

    @media (min-width: $desktop-breakpoint) {
        display: flex;
        border-radius: 12px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        display: flex;
        border-radius: 15px;
    }

    &__inner {
        @media (min-width: $desktop-breakpoint) {
            display: flex;
            width: 50%;
        }
    }

    &__block {
        display: flex;
        padding: 10px;
        background-color: $dark-100;

        @media (min-width: $tablet-breakpoint) {
            padding: 15px;
        }

        @media (min-width: $desktop-breakpoint) {
            width: 100%;
            padding: 20px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            padding: 24px;
        }

        &-left {
            flex-direction: column;
            justify-content: space-between;
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

        &-right {
            @media (min-width: $desktop-breakpoint) {
                align-items: end;
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
            border-top: 9px solid $dark-100;
            border-right: 10px solid $light;
            border-left: 10px solid $light;

            @media (min-width: $desktop-breakpoint) {
                border-top: 10px solid $light;
                border-right: none;
                border-bottom: 10px solid $light;
                border-left: 9px solid $dark-100;
            }
        }

        &-center {
            position: relative;
            left: 10px;
            width: calc(100% - 20px);
            height: 2px;
            background-color: rgba($dark-200, .4);

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
            border-bottom: 9px solid $dark-100;
            border-left: 10px solid $light;

            @media (min-width: $desktop-breakpoint) {
                border-top: 10px solid $light;
                border-right: 9px solid $dark-100;
                border-bottom: 10px solid $light;
                border-left: none;
            }
        }
    }

    &__number {
        font-size: 14px;
        font-weight: 400;
        line-height: 140%;

        span {
            margin-right: 5px;
            color: $dark-200;
        }

        @media (min-width: $desktop-breakpoint) {
            font-size: 18px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 20px;
        }
    }

    &__title {
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

    &__text {
        font-size: 14px;
        font-weight: 400;
        line-height: 140%;

        @media (min-width: $desktop-breakpoint) {
            font-size: 18px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 20px;
        }
    }
}
</style>