<template>
    <NuxtLink :to="to" class="link-tag">
        <slot />
    </NuxtLink>
</template>

<script setup>
defineProps({
    to: {
        type: String,
        required: true
    }
})
</script>

<style lang="scss" scoped>
.link-tag {
    display: inline-block;
    padding: 6px 8px;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
    color: $dark-500;
    background-color: $light;
    border: 1px solid $secondary-100;
    border-radius: 8px;

    @media (any-hover: hover) {
        &:hover {
            background-color: $light;
        }
    }

    @media (min-width: $tablet-breakpoint) {
        font-size: 16px;
    }

    @media (min-width: $desktop-breakpoint) {
        padding: 6px 10px;
        font-size: 18px;
        background: rgba($light, .5);
        border-radius: 10px;
        transition: background-color $base-ui-transition;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        padding: 9px 12px;
        font-size: 20px;
        border-radius: 12px;
    }
}
</style>