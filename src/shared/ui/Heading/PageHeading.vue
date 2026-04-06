<template>
    <div class="page-heading">
        <AppContainer>
            <AppBreadcrumbs v-if="breadcrumbs?.length" :breadcrumbs="breadcrumbs" />
            <h1 class="page-heading__title-block">
                <span class="page-heading__highlighted">{{ title }}</span>
                <br>
                {{ subtitle }}
            </h1>
        </AppContainer>
    </div>
</template>

<script setup>
import AppBreadcrumbs from '~/shared/ui/Navigation/AppBreadcrumbs.vue'
import AppContainer from '../Containers/AppContainer.vue'

defineProps({
    breadcrumbs: {
        type: Array,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    }
})
</script>

<style lang="scss" scoped>
.page-heading {
    &__title-block {
        padding-bottom: 20px;
        margin-top: 8px;
        font-size: 40px;
        font-style: normal;
        font-weight: 700;
        line-height: 120%;

        @media (min-width: $desktop-breakpoint) {
            max-width: 67%;
            padding-bottom: 40px;
            margin-top: 14px;
            font-size: 64px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            padding-bottom: 48px;
            margin-top: 16px;
            font-size: 96px;
        }
    }

    &__highlighted {
        display: inline-block;
        padding: 0 5px;
        color: $secondary-100;
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
}
</style>