<template>
    <NuxtLink v-if="to" :to="to" :class="classes">
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
    variant: {
        type: String,
        required: false,
        default: 'primary',
        validator: (value) => ['primary', 'default'].includes(value)
    },
    type: {
        type: String,
        default: 'button',
        validator: (value) => ['button', 'submit', 'reset'].includes(value)
    }
})

const classes = computed(() => [
    'app-link',
    `app-link--${ props.variant }`
])

const onClick = () => emit('on-click')
</script>

<style lang="scss" scoped>
.app-link {
    display: inline-block;
    margin: 8px 0;
    font-family: $main-font, Arial, Helvetica, sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 140%;
    cursor: pointer;
    background-color: transparent;
    border: none;

    @media (min-width: $tablet-breakpoint) {
        font-size: 16px;
    }

    @media (min-width: $desktop-breakpoint) {
        font-size: 18px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        font-size: 20px;
    }

    &--primary {
        position: relative;
        color: $primary-500;

        @media (any-hover: hover) {
            &:hover {
                color: $primary-600;

                &::after {
                    visibility: hidden;
                    opacity: 0;
                }
            }
        }

        &::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 100%;
            height: 1px;
            visibility: visible;
            background-color: $primary-500;
            opacity: 1;
            transition: $base-ui-transition ease;
        }
    }
}
</style>