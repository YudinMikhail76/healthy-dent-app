<template>
    <NuxtLink
        v-if="to"
        :to="to"
        v-bind="$attrs"
        :class="classes"
    >
        <slot name="label" />
        <div class="load-more-btn__count">
            <slot name="count" />
        </div>
    </NuxtLink>
    <button
        v-else
        v-bind="$attrs"
        :class="classes"
        @click="onClick"
    >
        <slot name="label" />
        <div class="load-more-btn__count">
            <slot name="count" />
        </div>
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
    fullWidth: {
        type: Boolean,
        required: false
    },
    align: {
        type: String,
        default: 'space-between',
        validator: () => ['space-between', 'center']
    }
})

const classes = computed(() => [
    'load-more-btn',
    `load-more-btn--${ props.align }`,
    { 'load-more-btn--full-width': props.fullWidth }
])

const onClick = () => emit('on-click')
</script>

<style lang="scss" scoped>
.load-more-btn {
    display: flex;
    align-items: center;
    gap: 10px;
    width: fit-content;
    padding: 10px;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 140%;
    color: $dark-500;
    cursor: pointer;
    background-color: rgba(255, 255, 255, .5);
    border: none;
    border-radius: 6px;
    transition: color $base-ui-transition, background-color $base-ui-transition;

    @media (any-hover: hover) {
        &:hover {
            color: $primary-500;
            background-color: $light;
        }
    }

    @media (min-width: $tablet-breakpoint) {
        padding: 13px 15px;
        font-size: 16px;
        border-radius: 8px;
    }

    @media (min-width: $desktop-breakpoint) {
        padding: 15.5px 20px;
        font-size: 18px;
        border-radius: 10px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        padding: 22px 30px;
        font-size: 20px;
        border-radius: 12px;
    }

    &--full-width {
        width: 100%;
    }

    &--center {
        justify-content: center;
    }

    &--space-between {
        justify-content: space-between;
    }

    &__count {
        position: relative;
        display: inline-block;
        color: $dark-500;

        &::before {
            content: '(';
            display: inline-block;
            color: $primary-500;
        }

        &::after {
            content: ')';
            display: inline-block;
            color: $primary-500;
        }
    }
}
</style>