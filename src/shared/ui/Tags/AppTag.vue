<template>
    <NuxtLink 
        v-if="to" 
        :to="{ path: to, force: true }" 
        :class="classes"
    >
        <slot />
    </NuxtLink>
    <div v-else :class="classes">
        <slot />
    </div>
</template>

<script setup>
const props = defineProps({
    to: {
        type: String,
        required: false,
        default: ''
    },
    variant: {
        type: String,
        required: false,
        default: 'light',
        validator: (value) => ['light', 'primary'].includes(value)
    },
    disabled: {
        type: Boolean,
        required: false,
        default: false
    }
})

const classes = computed(() => [
    'app-tag',
    `app-tag--${ props.variant }`,
    { 'app-tag--disabled': props.disabled }
])
</script>

<style lang="scss" scoped>
.app-tag {
    display: inline-block;
    padding: 6px 8px;
    font-family: $main-font;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 140%;
    text-decoration: none;
    border-radius: 6px;
    transition: color $base-ui-transition, background-color $base-ui-transition;

    &--light {
        color: $dark-500;
        background-color: $light;
        border: 1.5px solid $secondary-100;

        @media (any-hover: hover) and (min-width: $desktop-breakpoint) {
            &:hover {
                color: $light;
                background-color: $primary-300;
            }
        }
    }

    &--primary {
        color: $light;
        background-color: $primary-300;
        border: 1.5px solid transparent;

        @media (any-hover: hover) and (min-width: $desktop-breakpoint) {
            &:hover {
                background-color: $primary-400;
            }
        }
    }

    &--disabled {
        pointer-events: none;
        background: $dark-200;
        opacity: .7;
    }

    @media (min-width: $tablet-breakpoint) {
        padding: 6px 12px;
        font-size: 16px;
        border-radius: 8px;
    }

    @media (min-width: $desktop-breakpoint) {
        padding: 7px 14px 8px;
        font-size: 18px;
        border-radius: 10px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        padding: 9px 16px 11px;
        font-size: 20px;
        border-radius: 12px;
    }
}
</style>