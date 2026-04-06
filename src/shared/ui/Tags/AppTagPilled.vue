<template>
    <NuxtLink 
        v-if="to" 
        :to="to" 
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
    size: {
        type: String,
        required: false,
        default: 'small',
        validator: (value) => ['small', 'medium'].includes(value)
    },
    to: {
        type: String,
        required: false,
        default: ''
    }
})

const classes = computed(() => [
    'app-tag-pilled', 
    `app-tag-pilled--${ props.size }`
])
</script>

<style lang="scss" scoped>
.app-tag-pilled {
    display: inline-block;
    font-family: $main-font;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
    color: $dark-500;
    text-decoration: none;
    background-color: $light;
    border: 1.5px solid $secondary-100;
    border-radius: 50px;
    transition: color $base-ui-transition, background-color $base-ui-transition;

    @media (any-hover: hover) {
        &:hover {
            color: $light;
            background-color: $primary-300;
            border-color: $primary-300;
        }
    }

    &--small {
        padding: 6px 10px 7px;
        
        @media (min-width: $tablet-breakpoint) {
            padding: 6px 10px;
            font-size: 16px;
        }
        
        @media (min-width: $desktop-breakpoint) {
            padding: 7px 12px;
            font-size: 18px;
        }
        
        @media (min-width: $lg-desktop-breakpoint) {
            padding: 7px 15px 8px;
            font-size: 20px;
        }
    }

    &--medium {
        padding: 4px 8px;

        @media (min-width: $tablet-breakpoint) {
            padding: 6px 10px;
            font-size: 14px;
        }
        
        @media (min-width: $desktop-breakpoint) {
            padding: 9px 12px;
            font-size: 16px;
        }
        
        @media (min-width: $lg-desktop-breakpoint) {
            padding: 11px 15px 12px;
            font-size: 18px;
        }
    }
}
</style>