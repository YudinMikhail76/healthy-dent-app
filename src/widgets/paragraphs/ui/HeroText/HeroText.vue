<template>
    <div class="hero-text">
        <AppBreadcrumbs v-if="breadcrumbs" :breadcrumbs="breadcrumbs" />
        <div class="hero-text__content">
            <h1 class="hero-text__title-block">
                <span class="hero-text__highlighted">{{ data.title_background }}</span>
                <br>
                {{ data.title }}
            </h1>
            <div v-if="data.text" class="hero-text__description" v-html="data.text" />
        </div>
    </div>
</template>

<script setup>
import AppBreadcrumbs from '~/shared/ui/Navigation/AppBreadcrumbs.vue'

defineProps({
    breadcrumbs: {
        type: [Array, null],
        default: () => []
    },
    data: {
        type: Object,
        required: true
    }
})
</script>

<style lang="scss" scoped>
.hero-text {
    margin-bottom: 40px;

    @media (min-width: $tablet-breakpoint) {
        margin-bottom: 60px;
    }

    @media (min-width: $desktop-breakpoint) {
        margin-bottom: 80px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        margin-bottom: 96px;
    }

    &__title-block {
        margin-top: 8px;
        font-size: 40px;
        font-style: normal;
        font-weight: 700;
        line-height: 120%;

        @media (min-width: $desktop-breakpoint) {
            max-width: 67%;
            margin-top: 14px;
            font-size: 64px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            margin-top: 16px;
            font-size: 96px;
        }
    }

    &__highlighted {
        display: inline-block;
        padding: 0 5px;
        color: $secondary-100;
        word-break: break-word;
        background-color: $primary-500;
        border-radius: 7px;

        @media (min-width: $desktop-breakpoint) {
            padding: 0 10px;
            border-radius: 12px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            padding: 0 12px;
            border-radius: 15px;
        }
    }

    &__description {
        position: relative;
        display: flex;
        gap: 20px;
        margin-top: 20px;
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: 120%;
        color: $dark-500;
        
        @media (min-width: $desktop-breakpoint) {
            gap: 40px;
            width: 50%;
            margin-top: 40px;
            font-size: 24px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 48px;
            margin-top: 48px;
            font-size: 32px;
        }

        &::before,
        &::after {
            display: inline-block;
            color: $primary-500;
        }

        &::before {
            content: '[';
        }

        &::after {
            content: ']';
            align-self: flex-end;
        }
    }
}
</style>