<template>
    <AppContainer>
        <div class="services-step__inner">
            <div class="services-step__header">
                <div class="services-step__heading">
                    <div class="services-step__company">
                        <div class="services-step__logo">
                            <LogoLargeIcon class="services-step__logo-icon is-desktop-only" />
                            <LogoSmallIcon class="services-step__logo-icon is-desktop-hide" />
                        </div>
                        <div class="services-step__company-text-block">
                            <div class="services-step__company-description">
                                {{ $t('header.headingPieces.start') }}<br>
                                {{ $t('header.headingPieces.end') }}
                            </div>
                            <StarIcon class="services-step__star-icon" />
                        </div>
                    </div>
                    <AppButtonTypeIcon
                        v-if="isPrevVisible"
                        position="center"
                        class="services-step__prev is-desktop-hide"
                        @click="emit('headingPrevClick')"
                    >
                        <ArrowPrevIcon />
                    </AppButtonTypeIcon>
                </div>
                <HeaderStepTitles :selected-step-title="subStepTitle" />
                <AppButtonTypeIcon
                    class="services-step__close-icon"
                    @click="emit('close')"
                >
                    <CloseIcon />
                </AppButtonTypeIcon>
            </div>
            <div class="services-step__content">
                <slot />
            </div>
        </div>
    </AppContainer>
</template>

<script setup>
import AppButtonTypeIcon from '~/shared/ui/Buttons/AppButtonTypeIcon.vue'
import AppContainer from '~/shared/ui/Containers/AppContainer.vue'

import StarIcon from '~/shared/assets/icons/star.svg'
import LogoLargeIcon from '@/shared/assets/icons/logo-desktop.svg'
import LogoSmallIcon from '@/shared/assets/icons/logo-sm.svg'
import CloseIcon from '@/shared/assets/icons/close.svg'
import ArrowPrevIcon from '@/shared/assets/icons/arrow-prev.svg'
import HeaderStepTitles from './HeaderStepTitles.vue'

const emit = defineEmits(['close', 'headingPrevClick'])

const props = defineProps({
    subStepTitle: {
        type: String,
        required: false,
        default: ''
    },
    isPrevVisible: {
        type: Boolean
    }
})
</script>

<style lang="scss" scoped>
.services-step {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    display: none;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    background-color: $secondary-100;

    &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px 0 10px;

        @media (min-width: $tablet-breakpoint) {
            padding: 30px 0 15px;
        }

        @media (min-width: $desktop-breakpoint) {
            padding: 40px 0 20px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            padding: 48px 0 24px;
        }
    }

    &__heading {
        display: flex;
        align-items: stretch;
        gap: 5px;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 140%;

        @media (min-width: $desktop-breakpoint) {
            gap: 5px;
        }
    }

    &__logo {
        display: flex;
        align-items: center;

        @media (min-width: $desktop-breakpoint) {
            margin-top: 3px;
        }
    }

    &__company {
        display: none;

        @media (min-width: $desktop-breakpoint) {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 114px;
            padding: 8px 20px;
            border: 1px solid $dark-500;
            border-radius: 10px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 106px;
            padding: 16px 24px;
            border-radius: 12px;
        }
    }

    &__company-text-block {
        display: none;

        @media (min-width: $desktop-breakpoint) {
            display: flex;
            align-items: center;
            gap: 20px;
            height: 100%;
        }
    }

    &__company-description {
        @media (min-width: $desktop-breakpoint) {
            min-width: 128px;
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 140%;
            color: $primary-300;
        }
    }

    &__star-icon {
        @media (min-width: $desktop-breakpoint) {
            display: flex;
            height: 28px;
            max-width: 28px;
            min-width: 28px;
        }
    }

    &__logo-icon {
        fill: $dark-500;
    }

    &__actions {
        display: flex;
        gap: 5px;
    }

    &__content {
        position: relative;
        padding: 20px 0;

        @media (min-width: $tablet-breakpoint) {
            padding: 30px 0;
        }

        @media (min-width: $desktop-breakpoint) {
            padding: 40px 0;
        }
    }
}

.transform-enter-active,
.transform-leave-active {
    transition: .5s cubic-bezier(.05, 1.06, .54, 1.12);
    transform: translateY(0);
}

.transform-enter-from,
.transform-leave-to {
    transform: translateY(-100%);
}
</style>