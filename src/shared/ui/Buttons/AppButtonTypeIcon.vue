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
        @click="onClick"
    >
        <slot />
    </button>
</template>

<script setup>
const emit = defineEmits(['on-click'])

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
    'button-icon',
    `button-icon--${ props.position }`
])

const onClick = () => emit('on-click')
</script>

<style lang="scss" scoped>
.button-icon {
    display: flex;
    max-width: 40px !important;
    min-width: 40px !important;
    min-height: 40px;
    padding: 5px;
    text-decoration: none;
    cursor: pointer;
    background-color: transparent;
    border: 1px solid $dark-500;
    border-radius: 6px;
    transition: background-color $base-ui-transition;

    @media (min-width: $tablet-breakpoint) {
        max-width: 48px;
        min-width: 48px;
        min-height: 48px;
        border-radius: 8px;
    }

    @media (min-width: $desktop-breakpoint) {
        max-width: 56px;
        min-width: 56px;
        min-height: 56px;
        border-radius: 10px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        max-width: 72px;
        min-width: 72px;
        min-height: 72px;
        border-radius: 12px;
    }

    @media (any-hover: hover) and (min-width: $desktop-breakpoint) {
        &:hover {
            background-color: $primary-500;
            border-color: $primary-500;

            :deep(svg) {
                stroke: $light;
            }
        }
    }

    &--right {
        justify-content: flex-end;

        @media (min-width: $tablet-breakpoint) {
            padding: 5px;
        }

        @media (min-width: $desktop-breakpoint) {
            padding: 7px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            padding: 10px;
        }

        :deep(svg) {
            stroke: $dark-500;
            width: 24px;
            height: 24px;
        }
    }

    &--center {
        align-items: center;
        justify-content: center;

        :deep(svg) {
            stroke: $dark-500;
            width: 20px;
            height: 20px;

            @media (min-width: $tablet-breakpoint) {
                width: 22px;
                height: 22px;
            }

            @media (min-width: $desktop-breakpoint) {
                width: 24px;
                height: 24px;
            }
        }
    }
}
</style>
