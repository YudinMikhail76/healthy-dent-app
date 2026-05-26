<template>
    <NuxtLink 
        v-if="to" 
        :to="to"
        v-bind="$attrs"
        :class="classes"
    >
        <slot />
    </NuxtLink>
    <button 
        v-else
        :type="type"
        v-bind="$attrs"
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
    type: {
        type: String,
        default: 'button',
        required: false,
        validator: (value) => ['button', 'submit', 'reset'].includes(value)
    },
    backgroundColor: {
        type: String,
        required: false,
        default: 'transparent'
    },
    borderColor: {
        type: String,
        required: false,
        default: '#494A52'
    },
    fullWidth: {
        type: Boolean,
        required: false
    },
    disabled: {
        type: Boolean,
        required: false,
        default: false
    }
})

const classes = computed(() => [
    'app-button',
    { 'app-button--full-width': props.fullWidth },
    { 'app-button--disabled': props.disabled }
])

const onClick = () => emit('on-click')
</script>

<style lang="scss" scoped>
.app-button {
    position: relative;
    display: inline-block;
    min-width: 107px;
    max-height: 50px;
    padding: 3px 18px 16px 8px;
    font-family: inherit;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 32px;
    color: $dark-500;
    text-align: left;
    text-transform: uppercase;
    cursor: pointer;
    /* stylelint-disable-next-line value-keyword-case */
    background-color: v-bind(backgroundColor);
    /* stylelint-disable-next-line value-keyword-case */
    border: 1px solid v-bind(borderColor);
    border-radius: 6px;
    transition: $base-ui-transition;

    @media (any-hover: hover) {
        @media (min-width: $desktop-breakpoint) {
            &:hover {
                min-width: 196px;
                color: $light;
                background-color: $primary-500;
                border-color: $primary-500;
                
                &::after {
                    background-color: $light;
                }
            }
        }

        @media (min-width: $lg-desktop-breakpoint) {
            &:hover {
                min-width: 234px;
            }
        }
    }

    @media (min-width: $tablet-breakpoint) {
        min-width: 140px;
        padding: 5px 25px 22px 10px;
        border-radius: 8px;
    }

    @media (min-width: $desktop-breakpoint) {
        min-width: 150px;
        padding: 7px 32px 25px 12px;
        font-size: 16px;
        border-radius: 10px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        min-width: 180px;
        padding: 10px 39px 34px 15px;
        font-size: 20px;
        border-radius: 12px;
    }

    &::after {
        content: '';
        position: absolute;
        right: 8px;
        bottom: 16px;
        width: 14px;
        height: 14px;
        background-color: $dark-500;
        mask-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAxNCAxNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTguNDAwMzkgMi44MDAwNEwxMS45MDA0IDcuMDAwMDRMOC40MDAzOSAxMS4yIiBzdHJva2U9IiM0OTRBNTIiIHN0cm9rZS13aWR0aD0iMS45OTk4IiBzdHJva2UtbWl0ZXJsaW1pdD0iMjIuOTI1NiIvPgo8L3N2Zz4K');
        mask-repeat: no-repeat;
        mask-size: contain;
        transition: background-color $base-ui-transition;

        @media (min-width: $tablet-breakpoint) {
            right: 10px;
            bottom: 16px;
            width: 16px;
            height: 16px;
        }

        @media (min-width: $desktop-breakpoint) {
            right: 12px;
            bottom: 7px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            right: 15px;
            bottom: 10px;
            width: 20px;
            height: 20px;
        }
    }

    &--full-width {
        width: 100%;
    }

    &--disabled {
        pointer-events: none;
        opacity: .5;
    }
}
</style>
