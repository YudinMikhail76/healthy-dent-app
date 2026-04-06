<template>
    <div :class="['app-badge', { 'app-badge--with-margin': withMarginLeft }]">
        <slot />
    </div>
</template>

<script setup>
defineProps({
    withMarginLeft: {
        type: Boolean
    }
})
</script>

<style lang="scss" scoped>
.app-badge {
    display: inline-block;
    padding: 4px;
    font-family: $main-font;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: 100%;
    color: $dark-500;
    text-transform: uppercase;
    background-color: $primary-200;
    border-radius: 3px;

    &--with-margin {
        margin-left: 16px;

        @media (min-width: $lg-desktop-breakpoint) {
            margin-left: 20px;
        }
    }
}
</style>