<template>
    <NuxtLink 
        v-if="to" 
        :to="to"
        v-bind="$attrs"
        :class="classes"
    >
        <slot />
    </NuxtLink>
</template>

<script setup>
const props = defineProps({
    to: {
        type: String,
        required: false,
        default: '/'
    },
    isActive: {
        type: Boolean,
        required: false
    }
})

const classes = computed(() => [
    'pagination-item',
    { 'pagination-item--active': props.isActive }
])
</script>

<style lang="scss" scoped>
.pagination-item {
    position: relative;
    display: inline-block;
    min-width: 40px;
    min-height: 42px;
    padding: 2px 8px;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 140%; 
    color: $dark-500;
    text-align: right;
    text-transform: uppercase;
    border: 1px solid $dark-500;
    border-radius: 6px;
    transition: $base-ui-transition;

    @media (any-hover: hover) {
        &:hover {
            color: $light;
            background-color: $primary-500;
            border-color: $primary-500;
        }
    }

    @media (min-width: $tablet-breakpoint) {
        min-width: 48px;
        min-height: 48px;
        padding: 5px 8px 8px;
        border-radius: 8px;
    }
    
    @media (min-width: $desktop-breakpoint) {
        min-width: 56px;
        min-height: 56px;
        padding: 7px 10px 10px;
        font-size: 16px;
        border-radius: 10px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        min-width: 72px;
        min-height: 72px;
        padding: 10px 15px 15px;
        font-size: 20px;
        border-radius: 12px;
    }

    &--active {
        color: $primary-300;
        pointer-events: none;
        border: 1px solid $primary-300;

        &::after {
            content: '';
            position: absolute;
            bottom: 6px;
            left: 8px;
            width: 8px;
            height: 8px;
            background-color: $primary-400;
            border-radius: 50%;
        }
    }
}
</style>