<template>
    <NuxtLink 
        v-if="to"
        :to="to"
        :class="classes"
    >
        <slot />
    </NuxtLink>
    <button
        v-else
        :type="type"
        :class="classes"
    >
        <slot />
    </button>
</template>

<script setup>
const props = defineProps({
    to: {
        type: String,
        required: false,
        default: ''
    },
    position: {
        type: String,
        required: false,
        default: 'right',
        validator: (value) => ['right', 'center'].includes(value)
    },
    type: {
        type: String,
        required: false,
        default: 'button',
        validator: (value) => ['button', 'reset', 'submit'].includes(value)
    }
})

const classes = computed(() => [
    'button-social', 
    `button-social--${ props.position }`
])
</script>

<style lang="scss" scoped>
.button-social {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 40px;
    min-height: 40px;
    cursor: pointer;
    background-color: transparent;
    border: 1px solid $dark-500;
    border-radius: 6px;
    transition: background-color $base-ui-transition;

    @media (min-width: $tablet-breakpoint) {
        min-width: 48px;
        min-height: 48px;
        border-radius: 8px;
    }

    @media (min-width: $desktop-breakpoint) {
        min-width: 56px;
        min-height: 56px;
        border-radius: 10px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        min-width: 72px;
        min-height: 72px;
        border-radius: 12px;
    }

    @media (any-hover: hover) {
        &:hover {
            background-color: $primary-500;
            border-color: $primary-500;

            :deep(svg) {
                fill: $light;
            }
        }
    }

    :deep(svg) {
        fill: $dark-500;
        width: 20px;
        height: 20px;
        transition: fill $base-ui-transition;

        @media (min-width: $tablet-breakpoint) {
            width: 22px;
            height: 22px;
        }

        @media (min-width: $desktop-breakpoint) {
            width: 24px;
            height: 24px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            width: 32px;
            height: 32px;
        }
    }
}
</style>