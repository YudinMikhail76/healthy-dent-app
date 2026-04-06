<template>
    <NuxtLink :to="disableLocalePath ? '/' : localePath('/')" class="header__company">
        <div class="header__logo">
            <LogoIconDesktop class="header__logo is-fullhd-only" />
            <LogoIconSmall class="header__logo is-fullhd-hide" />
        </div>
        <div class="header__company-text-block">
            <div class="header__company-description">
                {{ $t('header.headingPieces.start') }} <br>
                {{ $t('header.headingPieces.end') }}
            </div>
            <div class="header__star-icon">
                <StarIcon />
            </div>
        </div>
    </NuxtLink>
</template>

<script setup>
import LogoIconSmall from '~/shared/assets/icons/logo-sm.svg'
import LogoIconDesktop from '~/shared/assets/icons/logo-desktop.svg'
import StarIcon from '~/shared/assets/icons/star.svg'

defineProps({
    disableLocalePath: {
        type: Boolean
    }
})

const localePath = useLocalePath()
</script>

<style lang="scss" scoped>
.header {
    &__company {
        display: flex;
        flex-grow: 1;
        align-items: center;
        justify-content: space-between;
        gap: 20px;
        height: 48px;
        padding: 9px 10px;
        background-color: $light;
        border-radius: 6px;

        @media (any-hover: hover) {
            &:hover {
                background-color: $light;
            }
        }

        @media (min-width: $tablet-breakpoint) {
            padding: 9px 15px;
        }

        @media (min-width: $desktop-breakpoint) {
            gap: 61px;
            min-height: 56px;
            padding: 8px 20px;
            background-color: rgba($light, .5);
            border-radius: 10px;
            transition: background-color $base-ui-transition;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 61px;
            min-height: 72px;
            padding: 16px 24px;
        }
    }

    &__logo {
        display: flex;
        align-items: center;
        fill: $dark-500;
    }

    &__company-text-block {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 10px;
        height: 100%;

        @media (min-width: $tablet-breakpoint) {
            width: 166px;
        }
        
        @media (min-width: $desktop-breakpoint) {
            justify-content: flex-end;
            gap: 20px;
            min-width: 197px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            min-width: 210px;
        }
    }

    &__star-icon {
        height: 28px;
        max-width: 28px;
        min-width: 28px;

        @media (min-width: $desktop-breakpoint) {
            height: 34px;
            max-width: 34px;
            min-width: 34px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            height: 40px;
            max-width: 40px;
            min-width: 40px;
        }
    }

    &__company-description {
        display: none;
        height: 100%;

        @media (min-width: $tablet-breakpoint) {
            display: block;
            font-size: 12px;
            font-style: normal;
            font-weight: 400;
            line-height: 140%;
            color: $primary-300;
            text-align: right;
        }

        @media (min-width: $desktop-breakpoint) {
            font-size: 14px;
        }
    }
}
</style>