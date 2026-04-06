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
        type="button" 
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
    isSelected: {
        type: Boolean,
        required: false
    }
})

const classes = computed(() => [
    'pick-button',
    { 'pick-button--selected': props.isSelected }
])

const onClick = () => emit('on-click')
</script>

<style lang="scss" scoped>
.pick-button {
    padding: 6px 8px;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 140%;
    color: $dark-500;
    text-decoration: none;
    cursor: pointer;
    background-color: $light;
    border: 1.5px solid $secondary-100;
    border-radius: 6px;
    
    @media (any-hover: hover) and (min-width: $desktop-breakpoint) {
        &:hover {
            color: $light;
            background-color: $primary-300;
        }
    }

    @media (min-width: $tablet-breakpoint) {
        padding: 6px 12px;
        font-size: 16px;
        border-radius: 8px;
    }

    @media (min-width: $desktop-breakpoint) {
        padding: 7px 14px;
        font-size: 18px;
        border-radius: 10px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        padding: 9px 16px;
        font-size: 20px;
        border-radius: 12px;
    }

    &--selected {
        position: relative;
        display: flex;
        align-items: center;
        gap: 5px;
        color: $light;
        background-color: $primary-300;

        @media (min-width: $tablet-breakpoint) {
            gap: 8px;
        }

        @media (min-width: $desktop-breakpoint) {
            gap: 10px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 12px;
        }

        &::after {
            content: '';
            display: inline-block;
            width: 18px;
            height: 18px;
            background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE4IDE4TDYgNk0xOCA2TDYgMTgiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMS45OTk4IiBzdHJva2UtbWl0ZXJsaW1pdD0iMjIuOTI1NiIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K');

            @media (min-width: $tablet-breakpoint) {
                width: 20px;
                height: 20px;
            }

            @media (min-width: $desktop-breakpoint) {
                width: 22px;
                height: 22px;
            }

            @media (min-width: $lg-desktop-breakpoint) {
                width: 24px;
                height: 24px;
            }
        }
    }
}
</style>