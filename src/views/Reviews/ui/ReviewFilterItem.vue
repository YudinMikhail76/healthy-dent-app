<template>
    <NuxtLink
        :to="to"
        :class="[
            'filter-item',
            { 'filter-item--active': isActive }
        ]"
    >
        <slot />
    </NuxtLink>
</template>

<script setup>
defineProps({
    to: {
        type: String,
        required: false,
        default: ''
    },
    isActive: {
        type: Boolean,
        required: false
    }
})
</script>

<style lang="scss" scoped>
.filter-item {
    display: flex;
    align-items: center;
    padding: 5px 8px;
    font-size: 14px;
    font-weight: 700;
    line-height: 140%;
    color: $dark-500;
    cursor: pointer;
    border: 1.5px solid $secondary-100;
    border-radius: 6px;
    transition: all .3s;

    @media (min-width: $tablet-breakpoint) {
        padding: 6px 12px;
        font-size: 16px;
        border-radius: 8px;
    }

    @media (min-width: $desktop-breakpoint) {
        padding: 6px 14px;
        font-size: 18px;
        background-color: $light;
        border-radius: 10px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        padding: 8px 16px;
        font-size: 20px;
        border-radius: 12px;
    }

    @media (any-hover: hover) {
        &:hover {
            color: $light;
            background-color: $dark-300;
            border-color: $dark-300;
        }
    }

    &--active {
        color: $light;
        background-color: $dark-300;
        border-color: $dark-300;
    }
}
</style>